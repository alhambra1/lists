class ListTaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :due_date_string
end
