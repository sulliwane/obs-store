'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MergedStore = require('../');

var ComposedStore = function (_MergedStore) {
  _inherits(ComposedStore, _MergedStore);

  function ComposedStore() {
    var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, ComposedStore);

    // set default state
    var _this = _possibleConstructorReturn(this, (ComposedStore.__proto__ || Object.getPrototypeOf(ComposedStore)).call(this));

    var state = _this.getState();
    if (!state) _this.putState({});
    _this._children = children;
    // subscribe to children
    children.forEach(function (child) {
      return _this._addChild(child);
    });
    _this._updateWholeState();
    return _this;
  }

  _createClass(ComposedStore, [{
    key: '_addChild',
    value: function _addChild(child) {
      var _this2 = this;

      child.subscribe(function () {
        return _this2._updateWholeState();
      });
    }
  }, {
    key: '_updateWholeState',
    value: function _updateWholeState() {
      var childStates = this._children.map(function (child) {
        return child.getState();
      });
      // apply shallow merge over states
      childStates.unshift({});
      var state = Object.assign.apply(null, childStates);
      this.putState(state);
    }
  }]);

  return ComposedStore;
}(MergedStore);

module.exports = ComposedStore;