var List = function(list_hash){
  this.id = list_hash.id;
  this.name = list_hash.name;
  this.editable = list_hash.editable;
  this.collaborators = list_hash.collaborators;
  this.tasks = list_hash.tasks ? list_hash.tasks.map(function(x){ return new Task(x); }) : [];
  this.errors = list_hash.errors;

  this.collaboratorsWithoutCreator = function(){
    return this.collaborators.split(',')
                             .filter(function(x){ return !x.match('creator'); })
                             .map(function(x){ return x.replace(/^\s+|\s+$/,""); })
                             .join(',');
  };
}
