function SessionService($http){
  var svc = this;

  svc.user = null;
  svc.loggedIn = false;

  svc.authenticateUser = function (login_hash){
    return $http.post('/sessions',login_hash);
  }

  svc.getUserInfo = function(){
    return $http.get('/sessions/user');
  }

  svc.endSession = function(){
    return $http.delete('/sessions');
  }
}

angular
  .module('app')
  .service('SessionService',SessionService);
