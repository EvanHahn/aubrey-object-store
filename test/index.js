var Store = require('..');
var assert = require('assert');

describe('basic operations', function () {
  beforeEach(function () {
    this.store = new Store();
  });

  it('can get and set single keys', function (done) {
    var store = this.store;
    var foo = { something: 123 };
    store.set({ thing: foo }, function (err) {
      assert.equal(err, null);
      store.get(['thing'], function (err, results) {
        assert.equal(err, null);
        assert.equal(results.thing, foo);
        assert.deepEqual(Object.keys(results), ['thing']);
        done();
      });
    });
  });

  it('can get and set multiple keys', function (done) {
    var store = this.store;
    var foo = {};
    var bar = {};
    store.set({ a: foo, b: bar }, function (err) {
      assert.equal(err, null);
      store.get(['a', 'b', 'c'], function (err, results) {
        assert.equal(err, null);
        assert.equal(results.a, foo);
        assert.equal(results.b, bar);
        assert.equal(results.c, undefined);
        assert.equal(Object.keys(results).length, 3);
        done();
      });
    });
  });

  it('can overwrite a key', function (done) {
    var store = this.store;
    store.set({ a: 1 }, function (err) {
      assert.equal(err, null);
      store.set({ a: 2 }, function (err) {
        assert.equal(err, null);
        store.get(['a'], function (err, results) {
          assert.equal(err, null);
          assert.equal(results.a, 2);
          done();
        });
      });
    });
  });

  it('returns undefined when trying to get an empty key', function (done) {
    this.store.get(['something'], function (err, results) {
      assert.equal(err, null);
      assert.equal(results.something, undefined);
      assert.deepEqual(Object.keys(results), ['something']);
      done();
    });
  });

  it('can immediately read from an object if you configure it', function (done) {
    var data = { foo: 123 };
    var store = new Store(data);
    store.get(['foo', 'bar'], function (err, results) {
      assert.equal(err, null);
      assert.equal(data.foo, 123);
      assert.equal(data.bar, undefined);
      assert.equal(Object.keys(results).length, 2);
      done();
    });
  });

  it('can modify an existing data object', function (done) {
    var data = { foo: 123 };
    var store = new Store(data);
    store.set({ bar: 456 }, function (err) {
      assert.equal(err, null);
      assert.equal(data.foo, 123);
      assert.equal(data.bar, 456);
      done();
    });
  });

  it('can remove a key', function (done) {
    var store = this.store;
    store.set({ a: 1 }, function (err) {
      assert.equal(err, null);
      store.remove(['a'], function (err) {
        assert.equal(err, null);
        store.get(['a'], function (err, results) {
          assert.equal(err, null);
          assert.equal(results.a, undefined);
          assert.deepEqual(Object.keys(results), ['a']);
          done();
        });
      });
    });
  });
});
