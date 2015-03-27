/* The global namespace object is 'TODO' */

// Define the global object provide namespace creation and access machinery
window.namespace = function(name) {
  var fields = name.split("."),
      scope,
      i,
      len;

  // Define the global object
  window.TODO = window.TODO || {};
  scope = window.TODO;

  // Search for desired namespace. Create a new one if not found
  for (i = 0, len = fields.length; i < len; i++) {
    if (!scope[fields[i]]) {
      scope[fields[i]] = {};
    }
    scope = scope[fields[i]];
  }

  return scope;
}
