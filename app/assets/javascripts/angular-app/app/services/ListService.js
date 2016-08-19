function ListService($http){
  this.getLists = function(){
    return $http.get('/lists.json');
  }

  this.getList = function(id){
    return $http.get('/lists/' + id + '.json');
  }

  this.postList = function(list_hash){
    return $http.post('/lists',list_hash);
  }

  this.updateList = function(list_hash){
    return $http.patch('/lists/' + list_hash.id, list_hash)
  }

  this.deleteList = function(id){
    return $http.delete('/lists/' + id);
  }
}

angular
  .module('app')
  .service('ListService',ListService);
