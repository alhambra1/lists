var List = function(list_hash){
  this.id = list_hash.id;
  this.name = list_hash.name;
  this.editable = list_hash.editable;
  this.collaborators = list_hash.collaborators;
  this.tasks = list_hash.tasks;
  this.errors = list_hash.errors;

  this.collaboratorsWithoutCreator = function(){
    return this.collaborators.split(',')
                             .filter(x => !x.match('creator'))
                             .map(x => x.replace(/^\s+|\s+$/,""))
                             .join(',');
  };
}
