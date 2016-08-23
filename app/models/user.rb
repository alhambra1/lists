class User < ApplicationRecord
  enum role: [:user, :admin]

  has_secure_password

  validates :username, presence: true, uniqueness: true

  has_many :user_lists, dependent: :destroy
  has_many :lists, through: :user_lists
  has_many :tasks, through: :lists
end
