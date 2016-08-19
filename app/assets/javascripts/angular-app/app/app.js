angular
  .module('app',['ui.router','templates','ngMessages','ngAnimate'])
  .config(['$stateProvider', '$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider

    ///////* LISTS *///////
      .state('lists',{
        abstract: true,
        url: '',
        template: '<div ui-view></div>'
      })
      .state('lists.index',{
        url: '/lists',
        templateUrl: 'lists/index.html',
        controller: 'ListsIndexController as ctrl',
        resolve: {
          lists: function(ListService,$state){
            return ListService.getLists().then(function(resp){
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
      .state('lists.new',{
        url: '/lists/new',
        controller: 'ListsCrudController as ctrl',
        templateUrl: 'lists/_form.html',
        resolve: {
          list: function(ListService){
            return {};
          }
        }
      })
      .state('lists.show',{
        url: '/lists/:id',
        controller: 'ListsShowController as ctrl',
        templateUrl: 'lists/show.html',
        resolve: {
          list: function($stateParams,ListService,$state){
            return ListService.getList($stateParams.id).then(function(resp){
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
      .state('lists.edit',{
        url: '/lists/:id/edit',
        controller: 'ListsCrudController as ctrl',
        templateUrl: 'lists/_form.html',
        resolve: {
          list: function($stateParams,ListService,$state){
            return ListService.getList($stateParams.id).then(function(resp){
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

    ///////* TASKS *///////

      .state('lists.task',{
        url: '/lists/:listId/tasks/:taskId',
        templateUrl: 'tasks/show.html',
        controller: 'TasksShowController as ctrl',
        resolve: {
          task: function($stateParams,TaskService,$state){
            return TaskService.getTask($stateParams.taskId).then(function(resp){
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
      .state('tasks',{
        abstract: true,
        url: '',
        template: '<div ui-view></div>'
      })
      .state('tasks.edit',{
        url: '/tasks/:id/edit',
        controller: 'TasksCrudController as ctrl',
        templateUrl: 'tasks/edit.html',
        resolve: {
          task: function($stateParams,TaskService,$state){
            return TaskService.getTaskEdit($stateParams.id).then(function(resp){
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

    ///////* SEARCH *///////

      .state('search',{
        url: '/search',
        templateUrl: 'search/index.html',
        controller: 'SearchController as ctrl'
      })

    ///////* USERS *///////
      .state('users',{
        url: '/accounts/myAccount',
        templateUrl: 'users/index.html',
        controller: 'UsersController as ctrl',
        resolve: {
          userInfo: function(SessionService,$state){
            return SessionService.getUserInfo().then(function(resp){
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

    ///////* SESSIONS *///////

      .state('sessions',{
        abstract: true,
        url: '',
        template: '<div ui-view></div>'
      })
      .state('sessions.new',{
        url: '/login',
        templateUrl: 'sessions/new.html',
        controller: 'SessionsController as ctrl'
      })

  ///////* GAMES *///////
      .state('game',{
        url: '/games/game',
        templateUrl: 'games/game.html'
      })

    $urlRouterProvider.otherwise('/lists');
  }])

  ///////* RUN *///////

  // http://stackoverflow.com/questions/27212182/angularjs-ui-router-how-to-redirect-to-login-page
  .run(function($rootScope, $location, $state, $window, Auth) {

      $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

          var isLogin = toState.name === "sessions.new";
          if(isLogin){
            return; // no need to redirect 
          }

          // now, redirect only not authenticated
          if (!Auth.isLoggedIn() && !$window.localStorage.loggedIn) {
            e.preventDefault(); // stop current execution
            $state.go('sessions.new'); // go to login
          }
      });
  });
