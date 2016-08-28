function UsersController(SessionService,UserService,Auth,$state,$scope,$timeout){
  var ctrl = this;

  ctrl.showform = false;
  ctrl.toggleForm = function(){ ctrl.showForm = ctrl.showForm ? false : true };

  ctrl.user = Auth.isLoggedIn();

  ctrl.logout = function(){
    SessionService.endSession().then(function(resp){
      if (!resp.data.match('successful')){
        alert("An error occurred processing the request.\nSigning out locally.");
      }

      Auth.unsetUser();

      $state.go('sessions.new');
    });
  };

  ctrl.createUser = function(){
    UserService.postUser({ user: ctrl.user }).then(function(resp){
      if (resp.data.error){
        return alert("Username is taken.");
        
      } else {
        Auth.setUser(resp.data);

        $state.go('lists.index');
      }
    });
  };

  ctrl.updateUser = function(){
    UserService.updateUser({
      current_password: ctrl.currentPassword,
      user: ctrl.user 
    }).then(function(resp){
      if (resp.data.error){
        var errorStr = '';

        for (var i in resp.data.error){
          errorStr += i + ': ' + resp.data.error[i] + '\n';
        }

        return alert(errorStr);
        
      } else {
        Auth.setUser(resp.data);

        $timeout(function() {
          $scope.form.$setPristine();
          $scope.form.$setUntouched();
          $scope.form.$submitted = false;
          ctrl.showForm = false;
        }, 50);
        
        return alert("Information updated.");
      }
    });
  };
}

angular
  .module('app')
  .controller('UsersController',UsersController);
