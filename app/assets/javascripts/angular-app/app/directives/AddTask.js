function AddTask(){
  return {
    restrict: 'E',
    templateUrl: 'tasks/_form.html',
    controller: 'ListsShowController',
    controllerAs: 'ctrl'
  };
}

angular
  .module('app')
  .directive('addTask',AddTask);
