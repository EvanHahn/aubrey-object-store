var assign = require('lodash.assign');

function AubreyObjectStore(obj) {
  this._data = obj || {};
}

AubreyObjectStore.prototype.get = function get(keys, callback) {
  var result = {};
  var data = this._data;
  keys.forEach(function (key) { result[key] = data[key]; });
  callback(null, result);
};

AubreyObjectStore.prototype.set = function set(data, callback) {
  assign(this._data, data);
  callback(null);
};

AubreyObjectStore.prototype.remove = function remove(keys, callback) {
  var data = this._data;
  keys.forEach(function (key) { delete data[key]; });
  callback(null);
};

module.exports = AubreyObjectStore;
