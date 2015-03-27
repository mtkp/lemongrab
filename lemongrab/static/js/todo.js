TODO = (function(todoCode) {

  return todoCode(window.jQuery, window, document);

}(function($, window, document) {
  "use strict";

  // Check the global object for a namespace. If it exists, return
  // it to be extended. If not, create a new one, recursively.
  // Example format: TODO.Model.Server
  var namespace = function(name) {
    var fields  = name.split("."),
        scope   = this,
        i,
        len;

    for (i = 0, len = fields.length; i < len; i++) {
      if (!scope[fields[i]]) {
        scope[fields[i]] = {};
      }
      scope = scope[fields[i]];
    }

    return scope;
  }

  // Bind events to the DOM
  var _bind_events = function() {

    // Register event handler for 'enter' keypress
    $('#new-task-form').keypress(function(event){

      if (event.keyCode == 10 || event.keyCode == 13) {
        event.preventDefault();
        $('#new-task-form .button').click();
      }

    });

  }

  // The DOM is ready
  $(function() {
    _bind_events();

  });

  // Add a task to the To Do list
  var addTask = function() {
    var input         = $("#new-task-form :input"),
        id,
        description;

    if (input.length !== 2) {
      return;
    }

    description = input[0].value;
    if (!description) {
      alert("You must specify a description");
      return;
    }

    id = new Date().getTime();

    this.View.createTask(id, description);

    input[0].value = "";
  };

  // Complete a task
  var completeTask = function(id) {
    this.View.completeTask(id);
  };

  // Redo a task
  var redoTask = function(id) {
    this.View.redoTask(id);
  };

  // Remove a task
  var deleteTask = function(id) {
    this.View.removeTask(id);
  };

  // Return the public API
  return {
    namespace: namespace, // Used by js, not part of API
    addTask: addTask,
    completeTask: completeTask,
    redoTask: redoTask,
    deleteTask: deleteTask
  }

}));
