"use strict";[Array,Date,Function,Object,RegExp,String].forEach(function(n){var t=n.prototype;exports[n.name]={},Object.getOwnPropertyNames(t).filter(function(n){return"function"==typeof t[n]}).forEach(function(e){var r=t[e],c=new Function("return function "+e+" (instance) {\n        return "+n.name+".prototype."+e+"\n                .apply(instance, [].slice.call(arguments, 1));\n      }")();["apply","bind","call"].forEach(function(n){return c[n]=r[n].bind(r)}),exports[n.name][e]=c})});