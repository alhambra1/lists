function SessionsController(SessionService,Auth,$state,$window){
  var ctrl = this;

  ctrl.login = function(){
    SessionService.authenticateUser(ctrl.user).then(function(resp){
      if (resp.data.error){
        return alert(resp.data.error);

      } else {
        Auth.setUser(resp.data);

        // set local flag to keep local permission on browser refresh and accros browser tabs.
        $window.localStorage.loggedIn = true;

        $state.go('lists.index');
      }
    });
  }
}

angular
  .module('app')
  .controller('SessionsController',SessionsController);
