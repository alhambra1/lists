class TasksController < ApplicationController
  def create
    task = Task.new(task_params)
    if not task.save
      return render json: {error: "Could not save task."}
    end
    if not task.status.match(/\S/)
      task.update(status: "Incomplete")
    end
  
    render json: task
  end

  def show
    task = Task.find_by(id: params[:id])
    if task.nil?
      render json: {error: "Could not find task with id #{params[:id]}."}, status: 200
    elsif not authorize_resource(current_user,task,:show)
      render json: {error: "Unauthorized."}, status: 200
    else
      render json: task
    end
  end

  def edit
    task = Task.find_by(id: params[:id])
    if task.nil?
      render json: {error: "Could not find task with id #{params[:id]}."}, status: 200
    else
      render json: task.serialize_with_all_tags
    end
  end

  def update
    task = Task.find_by(id: task_params[:id])

    if task.nil?
      render json: {error: "Could not find task with id #{task_params[:id]}."}, status: 200
    elsif not authorize_resource(current_user,task,:update)
      return render json: {error: "Unauthorized."}, status: 200
    elsif not task.update(task_params)
      return render json: {error: "Could not update task."}, status: 200
    end

    render json: task, status: 200
  end

  def destroy
    task = Task.find_by(id: params[:id])

    if task.nil?
      return render json: {error: "Could not find task with id #{params[:id]}."}, status: 200
    elsif not authorize_resource(current_user,task,:destroy) 
      return render json: {error: "Unauthorized."}, status: 200
    end

    task.destroy

    render plain: "Task deleted successfully.", status: 200
  end

  private

  def task_params
    params.require(:task).permit(:id,:name,:description,:due_date,:status,:list_id, tag_ids: [], tags_attributes: [:name])
  end
end
