var Task = function(task_hash){
  this.id = task_hash.id;
  this.name = task_hash.name;
  this.description = task_hash.description;
  this.status = task_hash.status;
  this.dueDateString = task_hash.due_date_string;
  this.dueDate = new Date(this.dueDateString);
  this.listId = task_hash.list_id;
  this.tags = task_hash.tags;
  this.errors = task_hash.errors;

  this.displayDueDate = function(){
    return this.dueDate.toDateString() 
         + (this.dueDate < Date.now() ? ' (OVERDUE)' : '' )
  }

  this.tagNames = function(){
    return this.tags.map(x => x.name).join(", ");
  }
};
