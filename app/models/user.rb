class User < ApplicationRecord
  enum role: [:user, :admin]

  has_secure_password

  has_many :user_lists
  has_many :lists, through: :user_lists
  has_many :tasks, through: :lists
end
