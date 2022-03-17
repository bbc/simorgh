"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _reactHelmet = require("react-helmet");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Instagram = function Instagram(_ref) {
  var id = _ref.id;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmet.Helmet, null, /*#__PURE__*/_react.default.createElement("script", {
    async: true,
    "custom-element": "amp-instagram",
    src: "https://cdn.ampproject.org/v0/amp-instagram-0.1.js"
  })), /*#__PURE__*/_react.default.createElement("amp-instagram", {
    "data-captioned": true,
    "data-shortcode": id,
    height: "1",
    layout: "responsive",
    width: "1"
  }));
};

var Twitter = function Twitter(_ref2) {
  var id = _ref2.id;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmet.Helmet, null, /*#__PURE__*/_react.default.createElement("script", {
    async: true,
    "custom-element": "amp-twitter",
    src: "https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
  })), /*#__PURE__*/_react.default.createElement("amp-twitter", {
    "data-tweetid": id,
    height: "9",
    layout: "responsive",
    width: "16"
  }));
};

var YouTube = function YouTube(_ref3) {
  var id = _ref3.id;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmet.Helmet, null, /*#__PURE__*/_react.default.createElement("script", {
    async: true,
    "custom-element": "amp-youtube",
    src: "https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
  })), /*#__PURE__*/_react.default.createElement("amp-youtube", {
    "data-videoid": id,
    height: "9",
    layout: "responsive",
    width: "16"
  }));
};

var sharedPropTypes = {
  id: _propTypes.string.isRequired
};
Instagram.propTypes = sharedPropTypes;
Twitter.propTypes = sharedPropTypes;
YouTube.propTypes = sharedPropTypes;
var _default = {
  instagram: /*#__PURE__*/(0, _react.memo)(Instagram),
  twitter: /*#__PURE__*/(0, _react.memo)(Twitter),
  youtube: /*#__PURE__*/(0, _react.memo)(YouTube)
};
exports.default = _default;