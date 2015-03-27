// Define the global object provide namespace machinery

window.TODO = window.TODO || {};

// Check the global object for a namespace. If it exists, return
// it to be extended. If not, create a new one, recursively.
// Example format: TODO.Model.Server
window.namespace = function(globalScope, name) {
  var fields  = name.split("."),
      scope   = globalScope,
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
