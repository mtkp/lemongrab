// This file extends the Model.Objects namespace
// Definition of the Task object
(function(namespace, $, window, document) {
  "use strict";

  var Task = function(description) {

    // Task description must be a string
    if (typeof description !== 'string') {
      return false;
    }
    this.description = description;

    // The ID should be a unique for each task
    this.id = new Date().getTime();

    this.completed = false;
  };

  Task.prototype.getID = function() {
    return this.id;
  };

  Task.prototype.getDescription = function() {
    return this.description;
  };

  Task.prototype.setDescription = function(description) {

    // Task description must be a string
    if (typeof description !== 'string') {
      return false;
    }

    this.description = description;
  };

  Task.prototype.completeTask = function() {
    this.completed = true;
  };

  Task.prototype.undoTask = function() {
    this.completed = false;
  };

  // Define public API
  namespace.Task = Task;

}(window.namespace("Model.Objects"), window.jQuery, window, document));
