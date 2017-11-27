'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObservableStore = require('../');

var LocalStorageStore = function (_ObservableStore) {
  _inherits(LocalStorageStore, _ObservableStore);

  function LocalStorageStore() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, LocalStorageStore);

    if (!global.localStorage) throw new Error('LocalStorageStore - can\'t find localStorage.');

    var _this = _possibleConstructorReturn(this, (LocalStorageStore.__proto__ || Object.getPrototypeOf(LocalStorageStore)).call(this));

    _this._storageKey = opts.storageKey;
    if (!_this._storageKey) throw new Error('LocalStorageStore - no storageKey specified.');
    return _this;
  }

  //
  // private
  //

  // read from persistence


  _createClass(LocalStorageStore, [{
    key: '_getState',
    value: function _getState() {
      var serialized = global.localStorage.getItem(this._storageKey);
      return serialized ? JSON.parse(serialized) : undefined;
    }

    // write to persistence

  }, {
    key: '_putState',
    value: function _putState(newState) {
      var serialized = JSON.stringify(newState);
      return global.localStorage.setItem(this._storageKey, serialized);
    }
  }]);

  return LocalStorageStore;
}(ObservableStore);

module.exports = LocalStorageStore;