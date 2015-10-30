// Get global object in browser or node.
var globalObject = Function('return this')(); 

['Array', 'Date', 'Object', 'RegExp', 'String'].forEach(function(type) {
  var proto = globalObject[type]['prototype'];
  exports[type] = {};
  // Iterate over prototype, which isn't enumerable.
  Object.getOwnPropertyNames(proto)
    // We only want protoype _methods_.
    .filter(function(prop) { return typeof proto[prop] === 'function'; })
    // Export each method with functional syntax.
    .forEach(function(prop) {
      exports[type][prop] = function (instance /*, args */) {
        return proto[prop].apply(instance, [].slice.call(arguments, 1));  
      };
    });
});
