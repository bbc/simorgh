"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _psammeadTestHelpers = require("@bbc/psammead-test-helpers");

var _fixtureData = require("./fixtureData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var snapshotTests = function snapshotTests(Component, additionalProps) {
  (0, _psammeadTestHelpers.shouldMatchSnapshot)('should render landscape image correctly', /*#__PURE__*/_react.default.createElement(Component, _extends({
    alt: _fixtureData.landscape.alt,
    attribution: _fixtureData.landscape.attribution,
    sizes: _fixtureData.landscape.sizes,
    src: _fixtureData.landscape.src,
    height: _fixtureData.landscape.height,
    width: _fixtureData.landscape.width
  }, additionalProps)));
  (0, _psammeadTestHelpers.shouldMatchSnapshot)('should render portrait image correctly', /*#__PURE__*/_react.default.createElement(Component, _extends({
    alt: _fixtureData.portrait.alt,
    attribution: _fixtureData.portrait.attribution,
    sizes: _fixtureData.portrait.sizes,
    src: _fixtureData.portrait.src,
    height: _fixtureData.portrait.height,
    width: _fixtureData.portrait.width
  }, additionalProps)));
  (0, _psammeadTestHelpers.shouldMatchSnapshot)('should render square image correctly', /*#__PURE__*/_react.default.createElement(Component, _extends({
    alt: _fixtureData.square.alt,
    attribution: _fixtureData.square.attribution,
    sizes: _fixtureData.square.sizes,
    src: _fixtureData.square.src,
    height: _fixtureData.square.height,
    width: _fixtureData.square.width
  }, additionalProps)));
  (0, _psammeadTestHelpers.shouldMatchSnapshot)('should render image with custom dimensions correctly', /*#__PURE__*/_react.default.createElement(Component, _extends({
    alt: _fixtureData.custom.alt,
    attribution: _fixtureData.custom.attribution,
    sizes: _fixtureData.custom.sizes,
    src: _fixtureData.custom.src,
    height: _fixtureData.custom.height,
    width: _fixtureData.custom.width
  }, additionalProps)));
  (0, _psammeadTestHelpers.shouldMatchSnapshot)('should render image with srcset correctly', /*#__PURE__*/_react.default.createElement(Component, _extends({
    alt: _fixtureData.landscape.alt,
    attribution: _fixtureData.landscape.attribution,
    sizes: _fixtureData.landscape.sizes,
    src: _fixtureData.landscape.src,
    srcset: _fixtureData.landscape.srcset,
    height: _fixtureData.landscape.height,
    width: _fixtureData.landscape.width
  }, additionalProps)));
};

var _default = snapshotTests;
exports.default = _default;