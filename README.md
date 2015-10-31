# funsyn 

Lightweight functional syntax wrapper around JS built-in types' prototype 
methods; facilitates more consistent function composition.

So code you'd normally write like this, using functional ideas and 
object-oriented syntax:

```javascript
[1, 2, 3, 4].map(n => n + 1).filter(n => n > 2); 
```

Can be written like this:

```javascript
var { map, filter } = require('funsyn').Array;

filter(map([1, 2, 3, 4], n => n + 1), n => n > 2);
```

With no significant dependencies (the code is < 15 lines).

## How to use

`npm install funsyn`

For any method you'd normally call on an instance -- say, `'derp'.split` -- 
require the `funsyn` version of the function and invoke it by passing the 
instance as the first argument, followed by any subsequent arguments:

```javascript
var split = require('funsyn').String.split;

split('derp');     // => ['derp']
split('derp', ''); // => ['d', 'e', 'r', 'p']
```

Everything is located at `Type.method` within `funsyn` (e.g., `String.split`).

**Note**: presently only works for `Array`, `Date`, `Object`, `RegExp`, and 
`String` prototype methods. Maybe others should be included; these seemed like 
the most obviously useful ones.

## How it works

This package does very little: it iterates over the aforementioned prototypes 
and exports syntactically modified versions of their methods, which delegate 
calls to the original methods using `fn.apply()` and the instance.

## Why

To facilitate more consistent function composition. For one thing, you can 
maintain consistency between the way built-in and not-built-in functions are 
invoked, without having to monkey-patch the shit out of the built-in types. Say 
you have a function that flattens a two-dimensional array:

```javascript
function flatten(arr) {
  return [].concat.apply([], arr);
}
```

If you want to "work within" the existing system, you might find yourself 
wanting to do something like:

```javascript
someArray.map(doSomeStuff).flatten();
``` 

Which is cool, but to implement this you have to do something like this:

```javascript
Array.prototype.flatten = function() {
  return flatten(this);
};
```

Which is emphatically _not cool_ (because it modifies `Array.prototype`). 
You could also do this:

```javascript
flatten(someArray.map(doSomeStuff));
``` 

But it somewhat annoyingly mixes the two styles.

So this allows you to do:

```javascript
flatten(map(someArray, doSomeStuff));
```

Without any significant library dependencies.

**Worth noting**: you can do stuff like this in Firefox already, e.g., 
`String.split('derp', '')`. I haven't seen it anywhere else though, hence
this package.

### Why not just use underscore, lodash, etc?

If you need the additional functionality offered by those libraries, do use 
them.
