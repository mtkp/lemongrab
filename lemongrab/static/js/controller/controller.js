// This file extends the Controller namespace and handles all incoming
// actions from the user
(function(namespace, $, window, document) {
  "use strict";

  // The DOM is ready
  $(function() {
    bindEvents();
  });

  // Add a task to the To Do list
  var createTask = function() {
    var input         = $("#new-task-form :input"),
        description;

    // Expect only description as input
    if (input.length !== 2) {
      return;
    }

    description = input[0].value;
    if (!description) {
      alert("You must specify a description");
      return;
    }

    TODO.Model.createTask(description);

    input[0].value = "";
  };

  // Complete a task
  var completeTask = function(id) {
    TODO.Model.completeTask(id);
  };

  // Undo a task
  var undoTask = function(id) {
    TODO.Model.undoTask(id);
  };

  // Remove a task
  var deleteTask = function(id) {
    TODO.Model.deleteTask(id);
  };

  var bindEvents = function() {

    // 'Enter' keypress to submit new task
    $('#new-task-form').keypress(function(event) {
      if (event.keyCode == 10 || event.keyCode == 13) {
        event.preventDefault();
        $('#new-task-form').submit();
      }
    });

    // Submit to create a new task
    $('#new-task-form').submit(function(description, event) {
      createTask(description);
      return false;
    });

  };

  // Define public API
  namespace.createTask = createTask;
  namespace.completeTask = completeTask;
  namespace.undoTask = undoTask;
  namespace.deleteTask = deleteTask;

}(window.namespace("Controller"), window.jQuery, window, document));
