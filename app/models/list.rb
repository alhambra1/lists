class List < ApplicationRecord
  has_many :user_lists, dependent: :nullify
  has_many :users, through: :user_lists
  has_many :tasks, dependent: :destroy

  def update_permission(user,permission)
    user_lists.where(user_id: user.id).first.update(permission: permission)
  end

  def permission(user)
    user_lists.where(user_id: user.id).first.permission
  end

  def collaborators=(emails)
    collaborator_list = emails.gsub(","," ").split(/\s+/).map{|username| User.find_by(username: username)}.compact
    creator = user_lists.where(permission: "creator").first.user 
    collaborator_list << creator
    self.users.clear
    collaborator_list.uniq.each do |u| 
      self.users << u
      update_permission(u, "collaborator")
    end
    update_permission(creator, "creator")
    save
  end

  def collaborators
    users.map{|user| if permission(user) == "creator" then user.username + " (creator)" else user.username end}.join(", ")
  end

  def self.search(query, list_id, user_id)
    anchor = User.find_by(id: user_id)
    
    anchor = anchor.lists.find_by(id: list_id) if list_id.match(/\S/)
    return {error: "List #{list_id} was not found."} if anchor.nil? 

    anchor.tasks.left_outer_joins(:tags).where("tasks.name LIKE ? OR tasks.description LIKE ? OR tags.name LIKE ?", "%#{query}%", "%#{query}%", "%#{query}%").distinct
  end
end
