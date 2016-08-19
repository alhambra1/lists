class SessionsController < ApplicationController
  before_filter :require_login, :except => [:create]

  def create
    user = User.find_by(email: params[:email]) 
    error_message = "Email and/or password do not match our records."
    if user and user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
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
end
