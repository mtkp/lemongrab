// This file extends the View namespace and manages the PC browser web view

(function(namespace, $, window, document) {
  "use strict";

  // Create the task and add it to the To Do list
  namespace.createTask = function(id, description) {
    var parent,
        template,
        context;

    if (!typeof description === "string") {
      return;
    }

    parent = $("#task-list");

    template = Handlebars.compile($('#task-template').html());
    context = {
      "id": id,
      "description": description
    }

    parent.append(template(context));
  };

  // Mark task as completed
  namespace.completeTask = function(id) {
    var task = $("#task-" + id);

    task.children(".task-incomplete").attr("class", "task-complete").
      text("Completed");
    task.find("#toggle").attr("onclick", "TODO.redoTask(" + id + ")").
      attr("value", "Redo");
  };

  // Redo a task
  namespace.redoTask = function(id) {
    var task = $("#task-" + id);

    task.children(".task-complete").attr("class", "task-incomplete").
      text("Not completed");
    task.find("#toggle").attr("onclick", "TODO.completeTask(" + id + ")").
      attr("value", "Complete");
  };

  // Remove task from the To Do list
  namespace.removeTask = function(id) {
    $("#task-" + id).remove();
  };


}(TODO.namespace("View"), window.jQuery, window, document));
