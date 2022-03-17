"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _reactHelmet = require("react-helmet");

var _psammeadImage = require("@bbc/psammead-image");

var _Message = _interopRequireDefault(require("../Message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AmpHead = function AmpHead() {
  return /*#__PURE__*/_react.default.createElement(_reactHelmet.Helmet, null, /*#__PURE__*/_react.default.createElement("script", {
    async: true,
    "custom-element": "amp-iframe",
    src: "https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
  }));
};

var AmpMediaPlayer = function AmpMediaPlayer(_ref) {
  var src = _ref.src,
      placeholderSrc = _ref.placeholderSrc,
      placeholderSrcset = _ref.placeholderSrcset,
      title = _ref.title,
      height = _ref.height,
      width = _ref.width,
      noJsMessage = _ref.noJsMessage,
      service = _ref.service;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(AmpHead, null), /*#__PURE__*/_react.default.createElement("amp-iframe", {
    "data-e2e": "media-player",
    sandbox: "allow-scripts allow-same-origin",
    layout: "fill",
    scrolling: "no",
    frameborder: "0",
    src: src,
    title: title,
    allowfullscreen: "allowfullscreen"
  }, /*#__PURE__*/_react.default.createElement(_psammeadImage.AmpImg, {
    "data-e2e": "media-player__placeholder",
    layout: "fill",
    src: placeholderSrc,
    srcset: placeholderSrcset,
    placeholder: true,
    alt: "",
    height: height,
    width: width
  }), /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement(_Message.default, {
    service: service,
    message: noJsMessage,
    placeholderSrc: placeholderSrc,
    placeholderSrcset: placeholderSrcset
  }))));
};

AmpMediaPlayer.propTypes = {
  src: _propTypes.string.isRequired,
  placeholderSrc: _propTypes.string.isRequired,
  placeholderSrcset: _propTypes.string,
  title: _propTypes.string.isRequired,
  height: _propTypes.number.isRequired,
  width: _propTypes.number.isRequired,
  noJsMessage: _propTypes.string.isRequired,
  service: _propTypes.string.isRequired
};
AmpMediaPlayer.defaultProps = {
  placeholderSrcset: null
};
var _default = AmpMediaPlayer;
exports.default = _default;