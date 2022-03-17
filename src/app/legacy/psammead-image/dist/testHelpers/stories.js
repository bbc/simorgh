"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProps = getProps;
exports.stories = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _README = _interopRequireDefault(require("../../README.md"));

var _fixtureData = require("./fixtureData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function getProps(image, includeHeight, type) {
  var props = {
    alt: image.alt,
    sizes: image.sizes,
    src: image.src,
    srcset: image.srcset,
    width: image.width,
    fade: type === 'Img' ? (0, _addonKnobs.boolean)('Fade', false) : null
  };
  props.height = includeHeight ? image.height : null;
  return props;
}

var stories = function stories(Component, title) {
  var includeHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var additionalProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var styleDecorator = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (storyFn) {
    return storyFn();
  };
  var type = arguments.length > 5 ? arguments[5] : undefined;
  return (0, _react2.storiesOf)(title, module).addDecorator(styleDecorator).add('landscape image', function () {
    return /*#__PURE__*/_react.default.createElement(Component, _extends({}, getProps(_fixtureData.landscape, includeHeight, type), additionalProps));
  }, {
    notes: _README.default
  }).add('portrait image', function () {
    return /*#__PURE__*/_react.default.createElement(Component, _extends({}, getProps(_fixtureData.portrait, includeHeight, type), additionalProps));
  }, {
    notes: _README.default
  }).add('square image', function () {
    return /*#__PURE__*/_react.default.createElement(Component, _extends({}, getProps(_fixtureData.square, includeHeight, type), additionalProps));
  }, {
    notes: _README.default
  }).add('custom ratio image', function () {
    return /*#__PURE__*/_react.default.createElement(Component, _extends({}, getProps(_fixtureData.custom, includeHeight, type), additionalProps));
  }, {
    notes: _README.default
  }).add('image with srcset', function () {
    return /*#__PURE__*/_react.default.createElement(Component, _extends({}, getProps(_fixtureData.landscape, includeHeight, type), {
      srcset: _fixtureData.landscape.srcset
    }, additionalProps));
  }, {
    notes: _README.default
  });
};

exports.stories = stories;