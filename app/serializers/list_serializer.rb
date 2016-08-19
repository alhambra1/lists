class ListSerializer < ActiveModel::Serializer
  include Policy

  attributes :id, :name, :collaborators, :editable, :errors, :all_tags
  has_many :tasks, serializer: ListTaskSerializer

  def editable
    true
    authorize_resource(current_user,object,:edit)
  end

  def all_tags
    Tag.all.map{|tag| {id: tag.id, name: tag.name}}
  end
end
