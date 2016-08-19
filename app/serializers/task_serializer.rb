class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :due_date_string, :status, :list_id, :errors
  has_many :tags
end
