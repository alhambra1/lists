class UsersController < ApplicationController
  before_filter :require_login, :except => [:create]

  def create
    user = User.new(user_params)
    
    if not user.save
      render json: {error: user.errors.messages}, status: 200
    else
      session[:user_id] = user.id
      render json: user, status: 201
    end
  end

  def update
    user = User.find_by(id: params[:id])

    if user.nil?
      render json: {error: "User not found."}, status: 200
    elsif not user.authenticate(params[:current_password])
      render json: {error: "Current password does not match our records."}, status: 200
    elsif not user.update(user_params)
      render json: {error: user.errors.messages}, status: 200
    else
      render json: user, status: 200
    end
  end

  private

  def user_params
    params.require(:user).permit(:username,:password)
  end
end
