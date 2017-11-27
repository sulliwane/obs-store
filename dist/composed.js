'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObservableStore = require('../');

var ComposedStore = function (_ObservableStore) {
  _inherits(ComposedStore, _ObservableStore);

  function ComposedStore(children) {
    _classCallCheck(this, ComposedStore);

    // set default state
    var _this = _possibleConstructorReturn(this, (ComposedStore.__proto__ || Object.getPrototypeOf(ComposedStore)).call(this));

    var state = _this.getState();
    if (!state) _this.putState({});
    // subscribe to children
    _this._children = children || {};
    Object.keys(_this._children).forEach(function (childKey) {
      var child = _this._children[childKey];
      _this._addChild(childKey, child);
    });
    return _this;
  }

  _createClass(ComposedStore, [{
    key: '_addChild',
    value: function _addChild(childKey, child) {
      var self = this;
      child.subscribe(updateFromChild);
      updateFromChild(child.getState());

      function updateFromChild(childValue) {
        var state = self.getState();
        state[childKey] = childValue;
        self.putState(state);
      }
    }
  }]);

  return ComposedStore;
}(ObservableStore);

module.exports = ComposedStore;