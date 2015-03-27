// This file extends the Controller namespace and handles all incoming
// actions from the user

window.TODO = window.TODO || {};

(function(namespace, $, window, document) {
  "use strict";

  // The DOM is ready
  $(function() {
    namespace.bindEvents();
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

    TODO.View.createTask(id, description);

    input[0].value = "";
  };

  // Complete a task
  namespace.completeTask = function(id) {
    TODO.View.completeTask(id);
  };

  // Redo a task
  namespace.redoTask = function(id) {
    TODO.View.redoTask(id);
  };

  // Remove a task
  namespace.deleteTask = function(id) {
    TODO.View.removeTask(id);
  };

  namespace.bindEvents = function() {

    // 'Enter' keypress to submit new task
    $('#new-task-form').keypress(function(event) {
      if (event.keyCode == 10 || event.keyCode == 13) {
        event.preventDefault();
        $('#new-task-form').submit();
      }
    });

    // Submit to create a new task
    $('#new-task-form').submit(function(description, event) {
      addTask(description);
      return false;
    });

  };

}(window.namespace(window.TODO, "Controller"), window.jQuery, window, document));
