"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = require("prop-types");

var _colours = require("@bbc/psammead-styles/colours");

var _typography = require("@bbc/gel-foundations/typography");

var _propTypes2 = require("@bbc/gel-foundations/prop-types");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var StyledHeading =
/*#__PURE__*/
_styledComponents.default.h2.withConfig({
  displayName: "StyledHeading",
  componentId: "jk7ltd-0"
})(["", ";", " color:", ";"], function (_ref) {
  var script = _ref.script;
  return script && (0, _typography.getTrafalgar)(script);
}, function (_ref2) {
  var service = _ref2.service;
  return (0, _fontStyles.getSansRegular)(service);
}, _colours.C_SHADOW);

var MostReadTitle = function MostReadTitle(_ref3) {
  var header = _ref3.header,
      props = _objectWithoutProperties(_ref3, ["header"]);

  return _react.default.createElement(StyledHeading, props, header);
};

MostReadTitle.propTypes = {
  script: (0, _propTypes.shape)(_propTypes2.scriptPropType).isRequired,
  service: _propTypes.string.isRequired,
  header: _propTypes.string.isRequired
};
var _default = MostReadTitle;
exports.default = _default;