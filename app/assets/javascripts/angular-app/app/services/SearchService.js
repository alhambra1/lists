function SearchService($http){
  var svc = this;

  svc.postQuery = function(query){
    return $http.post('search',query);
  }
}

angular
  .module('app')
  .service('SearchService',SearchService);
