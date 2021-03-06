function ListsShowController(list,TaskService,$filter,$scope,$timeout){
  var ctrl = this;

  ctrl.showform = false;
  ctrl.toggleForm = function(){ ctrl.showForm = ctrl.showForm ? false : true };

  ctrl.list = new List(list);
  ctrl.allTags = list.all_tags;

  ctrl.refilterTasks = function(){
    ctrl.list.filteredTasks = $filter('filter')(ctrl.list.tasks,ctrl.search);
  }

  ctrl.refilterTasks();

  ctrl.formData = {task: {status: 'Incomplete', list_id: ctrl.list.id}};
  ctrl.task = ctrl.formData.task;

  ctrl.addTask = function(){
    ctrl.task.due_date = ctrl.task.dueDate;

    ctrl.task.tag_ids = [];

    for (var i in ctrl.task.tagIdsObj){
      if (ctrl.task.tagIdsObj[i]) {
        ctrl.task.tag_ids.push(parseInt(i));
      }
    }

    TaskService.postTask(ctrl.formData).then(function(resp){
      if (resp.data.error){
        alert("An error occured: " + resp.data.error);

      } else {
        ctrl.list.tasks.push(new Task(resp.data));

        // render new tag
        if (ctrl.task.tags_attributes && ctrl.task.tags_attributes['0'].name.match(/\S/)){
          ctrl.allTags.push(resp.data.tags.slice(-1)[0]);
        }

        // clear form
        ctrl.formData = {task: {status: 'Incomplete', list_id: ctrl.list.id}};
        ctrl.task = ctrl.formData.task;
        $timeout(function() {
          $scope.form.$setPristine();
          $scope.form.$setUntouched();
          $scope.form.$submitted = false;
          ctrl.showForm = false;
        }, 50);
      }
    });
  }
}

angular
  .module('app')
  .controller('ListsShowController',ListsShowController);
