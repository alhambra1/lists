class ApplicationController < ActionController::Base
  include Policy

  before_action :require_login

  protect_from_forgery with: :exception

  after_filter :set_csrf_cookie_for_ng

  # http://stackoverflow.com/questions/14734243/rails-csrf-protection-angular-js-protect-from-forgery-makes-me-to-log-out-on
  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  def current_user
    User.find_by(id: session[:user_id])
  end

  def logged_in?
    !!session[:user_id]
  end

  protected

  # In Rails 4.2 and above
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

  private

  def require_login
    render json: {error: "Could not validate server session. Please log in."}, status: 200 if current_user.nil?
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end
end
