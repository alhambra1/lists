function Auth(){
  var user;

  return{
    setUser: function(user_hash){
      user = new User(user_hash);
    },
    unsetUser: function(){
      user = null;
    },
    isLoggedIn: function(){
      return(user) ? user : false;
    }
  }
}

angular
  .module('app')
  .factory('Auth',Auth);
