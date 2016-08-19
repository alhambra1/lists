function SearchController(SearchService){
  var ctrl = this;

  ctrl.search = function(){
    if (!ctrl.formData.search.list_id){
      ctrl.formData.search.list_id = '';
    }

    SearchService.postQuery(ctrl.formData).then(function(resp){
      if (resp.data.error){
        alert("An error occurred: " + resp.data.error);

      } else {
        ctrl.results = resp.data.map(x => new Task(x));
      }
    });
  }
}

angular
  .module('app')
  .controller('SearchController',SearchController);
