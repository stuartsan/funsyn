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
    expect(join(['a', 'b', 'c'], '')).toEqual(['a', 'b', 'c'].join(''));

    var split = funsyn.String.split;
    expect(split('abc', '')).toEqual('abc'.split(''));

    var test = funsyn.RegExp.test;
    expect(test(/derp/, 'derp')).toEqual(/derp/.test('derp'));
  });

  it('should preserve function names for stack traces', () => {
    expect(funsyn.Array.join.name).toEqual(Array.prototype.join.name);
    expect(funsyn.String.split.name).toEqual(String.prototype.split.name);
  });

});
