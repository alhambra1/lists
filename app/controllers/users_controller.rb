class UsersController < ApplicationController
  before_filter :require_login, :except => [:create]

  def create
    user = User.new(user_params)
    
    if not user.save
      render json: {error: user.errors}, status: 200
    else
      session[:user_id] = user.id
      render json: user, status: 201
    end
  end

  private

  def user_params
    params.require(:user).permit(:username,:password)
  end
end
