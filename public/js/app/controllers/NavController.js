function NavController($scope,$window,SessionService,Auth,$state){
  var ctrl = this;

  ctrl.loggedIn = !!$window.localStorage.loggedIn || !!Auth.isLoggedIn();

  $scope.$watch(function () { return !!$window.localStorage.loggedIn || !!Auth.isLoggedIn(); },function(newVal,oldVal){
    if (oldVal !== newVal){
    	ctrl.loggedIn = newVal;
    }
  })

  ctrl.logout = function(){
    SessionService.endSession().then(function(resp){
      if (!resp.data.match('successful')){
        alert("An error occurred processing the request.\nSigning out locally.");
      }

      Auth.unsetUser();
      delete $window.localStorage.loggedIn;

      $state.go('sessions.new');
    });
  };
}

angular
  .module('app')
  .controller('NavController',NavController);
