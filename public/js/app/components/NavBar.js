var NavBar = {
  templateUrl: 'templates/layouts/_nav.html',
  controller: 'NavController',
  controllerAs: 'ctrl'
}

angular
  .module('app')
  .component('navBar',NavBar);
