function SessionsController(SessionService,Auth,$state){
  var ctrl = this;

  ctrl.login = function(){
    SessionService.authenticateUser({ user: ctrl.user }).then(function(resp){
      if (resp.data.error){
        return alert(resp.data.error);

      } else {
        Auth.setUser(resp.data);

        $state.go('lists.index');
      }
    });
  }
}

angular
  .module('app')
  .controller('SessionsController',SessionsController);
