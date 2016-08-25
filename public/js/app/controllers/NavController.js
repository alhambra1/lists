function NavController($scope,$window){
  var ctrl = this;
ctrl.loggedIn = true;
  $scope.$watch(function () { return $window.localStorage.loggedIn; },function(newVal,oldVal){
    if (oldVal !== newVal){
    	ctrl.loggedIn = true;
    }
  })
}

angular
  .module('app')
  .controller('NavController',NavController);
