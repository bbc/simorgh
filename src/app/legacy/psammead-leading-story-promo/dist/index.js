"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LeadingPromoHeadline = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _propTypes = require("prop-types");

var _colours = require("@bbc/psammead-styles/colours");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

var _detection = require("@bbc/psammead-styles/detection");

var _breakpoints = require("@bbc/gel-foundations/breakpoints");

var _spacings = require("@bbc/gel-foundations/spacings");

var _typography = require("@bbc/gel-foundations/dist/typography");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fourOfSixColumnsMaxWidthScaleable = "66.67%"; // (4 / 6) * 100 = 66.6666666667 = 66.67%

var twoOfSixColumnsMaxWidthScaleable = "33.33%"; // (2 / 6) * 100 = 0.3333333333 = 33.33%

var LeadingPromoWrapper =
/*#__PURE__*/
_styledComponents.default.div.withConfig({
  displayName: "LeadingPromoWrapper",
  componentId: "sc-1a9mfzj-0"
})(["@supports (", "){display:grid;grid-template-columns:repeat(6,1fr);grid-column-gap:", ";}"], _detection.grid, _spacings.GEL_SPACING_DBL);

var ImageGridColumns =
/*#__PURE__*/
(0, _styledComponents.css)(["grid-template-columns:repeat(4,1fr);grid-column-end:span 4;"]);
var ImageGridColumnsFallback =
/*#__PURE__*/
(0, _styledComponents.css)(["width:", ";"], fourOfSixColumnsMaxWidthScaleable);

var ImageGridItem =
/*#__PURE__*/
_styledComponents.default.div.withConfig({
  displayName: "ImageGridItem",
  componentId: "sc-1a9mfzj-1"
})(["display:inline-block;", " @supports (", "){width:initial;@media (min-width:", "){", "}}"], ImageGridColumnsFallback, _detection.grid, _breakpoints.GEL_GROUP_4_SCREEN_WIDTH_MIN, ImageGridColumns);

var TextGridColumns =
/*#__PURE__*/
(0, _styledComponents.css)(["grid-template-columns:repeat(2,1fr);grid-column-end:span 2;"]);
var TextGridColumnsFallBack =
/*#__PURE__*/
(0, _styledComponents.css)(["width:", ";"], twoOfSixColumnsMaxWidthScaleable);

var TextGridItem =
/*#__PURE__*/
_styledComponents.default.div.withConfig({
  displayName: "TextGridItem",
  componentId: "sc-1a9mfzj-2"
})(["display:inline-block;vertical-align:top;", " @supports (", "){width:100%;@media (min-width:", "){", "}}"], TextGridColumnsFallBack, _detection.grid, _breakpoints.GEL_GROUP_4_SCREEN_WIDTH_MIN, TextGridColumns);

var LeadingPromoHeadline =
/*#__PURE__*/
_styledComponents.default.h3.withConfig({
  displayName: "LeadingPromoHeadline",
  componentId: "sc-1a9mfzj-3"
})(["", " ", " color:", ";margin:0;padding-bottom:", ";"], function (_ref) {
  var script = _ref.script;
  return script && (0, _typography.getDoublePica)(script);
}, function (_ref2) {
  var service = _ref2.service;
  return (0, _fontStyles.getSerifMedium)(service);
}, _colours.C_EBON, _spacings.GEL_SPACING);

exports.LeadingPromoHeadline = LeadingPromoHeadline;

var LeadingStoryPromo = function LeadingStoryPromo(_ref3) {
  var image = _ref3.image,
      info = _ref3.info;
  return _react.default.createElement(LeadingPromoWrapper, null, _react.default.createElement(TextGridItem, null, info), _react.default.createElement(ImageGridItem, null, image));
};

LeadingStoryPromo.propTypes = {
  image: _propTypes.node.isRequired,
  info: _propTypes.node.isRequired
};
var _default = LeadingStoryPromo;
exports.default = _default;