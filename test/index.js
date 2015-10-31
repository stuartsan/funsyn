var expect = require('expect');
var funsyn = require('../src/index.js');

describe('fn syntax', () => {
  it('should make available prototype methods, namespaced', () => {
    expect(funsyn.Array.join).toExist();
    expect(funsyn.String.split).toExist();
    expect(funsyn.RegExp.test).toExist();
    expect(funsyn.Date.getDate).toExist();
    expect(funsyn.Object.hasOwnProperty).toExist();
  });

  it('should change the methods\' syntax but not behavior', () => { 
    var join = funsyn.Array.join;
    expect(join(['a', 'b', 'c'], '')).toEqual('abc');

    var split = funsyn.String.split;
    expect(split('abc', '')).toEqual(['a', 'b', 'c']);

    var test = funsyn.RegExp.test;
    expect(test(/derp/, 'derp')).toEqual(true);
  });
});
