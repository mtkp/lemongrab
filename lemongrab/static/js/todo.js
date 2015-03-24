TODO = (function(todoCode) {

  return todoCode(window.jQuery, window, document);

}(function($, window, document) {
  "use strict";

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

  // Create the task and add it to the To Do list
  var _createTask = function(id, description) {
    var parent = $("#task-list"),
        template, context;

    if (!typeof description === "string") {
      return;
    }

    template = Handlebars.compile($('#task-template').html());
    context = {
      "id": id,
      "description": description
    }
    parent.append(template(context));
  };

  // Mark task as completed
  var _completeTask = function(id) {
    var task = $("#task-" + id);

    task.children(".task-incomplete").attr("class", "task-complete").
      text("Completed");
    task.find("#toggle").attr("onclick", "TODO.redoTask(" + id + ")").
      attr("value", "Redo");
  }

  // Redo a task
  var _redoTask = function(id) {
    var task = $("#task-" + id); 

    task.children(".task-complete").attr("class", "task-incomplete").
      text("Not completed");
    task.find("#toggle").attr("onclick", "TODO.completeTask(" + id + ")").
      attr("value", "Complete");
  }

  // Remove task from the To Do list
  var _removeTask = function(id) {
    $("#task-" + id).remove();
  };

  // Add a task to the To Do list
  var addTask = function() {
    var input = $("#new-task-form :input"),
        id, description;

    if (input.length !== 2) {
      return;
    }

    description = input[0].value;
    if (!description) {
      alert("You must specify a description");
      return;
    }
    
    id = new Date().getTime();

    _createTask(id, description);

    input[0].value = "";
  };

  // Complete a task
  var completeTask = function(id) {
    _completeTask(id);
  };

  // Redo a task
  var redoTask = function(id) {
    _redoTask(id);
  };

  // Remove a task
  var deleteTask = function(id) {
    _removeTask(id);
  };

  // Return the public API
  return {
    addTask: addTask,
    completeTask: completeTask,
    redoTask: redoTask,
    deleteTask: deleteTask
  }

}));
