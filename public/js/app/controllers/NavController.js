function NavController($scope,$window){
  var ctrl = this;

  $scope.$watch(function () { return $window.localStorage.loggedIn; },function(newVal,oldVal){
    if (oldVal !== newVal){
    	ctrl.loggedIn = newVal;
    }
  })
}

angular
  .module('app')
  .controller('NavController',NavController);
