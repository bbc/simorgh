"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AMP_AD = exports.AMP_ADS_JS = exports.AMP_MUSTACHE_JS = exports.AMP_LIST_JS = exports.AMP_GEO_JS = exports.AMP_CONSENT_JS = exports.AMP_BIND_JS = exports.AMP_ANALYTICS_JS = exports.AMP_ACCESS_JS = exports.AMP_JS = exports.AMP_NO_SCRIPT = exports.AMP_SCRIPT = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  AMP Boilerplate Code https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md
*/
var AMP_SCRIPT = "body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}";
exports.AMP_SCRIPT = AMP_SCRIPT;
var AMP_NO_SCRIPT = "body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}";
exports.AMP_NO_SCRIPT = AMP_NO_SCRIPT;

var AMP_JS = /*#__PURE__*/_react.default.createElement("script", {
  async: true,
  src: "https://cdn.ampproject.org/v0.js"
});

exports.AMP_JS = AMP_JS;

var AMP_ACCESS_JS = /*#__PURE__*/_react.default.createElement("script", {
  async: true,
  "custom-element": "amp-access",
  src: "https://cdn.ampproject.org/v0/amp-access-0.1.js"
});

exports.AMP_ACCESS_JS = AMP_ACCESS_JS;

var AMP_ANALYTICS_JS = /*#__PURE__*/_react.default.createElement("script", {
  async: true,
  "custom-element": "amp-analytics",
  src: "https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
});

exports.AMP_ANALYTICS_JS = AMP_ANALYTICS_JS;

var AMP_BIND_JS = /*#__PURE__*/_react.default.createElement("script", {
  async: true,
  "custom-element": "amp-bind",
  src: "https://cdn.ampproject.org/v0/amp-bind-0.1.js"
});

exports.AMP_BIND_JS = AMP_BIND_JS;

var AMP_CONSENT_JS = /*#__PURE__*/_react.default.createElement("script", {
  async: true,
  "custom-element": "amp-consent",
  src: "https://cdn.ampproject.org/v0/amp-consent-0.1.js"
});

exports.AMP_CONSENT_JS = AMP_CONSENT_JS;

var AMP_GEO_JS = /*#__PURE__*/_react.default.createElement("script", {
  async: true,
  "custom-element": "amp-geo",
  src: "https://cdn.ampproject.org/v0/amp-geo-0.1.js"
});

exports.AMP_GEO_JS = AMP_GEO_JS;

var AMP_LIST_JS = /*#__PURE__*/_react.default.createElement("script", {
  async: true,
  "custom-element": "amp-list",
  src: "https://cdn.ampproject.org/v0/amp-list-0.1.js"
});

exports.AMP_LIST_JS = AMP_LIST_JS;

var AMP_MUSTACHE_JS = /*#__PURE__*/_react.default.createElement("script", {
  async: true,
  "custom-template": "amp-mustache",
  src: "https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
});

exports.AMP_MUSTACHE_JS = AMP_MUSTACHE_JS;

var AMP_ADS_JS = /*#__PURE__*/_react.default.createElement("script", {
  async: true,
  "custom-element": "amp-ad",
  src: "https://cdn.ampproject.org/v0/amp-ad-0.1.js"
});

exports.AMP_ADS_JS = AMP_ADS_JS;

var AMP_AD = /*#__PURE__*/_react.default.createElement("script", {
  async: true,
  "custom-element": "amp-ad",
  src: "https://cdn.ampproject.org/v0/amp-ad-0.1.js"
});

exports.AMP_AD = AMP_AD;