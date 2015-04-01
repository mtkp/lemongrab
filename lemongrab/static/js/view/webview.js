// This file extends the View namespace and manages the PC browser web view
(function(namespace, $, window, document) {
  "use strict";

  // Create the task and add it to the To Do list
  var createTask = function(taskObj) {
    var parent,
        context,
        newTask,
        template;

    if (!(taskObj instanceof TODO.Model.Objects.Task)) {
      return;
    }

    parent = $("#task-list");

    // Fill the template and create a DOM object
    template = Handlebars.compile($('#task-template').html());
    context = {
      "id": taskObj.getID(),
      "description": taskObj.getDescription()
    }
    newTask = $(template(context));

    // Attach events to the buttons
    newTask.find("#toggle").click(function() {
      TODO.Controller.completeTask(taskObj.getID());
    });
    newTask.find("#delete").click(function() {
      TODO.Controller.deleteTask(taskObj.getID());
    });

    parent.append(newTask);
  };

  // Mark task as completed
  var completeTask = function(taskObj) {
    var task = $("#task-" + taskObj.getID());

    task.children(".task-incomplete").attr("class", "task-complete").
      text("Completed");
    task.find("#toggle").attr("value", "Undo").
      off("click").
      click(function() {
        TODO.Controller.undoTask(taskObj.getID());
      });
  };

  // Toggle a tasks 'completed' state back off
  var undoTask = function(taskObj) {
    var task = $("#task-" + taskObj.getID());

    task.children(".task-complete").attr("class", "task-incomplete").
      text("Not completed");
    task.find("#toggle").attr("value", "Complete").
      off("click").
      click(function() {
        TODO.Controller.completeTask(taskObj.getID());
      });
  };

  // Remove task from the To Do list
  var deleteTask = function(id) {
    $("#task-" + id).remove();
  };

  // Define public API
  namespace.createTask = createTask;
  namespace.completeTask = completeTask;
  namespace.undoTask = undoTask;
  namespace.deleteTask = deleteTask;


}(window.namespace("View"), window.jQuery, window, document));
