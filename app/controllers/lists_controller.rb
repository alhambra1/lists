class ListsController < ApplicationController
  def index
    lists = current_user.lists
    render json: lists
  end

  def show
    list = List.find_by(id: params[:id])

    if list.nil?
      render json: {error: "Could not find list."}
    elsif !authorize_resource(current_user,list,:show)
      render json: {error: "Unauthorized."}
    end

    render json: list
  end

  def create
    list = List.new(name: list_params[:name])
    if not list.save
      return render json: { error: list.errors.to_json }, status: 200
    end
    list.users << current_user
    list.update_permission(current_user,"creator")
    list.collaborators = list_params[:collaborators]

    render json: list, status: 201
  end

  def update
    list = List.find(list_params[:id])

    return render json: {error: "Unauthorized."} if !authorize_resource(current_user,list,:update)

    if not list.update(list_params)
      return render json: {error: "Unable to update."} 
    end

    render json: list, status: 200
  end

  def destroy
    list = List.find_by(id: params[:id])
    return render json: {error: "Unauthorized."} if not authorize_resource(current_user,list,:destroy)
    list.tasks.map(&:destroy)
    list.destroy

    render plain: "List deleted.", status: 200
  end

  def search
    if params[:search]
      results = List.search(search_params["query"],search_params["list_id"],current_user.id)
      render json: results, status: 200
    else
      render json: {error: "Search params undefined."}, status: 200
    end
  end

  private
  
  def list_params
    params.require(:list).permit(:id,:name,:collaborators)
  end

  def search_params
    params.require(:search).permit(:query,:list_id)
  end
end
