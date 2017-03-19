angular
  .module('app',['ui.router','ngMessages','ngAnimate'])
  .config(['$stateProvider', '$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider

    ///////* PEOPLE *///////
      .state('people',{
        abstract: true,
        url: '',
        template: '<div ui-view></div>'
      })
      .state('people.index',{
        url: '/people',
        templateUrl: 'templates/people/index.html',
        controller: 'PeopleIndexController as ctrl',
        resolve: {
          people: function(PersonService,$state){
            return PersonService.getPeople().then(function(resp){
              if (resp.data.error){
                if (!resp.data.error.match('Could not validate server session')){
                  alert("An error occured: " + resp.data.error);

                } else {
                  $state.go('sessions.new');
                }
      
                return [];

              } else {
                return resp.data;
              }
            });
          }
        }
      })
      .state('people.new',{
        url: '/people/new',
        controller: 'PeopleCrudController as ctrl',
        templateUrl: 'templates/people/_form.html',
        resolve: {
          list: function(PersonService){
            return {};
          }
        }
      })
      .state('people.show',{
        url: '/people/:id',
        controller: 'PeopleShowController as ctrl',
        templateUrl: 'templates/people/show.html',
        resolve: {
          list: function($stateParams,PersonService,$state){
            return PersonService.getList($stateParams.id).then(function(resp){
              if (resp.data.error){
                if (!resp.data.error.match('Could not validate server session')){
                  alert("An error occured: " + resp.data.error);

                } else {
                  $state.go('sessions.new');    
                }            

                return {};

              } else {
                return resp.data;
              }
            });
          }
        }
      })
      .state('people.edit',{
        url: '/people/:id/edit',
        controller: 'PeopleCrudController as ctrl',
        templateUrl: 'templates/people/_form.html',
        resolve: {
          list: function($stateParams,PersonService,$state){
            return PersonService.getPerson($stateParams.id).then(function(resp){
              if (resp.data.error){
                if (!resp.data.error.match('Could not validate server session')){
                  alert("An error occured: " + resp.data.error);

                } else {
                  $state.go('sessions.new');    
                }

                return {};

              } else {
                return resp.data;
              }
            });
          }
        }
      })

    $urlRouterProvider.otherwise('/people');
  }])

  ///////* RUN *///////

  // http://stackoverflow.com/questions/27212182/angularjs-ui-router-how-to-redirect-to-login-page
  .run(function($rootScope, $location, $state, Auth, SessionService) {

      $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
          var isLoginOrSignup = (toState.name === "sessions.new" || toState.name === "users.new");
          if(isLoginOrSignup){
            return; // no need to redirect 
          }

          // now, redirect only not authenticated
          if (!Auth.isLoggedIn()) {
            SessionService.getUserInfo().then(function(resp){
              if (resp.data.error){
                e.preventDefault(); // stop current execution
                $state.go('sessions.new'); // go to login
                
              } else {
                Auth.setUser(resp.data);
              }
            });
          }
      });
  });
