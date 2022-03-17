"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MostReadItem = exports.StyledCountSpan = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _typography = require("@bbc/gel-foundations/typography");

var _colours = require("@bbc/psammead-styles/colours");

var _propTypes2 = require("@bbc/gel-foundations/prop-types");

var _spacings = require("@bbc/gel-foundations/spacings");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var StyledCountSpan =
/*#__PURE__*/
_styledComponents.default.span.withConfig({
  displayName: "StyledCountSpan",
  componentId: "sc-1arzkfq-0"
})(["", ";", " color:", ";margin:0;padding-bottom:", ";display:inline-block;min-width:3rem;"], function (_ref) {
  var script = _ref.script;
  return script && (0, _typography.getFoolscap)(script);
}, function (_ref2) {
  var service = _ref2.service;
  return (0, _fontStyles.getSerifLight)(service);
}, _colours.C_POSTBOX, _spacings.GEL_SPACING);

exports.StyledCountSpan = StyledCountSpan;

var StyledLink =
/*#__PURE__*/
_styledComponents.default.a.withConfig({
  displayName: "StyledLink",
  componentId: "sc-1arzkfq-1"
})(["", ";", " color:", ";text-decoration:none;padding-bottom:", ";&:hover,&:focus{text-decoration:underline;}"], function (_ref3) {
  var script = _ref3.script;
  return script && (0, _typography.getDoublePica)(script);
}, function (_ref4) {
  var service = _ref4.service;
  return (0, _fontStyles.getSerifMedium)(service);
}, _colours.C_EBON, _spacings.GEL_SPACING);

var MostReadItem = function MostReadItem(_ref5) {
  var dir = _ref5.dir,
      lastUpdated = _ref5.lastUpdated,
      script = _ref5.script,
      service = _ref5.service,
      _ref5$item = _ref5.item,
      title = _ref5$item.title,
      href = _ref5$item.href;
  return _react.default.createElement(_react.Fragment, {
    dir: dir
  }, _react.default.createElement(StyledLink, {
    href: href,
    script: script,
    service: service
  }, title), lastUpdated);
};

exports.MostReadItem = MostReadItem;
StyledCountSpan.propTypes = {
  service: _propTypes.string.isRequired,
  script: (0, _propTypes.shape)(_propTypes2.scriptPropType).isRequired
};
MostReadItem.propTypes = {
  dir: _propTypes.string,
  service: _propTypes.string.isRequired,
  script: (0, _propTypes.shape)(_propTypes2.scriptPropType).isRequired,
  lastUpdated: _propTypes.node,
  item: (0, _propTypes.shape)({
    title: _propTypes.string.isRequired,
    href: _propTypes.string.isRequired
  }).isRequired
};
MostReadItem.defaultProps = {
  dir: (0, _propTypes.oneOf)(['rtl', 'ltr']),
  lastUpdated: null
};