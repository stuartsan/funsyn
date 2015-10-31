var expect = require('expect');
var funsyn = require('../src/index.js');

describe('fn syntax', () => {
  it('should make available prototype methods, namespaced', () => {
    expect(funsyn.Array.join).toExist();
    expect(funsyn.String.split).toExist();
    expect(funsyn.RegExp.test).toExist();
    expect(funsyn.Date.getDate).toExist();
    expect(funsyn.Object.hasOwnProperty).toExist();
    expect(funsyn.Function.apply).toExist();
  });

  var split = funsyn.String.split;

  it('filters out non-methods from the prototype', () => {
    expect(funsyn.String.length).toNotExist();
  });

  it('changes the methods\' syntax but not behavior', () => {
    var join = funsyn.Array.join;
    expect(join(['a', 'b', 'c'], '')).toEqual(['a', 'b', 'c'].join(''));

    expect(split('abc', '')).toEqual('abc'.split(''));

    var test = funsyn.RegExp.test;
    expect(test(/derp/, 'derp')).toEqual(/derp/.test('derp'));
  });

  it('preserves function names for stack traces', () => {
    expect(funsyn.Array.join.name).toEqual(Array.prototype.join.name);
    expect(funsyn.String.split.name).toEqual(String.prototype.split.name);
  });

  it('preserves fn.apply', () => {
    expect(split.apply('derp', [''])).toEqual('derp'.split(''));
  });

  it('preserves fn.call', () => {
    expect(split.call('derp', '')).toEqual('derp'.split(''));
  });

  it('preserves fn.bind', () => {
    expect(split.bind('derp', '')()).toEqual('derp'.split(''));
  });
});
