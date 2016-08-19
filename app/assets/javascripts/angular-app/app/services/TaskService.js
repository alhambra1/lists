function TaskService($http){
  this.postTask = function(task_hash){
    return $http.post('/tasks',task_hash);
  }

  this.getTask = function(id){
    return $http.get('/tasks/' + id);
  }

  this.getTaskEdit = function(id){
    return $http.get('/tasks/' + id + '/edit');
  }

  this.updateTask = function(task_hash){
    return $http.patch('/tasks/' + task_hash.task.id,task_hash);
  }

  this.deleteTask = function(id){
    return $http.delete('/tasks/' + id);
  }
}

angular
  .module('app')
  .service('TaskService',TaskService);
