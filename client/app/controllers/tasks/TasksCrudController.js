function TasksCrudController(task,TaskService,$state,$timeout){
  var ctrl = this;

  ctrl.task = new Task(task);

  ctrl.allTags = task.all_tags;
  ctrl.task.tagIdsObj = {};

  for (let i in ctrl.allTags){
    if (ctrl.task.tags.indexOf(ctrl.allTags[i].id) !== -1){
      ctrl.task.tagIdsObj[ctrl.allTags[i].id] = true;
    }
  }

  ctrl.updateTask = function(){
    ctrl.formData = {
      task:{
        id: ctrl.task.id,
        name: ctrl.task.name,
        description: ctrl.task.description,
        due_date: ctrl.task.dueDate,
        status: ctrl.task.status
      }
    }

    ctrl.formData.task.tag_ids = [];

    for (let i in ctrl.task.tagIdsObj){
      if (ctrl.task.tagIdsObj[i]) {
        ctrl.formData.task.tag_ids.push(parseInt(i));
      }
    }

    if (ctrl.task.tags_attributes){
      ctrl.formData.task.tags_attributes = {'0': {name: ctrl.task.tags_attributes['0'].name}}
    }

    TaskService.updateTask(ctrl.formData).then(function(resp){
      if (resp.data.error){
        alert("An error occured: " + resp.data.error);

      } else {
        ctrl.message = "Task updated Successfully."
        
        $timeout(function(){
          ctrl.message = "Returning to task...";
        },2000);
    
        $timeout(function(){
          ctrl.message = null;
          $state.go('lists.task',{listId: resp.data.list_id, taskId: resp.data.id});
        },3000);
      }
    });
  }
}

angular
  .module('app')
  .controller('TasksCrudController',TasksCrudController);
