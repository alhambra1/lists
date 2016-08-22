function UsersController(userInfo,SessionService,UserService,Auth,$state,$window){
  var ctrl = this;

  ctrl.user = new User(userInfo);

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

  ctrl.createUser = function(){
    UserService.postUser({ user: ctrl.user }).then(function(resp){
      if (resp.data.error){
        return alert("Username is taken.");
        
      } else {
        Auth.setUser(resp.data);

        // set local flag to keep local permission on browser refresh and accros browser tabs.
        $window.localStorage.loggedIn = true;

        $state.go('lists.index');
      }
    });
  };
}

angular
  .module('app')
  .controller('UsersController',UsersController);
