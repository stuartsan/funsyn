var expect = require('expect');
var fnSyn = require('../src/index.js');

describe('fn syntax', function() {
  it('should make available prototype methods, namespaced', function() {
    expect(fnSyn.Array.join).toExist();
    expect(fnSyn.String.split).toExist();
    expect(fnSyn.RegExp.test).toExist();
    expect(fnSyn.Date.getDate).toExist();
    expect(fnSyn.Object.hasOwnProperty).toExist();
  });

  it('should change the methods\' syntax but not behavior', function() { 
    var join = fnSyn.Array.join;
    expect(join(['a', 'b', 'c'], '')).toEqual('abc');

    var split = fnSyn.String.split;
    expect(split('abc', '')).toEqual(['a', 'b', 'c']);

    var test = fnSyn.RegExp.test;
    expect(test(/derp/, 'derp')).toEqual(true);
  });
});
