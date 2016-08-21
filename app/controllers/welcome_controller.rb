class WelcomeController < ApplicationController
  before_filter :require_login, :except => [:home]

  def home
  end
end
