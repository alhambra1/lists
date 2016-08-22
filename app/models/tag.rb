class Tag < ApplicationRecord
  has_many :task_tags, dependent: :nullify
  has_many :tasks, through: :task_tags
end
