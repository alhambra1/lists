function TasksShowController(task,TaskService,$state){
  var ctrl = this;

  ctrl.task = new Task(task);

  ctrl.deleteTask = function(){
    if (confirm("Are you sure?")){
      TaskService.deleteTask(ctrl.task.id).then(function(resp){
        if (resp.data.error){
          alert("An error occured: " + resp.data.error);

        } else {
          $state.go('lists.show',{id: ctrl.task.listId});
        }
      });
    }
  }
}

angular
  .module('app')
  .controller('TasksShowController',TasksShowController);
