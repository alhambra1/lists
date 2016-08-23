class Task < ApplicationRecord
  belongs_to :list
  has_many :task_tags, dependent: :destroy
  has_many :tags, through: :task_tags

  def tags_attributes=(tag_attributes)
    tag = Tag.find_or_create_by(tag_attributes.values[0]) if tag_attributes.values[0]["name"].match(/[a-zA-Z]/)
    tags << tag if tag and not tags.include?(tag)
  end

  def due_date_string
    due_date.to_s
  end

  def serialize
    {
      id: id,
      name: name,
      description: description,
      due_date_string: due_date_string,
      status: status,

      # do not understand why tags are not getting rendered to json as an array
      # even though they can be raised as an error and represented as below
      tags: tags.map{|tag| {id: tag.id, name: tag.name}}.to_json
    }
  end

  def serialize_with_all_tags
    {
      id: id,
      name: name,
      description: description,
      due_date_string: due_date_string,
      status: status,
      tags: tags.map(&:id),
      all_tags: Tag.all.map{|tag| {id: tag.id, name: tag.name}}
    }
  end
end
