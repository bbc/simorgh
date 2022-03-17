"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _colours = require("@bbc/psammead-styles/colours");

var _svgs = require("@bbc/psammead-assets/svgs");

var _breakpoints = require("@bbc/gel-foundations/breakpoints");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var bgImageDark = "data:image/svg+xml;base64,".concat(_svgs.BBC_BLOCKS_DARK_MODE);
var bgImageRegular = "data:image/svg+xml;base64,".concat(_svgs.BBC_BLOCKS);

var AmpImgPlaceholderContainer = function AmpImgPlaceholderContainer(_ref) {
  var darkMode = _ref.darkMode,
      fallback = _ref.fallback,
      placeholder = _ref.placeholder,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      backgroundColor: "".concat(darkMode ? _colours.C_SHADOW : _colours.C_LUNAR)
    },
    fallback: fallback,
    placeholder: placeholder
  }, children);
};

var AmpImgPlaceholder = function AmpImgPlaceholder(props) {
  return /*#__PURE__*/_react.default.createElement("amp-img", _extends({
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  }, props));
};

var AmpImgMediaQueries = function AmpImgMediaQueries(_ref2) {
  var darkMode = _ref2.darkMode;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(AmpImgPlaceholder, {
    media: "(max-width: ".concat(_breakpoints.GEL_GROUP_1_SCREEN_WIDTH_MAX, ")"),
    width: "60px",
    height: "17px",
    src: darkMode ? bgImageDark : bgImageRegular
  }), /*#__PURE__*/_react.default.createElement(AmpImgPlaceholder, {
    media: "(min-width: ".concat(_breakpoints.GEL_GROUP_2_SCREEN_WIDTH_MIN, ") and (max-width: ").concat(_breakpoints.GEL_GROUP_3_SCREEN_WIDTH_MAX, ")"),
    width: "77px",
    height: "22px",
    src: darkMode ? bgImageDark : bgImageRegular
  }), /*#__PURE__*/_react.default.createElement(AmpImgPlaceholder, {
    media: "(min-width: ".concat(_breakpoints.GEL_GROUP_4_SCREEN_WIDTH_MIN, ")"),
    width: "93px",
    height: "27px",
    src: darkMode ? bgImageDark : bgImageRegular
  }));
};

var ImagePlaceholderAmp = function ImagePlaceholderAmp(_ref3) {
  var darkMode = _ref3.darkMode;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(AmpImgPlaceholderContainer, {
    darkMode: darkMode,
    placeholder: ""
  }, /*#__PURE__*/_react.default.createElement(AmpImgMediaQueries, {
    darkMode: darkMode
  })), /*#__PURE__*/_react.default.createElement(AmpImgPlaceholderContainer, {
    darkMode: darkMode,
    fallback: ""
  }, /*#__PURE__*/_react.default.createElement(AmpImgMediaQueries, {
    darkMode: darkMode
  })));
};

ImagePlaceholderAmp.propTypes = {
  darkMode: _propTypes.bool
};
ImagePlaceholderAmp.defaultProps = {
  darkMode: false
};
var _default = ImagePlaceholderAmp;
exports.default = _default;