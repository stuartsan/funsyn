# funsyn 

Lightweight wrapper making built-in prototype methods available in functional 
syntax to facilitate more consistent function composition.

So code you'd previously write like this, using functional _ideas_ and 
object-oriented _syntax_: 

```javascript
[1, 2, 3, 4].map(n => n + 1).filter(n => n > 2); 

```

Can be written like this:

```javascript
var map = require('funsyn').Array.map;
var filter = require('funsyn').Array.filter;

filter(map([1, 2, 3, 4], n => n + 1), n => n > 2);
```

## How to use

Take any method you'd call on an instance -- say, `'derp'.split` -- and 
require this version, and call it as a function, passing the instance in
as the first argument, followed by any subsequent arguments:

```javascript
var split = require('funsyn').String.split;
split('derp');     // => ['derp']
split('derp', ''); // => ['d', 'e', 'r', 'p']
```

Note: presently only works for `Array`, `Date`, `Object`, `RegExp`, and 
`String` prototype methods. Maybe others should be included; these seemed like 
the most obviously useful ones.

## How it works

This library does hardly anything -- it iterates over the prototypes mentioned
above and exports syntactically modified versions of their methods, which just 
delegate calls to the real ones using `apply` and the instance.

## Why

This facilitates more consistent composition because you can use the 
builtins in the same style as your own functions. For example, say you have a 
function that flattens a two-dimensional array:

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

Which is cool, but to implement this you have to do this:

```javascript
Array.prototype.flatten = flatten;
```

Which is emphatically _not cool_. You could also do this:

```javascript
flatten(someArray.map(doSomeStuff));
``` 

But it somewhat annoyingly mixes the two styles.

So this allows you to do:

```javascript
flatten(map(someArray, doSomeStuff));
```

Without any major library dependencies.

There are other ways you could solve this use case, like make your flatten 
function a reducer passed to `[].reduce`, etc, but I like this more.

**Worth noting**: you can do stuff like this in Firefox already, e.g., 
`String.split('derp', '')`. I haven't seen it anywhere else though, hence
this library.

## Why not just use underscore, lodash, etc?

If you need the additional functionality offered by those libraries, do use 
them.
