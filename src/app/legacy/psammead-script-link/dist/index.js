"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireDefault(require("react"));

var _spacings = require("@bbc/gel-foundations/spacings");

var _breakpoints = require("@bbc/gel-foundations/breakpoints");

var _colours = require("@bbc/psammead-styles/colours");

var _typography = require("@bbc/gel-foundations/typography");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

var _propTypes = require("prop-types");

var _propTypes2 = require("@bbc/gel-foundations/prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledLink = (0, _base.default)("a", process.env.NODE_ENV === "production" ? {
  target: "e7ycfcy1"
} : {
  target: "e7ycfcy1",
  label: "StyledLink"
})(function (_ref) {
  var script = _ref.script;
  return script && (0, _typography.getPica)(script);
}, " ", function (_ref2) {
  var service = _ref2.service;
  return service && (0, _fontStyles.getSansRegular)(service);
}, " display:inline-block;color:", _colours.C_WHITE, ";text-decoration:none;height:2.25rem;border:0.0625rem solid ", _colours.C_WHITE, ";margin:", _spacings.GEL_SPACING, " 0 ", _spacings.GEL_SPACING, " ", _spacings.GEL_SPACING, ";@media (min-width: ", _breakpoints.GEL_GROUP_2_SCREEN_WIDTH_MIN, "){line-height:calc(2.25rem - ", _spacings.GEL_SPACING, ");}@media (max-width: ", _breakpoints.GEL_GROUP_2_SCREEN_WIDTH_MAX, "){height:", _spacings.GEL_SPACING_QUIN, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYTJCIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkcsIEdFTF9TUEFDSU5HX1FVSU4gfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQge1xuICBHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUlOLFxuICBHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUFYLFxufSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5pbXBvcnQgeyBDX1dISVRFIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvY29sb3Vycyc7XG5pbXBvcnQgeyBnZXRQaWNhIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBnZXRTYW5zUmVndWxhciB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2ZvbnQtc3R5bGVzJztcbmltcG9ydCB7IHN0cmluZywgc2hhcGUsIG5vZGUsIGZ1bmMgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHNjcmlwdFByb3BUeXBlIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvcHJvcC10eXBlcyc7XG5cbmNvbnN0IFN0eWxlZExpbmsgPSBzdHlsZWQuYWBcbiAgJHsoeyBzY3JpcHQgfSkgPT4gc2NyaXB0ICYmIGdldFBpY2Eoc2NyaXB0KX1cbiAgJHsoeyBzZXJ2aWNlIH0pID0+IHNlcnZpY2UgJiYgZ2V0U2Fuc1JlZ3VsYXIoc2VydmljZSl9XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgY29sb3I6ICR7Q19XSElURX07XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgaGVpZ2h0OiAyLjI1cmVtO1xuICBib3JkZXI6IDAuMDYyNXJlbSBzb2xpZCAke0NfV0hJVEV9O1xuICBtYXJnaW46ICR7R0VMX1NQQUNJTkd9IDAgJHtHRUxfU1BBQ0lOR30gJHtHRUxfU1BBQ0lOR307XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6ICR7R0VMX0dST1VQXzJfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICBsaW5lLWhlaWdodDogY2FsYygyLjI1cmVtIC0gJHtHRUxfU1BBQ0lOR30pO1xuICB9XG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6ICR7R0VMX0dST1VQXzJfU0NSRUVOX1dJRFRIX01BWH0pIHtcbiAgICBoZWlnaHQ6ICR7R0VMX1NQQUNJTkdfUVVJTn07XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZFNwYW4gPSBzdHlsZWQuc3BhbmBcbiAgbWFyZ2luOiAwLjE4NzVyZW07XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgaGVpZ2h0OiBjYWxjKDEwMCUpO1xuICBwYWRkaW5nOiAwICR7R0VMX1NQQUNJTkd9O1xuXG4gIC8qIHN0eWxlbGludC1kaXNhYmxlICovXG4gICR7U3R5bGVkTGlua306aG92ZXIgJixcbiAgJHtTdHlsZWRMaW5rfTpmb2N1cyAmIHtcbiAgICBtYXJnaW46IDA7XG4gICAgYm9yZGVyOiAwLjE4NzVyZW0gc29saWQgJHtDX1dISVRFfTtcbiAgfVxuICAvKiBzdHlsZWxpbnQtZW5hYmxlICovXG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6ICR7R0VMX0dST1VQXzJfU0NSRUVOX1dJRFRIX01BWH0pIHtcbiAgICBsaW5lLWhlaWdodDogY2FsYygke0dFTF9TUEFDSU5HX1FVSU59IC0gJHtHRUxfU1BBQ0lOR30pO1xuICB9XG5gO1xuXG5jb25zdCBTY3JpcHRMaW5rID0gKHsgY2hpbGRyZW4sIHNjcmlwdCwgc2VydmljZSwgaHJlZiwgdmFyaWFudCwgb25DbGljayB9KSA9PiAoXG4gIDxTdHlsZWRMaW5rXG4gICAgc2NyaXB0PXtzY3JpcHR9XG4gICAgc2VydmljZT17c2VydmljZX1cbiAgICBocmVmPXtocmVmfVxuICAgIGRhdGEtdmFyaWFudD17dmFyaWFudH1cbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICA+XG4gICAgPFN0eWxlZFNwYW4+e2NoaWxkcmVufTwvU3R5bGVkU3Bhbj5cbiAgPC9TdHlsZWRMaW5rPlxuKTtcblxuY29uc3Qgbm9vcEZ1bmN0aW9uID0gKCkgPT4ge307XG5cblNjcmlwdExpbmsuZGVmYXVsdFByb3BzID0ge1xuICB2YXJpYW50OiBudWxsLFxuICBvbkNsaWNrOiBub29wRnVuY3Rpb24sXG59O1xuXG5TY3JpcHRMaW5rLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IG5vZGUuaXNSZXF1aXJlZCxcbiAgc2NyaXB0OiBzaGFwZShzY3JpcHRQcm9wVHlwZSkuaXNSZXF1aXJlZCxcbiAgc2VydmljZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGhyZWY6IHN0cmluZy5pc1JlcXVpcmVkLFxuICB2YXJpYW50OiBzdHJpbmcsXG4gIG9uQ2xpY2s6IGZ1bmMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTY3JpcHRMaW5rO1xuIl19 */"));
var StyledSpan = (0, _base.default)("span", process.env.NODE_ENV === "production" ? {
  target: "e7ycfcy0"
} : {
  target: "e7ycfcy0",
  label: "StyledSpan"
})("margin:0.1875rem;display:inline-block;height:calc(100%);padding:0 ", _spacings.GEL_SPACING, ";", StyledLink, ":hover &,", StyledLink, ":focus &{margin:0;border:0.1875rem solid ", _colours.C_WHITE, ";}@media (max-width: ", _breakpoints.GEL_GROUP_2_SCREEN_WIDTH_MAX, "){line-height:calc(", _spacings.GEL_SPACING_QUIN, " - ", _spacings.GEL_SPACING, ");}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0M4QiIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IEdFTF9TUEFDSU5HLCBHRUxfU1BBQ0lOR19RVUlOIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvc3BhY2luZ3MnO1xuaW1wb3J0IHtcbiAgR0VMX0dST1VQXzJfU0NSRUVOX1dJRFRIX01JTixcbiAgR0VMX0dST1VQXzJfU0NSRUVOX1dJRFRIX01BWCxcbn0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvYnJlYWtwb2ludHMnO1xuaW1wb3J0IHsgQ19XSElURSB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgZ2V0UGljYSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3R5cG9ncmFwaHknO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5pbXBvcnQgeyBzdHJpbmcsIHNoYXBlLCBub2RlLCBmdW5jIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuXG5jb25zdCBTdHlsZWRMaW5rID0gc3R5bGVkLmFgXG4gICR7KHsgc2NyaXB0IH0pID0+IHNjcmlwdCAmJiBnZXRQaWNhKHNjcmlwdCl9XG4gICR7KHsgc2VydmljZSB9KSA9PiBzZXJ2aWNlICYmIGdldFNhbnNSZWd1bGFyKHNlcnZpY2UpfVxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGNvbG9yOiAke0NfV0hJVEV9O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGhlaWdodDogMi4yNXJlbTtcbiAgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgJHtDX1dISVRFfTtcbiAgbWFyZ2luOiAke0dFTF9TUEFDSU5HfSAwICR7R0VMX1NQQUNJTkd9ICR7R0VMX1NQQUNJTkd9O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8yX1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgbGluZS1oZWlnaHQ6IGNhbGMoMi4yNXJlbSAtICR7R0VMX1NQQUNJTkd9KTtcbiAgfVxuXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAke0dFTF9HUk9VUF8yX1NDUkVFTl9XSURUSF9NQVh9KSB7XG4gICAgaGVpZ2h0OiAke0dFTF9TUEFDSU5HX1FVSU59O1xuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRTcGFuID0gc3R5bGVkLnNwYW5gXG4gIG1hcmdpbjogMC4xODc1cmVtO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGhlaWdodDogY2FsYygxMDAlKTtcbiAgcGFkZGluZzogMCAke0dFTF9TUEFDSU5HfTtcblxuICAvKiBzdHlsZWxpbnQtZGlzYWJsZSAqL1xuICAke1N0eWxlZExpbmt9OmhvdmVyICYsXG4gICR7U3R5bGVkTGlua306Zm9jdXMgJiB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGJvcmRlcjogMC4xODc1cmVtIHNvbGlkICR7Q19XSElURX07XG4gIH1cbiAgLyogc3R5bGVsaW50LWVuYWJsZSAqL1xuXG4gIEBtZWRpYSAobWF4LXdpZHRoOiAke0dFTF9HUk9VUF8yX1NDUkVFTl9XSURUSF9NQVh9KSB7XG4gICAgbGluZS1oZWlnaHQ6IGNhbGMoJHtHRUxfU1BBQ0lOR19RVUlOfSAtICR7R0VMX1NQQUNJTkd9KTtcbiAgfVxuYDtcblxuY29uc3QgU2NyaXB0TGluayA9ICh7IGNoaWxkcmVuLCBzY3JpcHQsIHNlcnZpY2UsIGhyZWYsIHZhcmlhbnQsIG9uQ2xpY2sgfSkgPT4gKFxuICA8U3R5bGVkTGlua1xuICAgIHNjcmlwdD17c2NyaXB0fVxuICAgIHNlcnZpY2U9e3NlcnZpY2V9XG4gICAgaHJlZj17aHJlZn1cbiAgICBkYXRhLXZhcmlhbnQ9e3ZhcmlhbnR9XG4gICAgb25DbGljaz17b25DbGlja31cbiAgPlxuICAgIDxTdHlsZWRTcGFuPntjaGlsZHJlbn08L1N0eWxlZFNwYW4+XG4gIDwvU3R5bGVkTGluaz5cbik7XG5cbmNvbnN0IG5vb3BGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG5TY3JpcHRMaW5rLmRlZmF1bHRQcm9wcyA9IHtcbiAgdmFyaWFudDogbnVsbCxcbiAgb25DbGljazogbm9vcEZ1bmN0aW9uLFxufTtcblxuU2NyaXB0TGluay5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBub2RlLmlzUmVxdWlyZWQsXG4gIHNjcmlwdDogc2hhcGUoc2NyaXB0UHJvcFR5cGUpLmlzUmVxdWlyZWQsXG4gIHNlcnZpY2U6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBocmVmOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgdmFyaWFudDogc3RyaW5nLFxuICBvbkNsaWNrOiBmdW5jLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2NyaXB0TGluaztcbiJdfQ== */"));

var ScriptLink = function ScriptLink(_ref3) {
  var children = _ref3.children,
      script = _ref3.script,
      service = _ref3.service,
      href = _ref3.href,
      variant = _ref3.variant,
      onClick = _ref3.onClick;
  return /*#__PURE__*/_react.default.createElement(StyledLink, {
    script: script,
    service: service,
    href: href,
    "data-variant": variant,
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement(StyledSpan, null, children));
};

var noopFunction = function noopFunction() {};

ScriptLink.defaultProps = {
  variant: null,
  onClick: noopFunction
};
ScriptLink.propTypes = {
  children: _propTypes.node.isRequired,
  script: (0, _propTypes.shape)(_propTypes2.scriptPropType).isRequired,
  service: _propTypes.string.isRequired,
  href: _propTypes.string.isRequired,
  variant: _propTypes.string,
  onClick: _propTypes.func
};
var _default = ScriptLink;
exports.default = _default;