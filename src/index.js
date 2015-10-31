[Array, Date, Object, RegExp, String].forEach(type => {
  const proto = type.prototype;
  exports[type.name] = {};
  // Iterate over prototype, which isn't enumerable.
  Object.getOwnPropertyNames(proto)
    // We only want protoype _methods_.
    .filter(propName => typeof proto[propName] === 'function')
    // Export each method with functional syntax.
    .forEach(propName => {
      exports[type.name][propName] = function (instance, ...rest) {
        return proto[propName].apply(instance, rest);
      };
    });
});
