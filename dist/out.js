'use strict';[Array,Date,Object,RegExp,String].forEach(function(type){var proto=type.prototype;exports[type.name] = {};Object.getOwnPropertyNames(proto).filter(function(propName){return typeof proto[propName] === 'function';}).forEach(function(propName){exports[type.name][propName] = function(instance){for(var _len=arguments.length,rest=Array(_len > 1?_len - 1:0),_key=1;_key < _len;_key++) {rest[_key - 1] = arguments[_key];}return proto[propName].apply(instance,rest);};});});
