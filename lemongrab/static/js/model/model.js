// This file extends the Model namespace and handles the representation
// of the todo list
(function(namespace, $, window, document) {
  "use strict";

  // The taskList object acts as a map of task IDs to their Task objects
  var taskList = {};

  var createTask = function(description) {
    var task = new TODO.Model.Objects.Task(description);

    if (!task) {
      return false;
    }

    taskList[task.getID()] = task;

    // Update the view
    TODO.View.createTask(task);
  };

  var completeTask = function(id) {
    var task = taskList[id];

    if (!task) {
      return;
    }

    task.completeTask();

    // Update the view
    TODO.View.completeTask(task);
  };

  var undoTask = function(id) {
    var task = taskList[id];

    if (!task) {
      return;
    }

    task.undoTask(task);

    // Update the view
    TODO.View.undoTask(task);
  };

  var deleteTask = function(id) {
    delete taskList[id];

    // Update the view
    TODO.View.deleteTask(id);
  };

  // Define public API
  namespace.createTask = createTask;
  namespace.completeTask = completeTask;
  namespace.undoTask = undoTask;
  namespace.deleteTask = deleteTask;

}(window.namespace("Model"), window.jQuery, window, document));
