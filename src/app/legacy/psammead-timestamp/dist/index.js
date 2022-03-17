"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _spacings = require("@bbc/gel-foundations/spacings");

var _typography = require("@bbc/gel-foundations/typography");

var _propTypes2 = require("@bbc/gel-foundations/prop-types");

var _colours = require("@bbc/psammead-styles/colours");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PADDING = "\n  padding-bottom: ".concat(_spacings.GEL_SPACING_HLF, ";\n  &:last-child {\n    padding-bottom: ").concat(_spacings.GEL_SPACING_DBL, ";\n  }\n");
var StyledTimestamp = (0, _base.default)("time", process.env.NODE_ENV === "production" ? {
  target: "e4zesg50"
} : {
  target: "e4zesg50",
  label: "StyledTimestamp"
})(function (_ref) {
  var script = _ref.script,
      typographyFunc = _ref.typographyFunc;
  return script && typographyFunc && typographyFunc(script);
}, " color:", function (_ref2) {
  var darkMode = _ref2.darkMode;
  return darkMode ? _colours.C_LUNAR : _colours.C_METAL;
}, ";display:block;", function (_ref3) {
  var service = _ref3.service;
  return (0, _fontStyles.getSansRegular)(service);
}, " ", function (props) {
  return props.padding && PADDING;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUJtQyIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IG5vZGUsIHN0cmluZywgZnVuYywgc2hhcGUsIGJvb2wgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7XG4gIEdFTF9TUEFDSU5HX0hMRixcbiAgR0VMX1NQQUNJTkdfREJMLFxufSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgeyBnZXRCcmV2aWVyIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ19MVU5BUiwgQ19NRVRBTCB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5cbmNvbnN0IFBBRERJTkcgPSBgXG4gIHBhZGRpbmctYm90dG9tOiAke0dFTF9TUEFDSU5HX0hMRn07XG4gICY6bGFzdC1jaGlsZCB7XG4gICAgcGFkZGluZy1ib3R0b206ICR7R0VMX1NQQUNJTkdfREJMfTtcbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkVGltZXN0YW1wID0gc3R5bGVkLnRpbWVgXG4gICR7KHsgc2NyaXB0LCB0eXBvZ3JhcGh5RnVuYyB9KSA9PlxuICAgIHNjcmlwdCAmJiB0eXBvZ3JhcGh5RnVuYyAmJiB0eXBvZ3JhcGh5RnVuYyhzY3JpcHQpfVxuICBjb2xvcjogJHsoeyBkYXJrTW9kZSB9KSA9PiAoZGFya01vZGUgPyBDX0xVTkFSIDogQ19NRVRBTCl9O1xuICBkaXNwbGF5OiBibG9jaztcbiAgJHsoeyBzZXJ2aWNlIH0pID0+IGdldFNhbnNSZWd1bGFyKHNlcnZpY2UpfVxuICAke3Byb3BzID0+IHByb3BzLnBhZGRpbmcgJiYgUEFERElOR31cbmA7XG5cbmNvbnN0IFRpbWVzdGFtcCA9ICh7XG4gIGNoaWxkcmVuLFxuICBkYXRldGltZSxcbiAgdHlwb2dyYXBoeUZ1bmMsXG4gIHNjcmlwdCxcbiAgcGFkZGluZyxcbiAgc2VydmljZSxcbiAgZGFya01vZGUsXG4gIGNsYXNzTmFtZSxcbn0pID0+IChcbiAgPFN0eWxlZFRpbWVzdGFtcFxuICAgIGRhdGVUaW1lPXtkYXRldGltZX1cbiAgICB0eXBvZ3JhcGh5RnVuYz17dHlwb2dyYXBoeUZ1bmN9XG4gICAgc2NyaXB0PXtzY3JpcHR9XG4gICAgcGFkZGluZz17cGFkZGluZ31cbiAgICBzZXJ2aWNlPXtzZXJ2aWNlfVxuICAgIGRhcmtNb2RlPXtkYXJrTW9kZX1cbiAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9TdHlsZWRUaW1lc3RhbXA+XG4pO1xuXG5UaW1lc3RhbXAuZGVmYXVsdFByb3BzID0ge1xuICB0eXBvZ3JhcGh5RnVuYzogZ2V0QnJldmllcixcbiAgcGFkZGluZzogdHJ1ZSxcbiAgZGFya01vZGU6IGZhbHNlLFxuICBjbGFzc05hbWU6IG51bGwsXG59O1xuXG5UaW1lc3RhbXAucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZS5pc1JlcXVpcmVkLFxuICBkYXRldGltZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHR5cG9ncmFwaHlGdW5jOiBmdW5jLFxuICBwYWRkaW5nOiBib29sLFxuICBzY3JpcHQ6IHNoYXBlKHNjcmlwdFByb3BUeXBlKS5pc1JlcXVpcmVkLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgZGFya01vZGU6IGJvb2wsXG4gIGNsYXNzTmFtZTogc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGltZXN0YW1wO1xuIl19 */"));

var Timestamp = function Timestamp(_ref4) {
  var children = _ref4.children,
      datetime = _ref4.datetime,
      typographyFunc = _ref4.typographyFunc,
      script = _ref4.script,
      padding = _ref4.padding,
      service = _ref4.service,
      darkMode = _ref4.darkMode,
      className = _ref4.className;
  return /*#__PURE__*/_react.default.createElement(StyledTimestamp, {
    dateTime: datetime,
    typographyFunc: typographyFunc,
    script: script,
    padding: padding,
    service: service,
    darkMode: darkMode,
    className: className
  }, children);
};

Timestamp.defaultProps = {
  typographyFunc: _typography.getBrevier,
  padding: true,
  darkMode: false,
  className: null
};
Timestamp.propTypes = {
  children: _propTypes.node.isRequired,
  datetime: _propTypes.string.isRequired,
  typographyFunc: _propTypes.func,
  padding: _propTypes.bool,
  script: (0, _propTypes.shape)(_propTypes2.scriptPropType).isRequired,
  service: _propTypes.string.isRequired,
  darkMode: _propTypes.bool,
  className: _propTypes.string
};
var _default = Timestamp;
exports.default = _default;