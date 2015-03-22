TODO = (function(todoCode) {

  return todoCode(window.jQuery, window, document);

}(function($, window, document) {
  "use strict";

  // CSS selectors values and other global constants
  var constants = {
    task: "task",
    taskDescription: "task-body",
    control: "task-control",
    completeAction: "complete-task",
    completeText: "Complete",
    removeAction: "delete-task",
    removeText: "Remove",
    taskIdPrefix: "task-",
    taskInput: "new-task-form",
    noNameError: "Name cannot be empty",
    incompleteList: "#incomplete",
    completeList: "#complete"
  };

  // The DOM is ready
  $(function() { 

    // Register event handler for enter keypress
    $('#new-task-form').keypress(function(event){

      if (event.keyCode == 10 || event.keyCode == 13) {
        event.preventDefault();
        $('#new-task-form .button').click();
      }

    });

  });

  // Create the task html and add it to the To Do list
  var _createTask = function(id, description) {
    var parent = $(constants.incompleteList),
        task, control;

    if (!typeof description === "string") {
      return;
    }

    task = $("<div />", {
      "class": constants.task,
      "id": constants.taskIdPrefix + id
    });

    $("<div />", {
      "class": constants.taskDescription,
      "text": description
    }).appendTo(task);

    control = $("<div />", {
      "class": constants.control
    }).appendTo(task);

    $("<input />", {
      "type": "button",
      "id": constants.completeAction,
      "value": constants.completeText,
      "click": function() {
        TODO.completeTask(id);
      }
    }).appendTo(control);

    $("<input />", {
      "type": "button",
      "id": constants.removeAction,
      "value": constants.removeText,
      "click": function() {
        TODO.deleteTask(id);
      }
    }).appendTo(control);

    task.appendTo(parent);
  };

  // Retrieve a task from the To Do list and move it to
  // the complete list.
  var _moveToComplete = function(id) {
    var newParent = $(constants.completeList),
        task = $("#" + constants.taskIdPrefix + id);

    task.children("div.task-control").remove();
    task.remove();
    task.appendTo(newParent);
  }

  // Remove task from the To Do list
  var _removeTask = function(id) {
    $("#" + constants.taskIdPrefix + id).remove();
  };

  // Add a task to the To Do list
  var addTask = function() {
    var input = $("#" + constants.taskInput + " :input"),
        id, description, tempData;

    if (input.length !== 2) {
      return;
    }

    description = input[0].value;
    if (!description) {
      alert(constants.noNameError);
      return;
    }

  id = new Date().getTime();

    _createTask(id, description);

    input[0].value = "";
  };

  // Complete a task
  var completeTask = function(id) {
    _moveToComplete(id);
  };

  // Remove a task
  var deleteTask = function(id) {
    _removeTask(id);
  };

  // Return the public API
  return {
    addTask: addTask,
    completeTask: completeTask,
    deleteTask: deleteTask
  }

}));


