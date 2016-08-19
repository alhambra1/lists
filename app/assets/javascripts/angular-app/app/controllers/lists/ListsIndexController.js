function ListsIndexController(lists){
  var ctrl = this;

  ctrl.lists = [];

  angular.forEach(lists,function(listHash){
    ctrl.lists.push(new List(listHash));
  });
}

angular
  .module('app')
  .controller('ListsIndexController',ListsIndexController);
