['Array', 'Date', 'Object', 'RegExp', 'String'].forEach(type => {
  var proto = eval(type).prototype;
  exports[type] = {};
  // Iterate over prototype, which isn't enumerable.
  Object.getOwnPropertyNames(proto)
    // We only want protoype _methods_.
    .filter(propName => typeof proto[propName] === 'function')
    // Export each method with functional syntax.
    .forEach(propName => {
      exports[type][propName] = function (instance /*, args */) {
        return proto[propName].apply(instance, [].slice.call(arguments, 1));
      };
    });
});
