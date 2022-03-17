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

var MOST_READ_LABEL = 'most-read-title';

var StyledHeading =
/*#__PURE__*/
_styledComponents.default.h2.withConfig({
  displayName: "StyledHeading",
  componentId: "sc-2f873t-0"
})(["", " ", ";color:", ";"], function (_ref) {
  var service = _ref.service;
  return (0, _fontStyles.getSansRegular)(service);
}, function (_ref2) {
  var script = _ref2.script;
  return script && (0, _typography.getTrafalgar)(script);
}, _colours.C_SHADOW);

var StyledSection =
/*#__PURE__*/
_styledComponents.default.section.attrs(function (props) {
  return {
    'aria-labelledby': props.labelId,
    role: 'region'
  };
}).withConfig({
  displayName: "StyledSection",
  componentId: "sc-2f873t-1"
})([""]);

var MostReadTitle = function MostReadTitle(_ref3) {
  var header = _ref3.header,
      service = _ref3.service,
      script = _ref3.script,
      dir = _ref3.dir,
      _ref3$labelId = _ref3.labelId,
      labelId = _ref3$labelId === void 0 ? MOST_READ_LABEL : _ref3$labelId;
  return _react.default.createElement(StyledSection, {
    labelId: labelId
  }, _react.default.createElement(StyledHeading, {
    dir: dir,
    id: labelId,
    script: script,
    service: service
  }, header));
};

MostReadTitle.propTypes = {
  header: _propTypes.string.isRequired,
  service: _propTypes.string.isRequired,
  script: (0, _propTypes.shape)(_propTypes2.scriptPropType).isRequired,
  dir: (0, _propTypes.oneOf)(['rtl', 'ltr']),
  labelId: _propTypes.string
};
MostReadTitle.defaultProps = {
  dir: 'ltr',
  labelId: MOST_READ_LABEL
};
var _default = MostReadTitle;
exports.default = _default;