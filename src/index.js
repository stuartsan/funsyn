[Array, Date, Object, RegExp, String].forEach(type => {
  const proto = type.prototype;
  exports[type.name] = {};
  // Iterate over prototype, which isn't enumerable, and so can't be iterated
  // over in a more common way.
  Object.getOwnPropertyNames(proto)
    // We only want protoype _methods_.
    .filter(propName => typeof proto[propName] === 'function')
    // Export each method with functional syntax. Maintain its name property
    // for stack traces by doing some trickery with the Function constructor,
    // whose last (here, only) arg is an eval'd string representing the body of
    // the new function.
    .forEach(propName => {
      const makeFn = new Function(`return function ${propName} (instance) {
        return ${type.name}.prototype.${propName}
                .apply(instance, [].slice.call(arguments, 1));
      }`);
      exports[type.name][propName] = makeFn();
    });
});
