class SessionsController < ApplicationController
  before_filter :require_login, :except => [:create]

  def create
    user = User.where("username ILIKE ?", user_params[:username]).first
    error_message = "Username and/or password do not match our records."
    if user and user.authenticate(user_params[:password])
      session[:user_id] = user.id
      render json: user, status: 200
    else
      render json: {error: error_message}
    end
  end

  def user
    render json: current_user, status: 200
  end

  def destroy
    session.clear
    render plain: "Logout successful."
  end

  private

  def user_params
    params.require(:user).permit(:username,:password)
  end
end
