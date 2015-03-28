// This file extends the View namespace and manages the PC browser web view
(function(namespace, $, window, document) {
  "use strict";

  // Create the task and add it to the To Do list
  var createTask = function(id, description) {
    var parent,
        context,
        newTask,
        template;

    if (!typeof description === "string") {
      return;
    }

    parent = $("#task-list");

    // Fill the template and create a DOM object
    template = Handlebars.compile($('#task-template').html());
    context = {
      "id": id,
      "description": description
    }
    newTask = $(template(context));

    // Attach events to the buttons
    newTask.find("#toggle").click(function() {
      TODO.Controller.completeTask(id);
    });
    newTask.find("#delete").click(function() {
      TODO.Controller.deleteTask(id);
    });

    parent.append(newTask);
  };

  // Mark task as completed
  var completeTask = function(id) {
    var task = $("#task-" + id);

    task.children(".task-incomplete").attr("class", "task-complete").
      text("Completed");
    task.find("#toggle").attr("value", "Redo").
      click(function() {
        TODO.Controller.redoTask(id);
      });
  };

  // Toggle a tasks 'completed' state back off
  var redoTask = function(id) {
    var task = $("#task-" + id);

    task.children(".task-complete").attr("class", "task-incomplete").
      text("Not completed");
    task.find("#toggle").attr("value", "Complete").
      click(function() {
        TODO.Controller.completeTask(id);
      });
  };

  // Remove task from the To Do list
  var removeTask = function(id) {
    $("#task-" + id).remove();
  };

  // Define public API
  namespace.createTask = createTask;
  namespace.completeTask = completeTask;
  namespace.redoTask = redoTask;
  namespace.removeTask = removeTask;


}(window.namespace("View"), window.jQuery, window, document));
