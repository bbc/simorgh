"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _colours = require("@bbc/psammead-styles/colours");

var _spacings = require("@bbc/gel-foundations/spacings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// `currentColor` has been used to better reflect user colour choices in Firefox.
var MediaIcon =
/*#__PURE__*/
_styledComponents.default.svg.withConfig({
  displayName: "MediaIcon",
  componentId: "sc-12wlo3k-0"
})(["vertical-align:middle;margin:0 ", ";color:", ";fill:currentColor;"], _spacings.GEL_SPACING_HLF, _colours.C_EBON);

var VideoMediaIcon =
/*#__PURE__*/
(0, _styledComponents.default)(MediaIcon).withConfig({
  displayName: "VideoMediaIcon",
  componentId: "sc-12wlo3k-1"
})(["width:0.75rem;height:0.75rem;"]);
var AudioMediaIcon =
/*#__PURE__*/
(0, _styledComponents.default)(MediaIcon).withConfig({
  displayName: "AudioMediaIcon",
  componentId: "sc-12wlo3k-2"
})(["width:0.8125rem;height:0.75rem;"]);
var PhotoMediaIcon =
/*#__PURE__*/
(0, _styledComponents.default)(MediaIcon).withConfig({
  displayName: "PhotoMediaIcon",
  componentId: "sc-12wlo3k-3"
})(["width:1rem;height:0.8125rem;"]);
var icons = {
  video: _react.default.createElement(VideoMediaIcon, {
    viewBox: "0 0 32 32",
    width: "12px",
    height: "12px",
    focusable: "false"
  }, _react.default.createElement("polygon", {
    points: "3,32 29,16 3,0"
  })),
  audio: _react.default.createElement(AudioMediaIcon, {
    viewBox: "0 0 13 12",
    width: "13px",
    height: "12px",
    focusable: "false"
  }, _react.default.createElement("path", {
    d: "M9.021 1.811l-.525.525c.938.938 1.5 2.25 1.5 3.675s-.563 2.738-1.5 3.675l.525.525c1.05-1.087 1.725-2.55 1.725-4.2s-.675-3.112-1.725-4.2z"
  }), _react.default.createElement("path", {
    d: "M10.596.199l-.525.562c1.35 1.35 2.175 3.225 2.175 5.25s-.825 3.9-2.175 5.25l.525.525c1.5-1.462 2.4-3.525 2.4-5.775s-.9-4.312-2.4-5.812zM6.996 1.511l-2.25 2.25H.996v4.5h3.75l2.25 2.25z"
  })),
  photogallery: _react.default.createElement(PhotoMediaIcon, {
    viewBox: "0 0 32 26",
    width: "16px",
    height: "13px",
    focusable: "false"
  }, _react.default.createElement("path", {
    d: "M9,2V0H4V2H0V26H32V2ZM6.5,10A2.5,2.5,0,1,1,9,7.52,2.5,2.5,0,0,1,6.5,10ZM20,23a9,9,0,1,1,9-9A9,9,0,0,1,20,23Z"
  }), _react.default.createElement("circle", {
    cx: "20",
    cy: "14.02",
    r: "5.5"
  }))
};
var _default = icons;
exports.default = _default;