function NavController($scope,SessionService,Auth,$state){
  var ctrl = this;

  ctrl.loggedIn = true; //!!Auth.isLoggedIn();

  $scope.$watch(function () { return !!Auth.isLoggedIn(); },function(newVal,oldVal){
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

      $state.go('sessions.new');
    });
  };
}

angular
  .module('app')
  .controller('NavController',NavController);
