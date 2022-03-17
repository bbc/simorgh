"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _spacings = require("@bbc/gel-foundations/spacings");

var _detection = require("@bbc/psammead-styles/detection");

var _psammeadGrid = _interopRequireDefault(require("@bbc/psammead-grid"));

var _propTypes = require("prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Wrapping Grid + adds the dividers
var RecentEpisodes = /*#__PURE__*/_styledComponents.default.ul.withConfig({
  displayName: "RecentEpisodes",
  componentId: "z10ngj-0"
})(["li{border-bottom:1px black solid;}"]); // Get SVG
// Align to top


var PlayIcon = /*#__PURE__*/_styledComponents.default.div.withConfig({
  displayName: "PlayIcon",
  componentId: "z10ngj-1"
})(["display:inline-block;"]);

var Wrapper = /*#__PURE__*/_styledComponents.default.h3.withConfig({
  displayName: "Wrapper",
  componentId: "z10ngj-2"
})(["display:inline-block;"]); // Most stuff goes


RecentEpisodes.Episode = function (_ref) {
  var children = _ref.children,
      Link = _ref.Link;
  return /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement(Link, null, /*#__PURE__*/_react.default.createElement(PlayIcon, null, "Play!"), /*#__PURE__*/_react.default.createElement(Wrapper, null, children)));
};

RecentEpisodes.BrandTitle = _styledComponents.default.h2.withConfig({
  displayName: "BrandTitle",
  componentId: "z10ngj-3"
})([""]);
RecentEpisodes.EpisodeTitle = _styledComponents.default.p.withConfig({
  displayName: "EpisodeTitle",
  componentId: "z10ngj-4"
})([""]);
RecentEpisodes.Date = _styledComponents.default.p.withConfig({
  displayName: "Date",
  componentId: "z10ngj-5"
})([""]);
RecentEpisodes.Duration = _styledComponents.default.p.withConfig({
  displayName: "Duration",
  componentId: "z10ngj-6"
})([""]);
RecentEpisodes.propTypes = {};
RecentEpisodes.defaultProps = {};
var _default = RecentEpisodes;
exports.default = _default;