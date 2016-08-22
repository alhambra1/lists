function UserService($http){
  var svc = this;

  svc.postUser = function(user_hash){
    return $http.post('/users',user_hash);
  }
}

angular
  .module('app')
  .service('UserService',UserService);
