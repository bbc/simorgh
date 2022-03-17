"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _propTypes = require("prop-types");

var _spacings = require("@bbc/gel-foundations/spacings");

var _breakpoints = require("@bbc/gel-foundations/breakpoints");

var _typography = require("@bbc/gel-foundations/typography");

var _colours = require("@bbc/psammead-styles/colours");

var _propTypes2 = require("@bbc/gel-foundations/prop-types");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rtlStyles = "\n  margin-right: ".concat(_spacings.GEL_MARGIN_BELOW_400PX, ";\n  border-right: 1px solid ").concat(_colours.C_METAL, ";\n\n  @media (min-width: ").concat(_breakpoints.GEL_GROUP_2_SCREEN_WIDTH_MIN, ") and (max-width: ").concat(_breakpoints.GEL_GROUP_3_SCREEN_WIDTH_MAX, ") {\n    width: calc(100% - ").concat(_spacings.GEL_MARGIN_ABOVE_400PX, ");\n    margin-right: ").concat(_spacings.GEL_MARGIN_ABOVE_400PX, ";\n    padding-right: ").concat(_spacings.GEL_SPACING, ";\n    padding-left: ").concat(_spacings.GEL_MARGIN_ABOVE_400PX, ";\n  }\n\n  @media (min-width: ").concat(_breakpoints.GEL_GROUP_4_SCREEN_WIDTH_MIN, ") {\n    padding-right: ").concat(_spacings.GEL_SPACING, ";\n    padding-left: 0;\n  }\n");
var ltrStyles = "\n  margin-left: ".concat(_spacings.GEL_MARGIN_BELOW_400PX, ";\n  border-left: 1px solid ").concat(_colours.C_METAL, ";\n\n  @media (min-width: ").concat(_breakpoints.GEL_GROUP_2_SCREEN_WIDTH_MIN, ") and (max-width: ").concat(_breakpoints.GEL_GROUP_3_SCREEN_WIDTH_MAX, ") {\n    width: calc(100% - ").concat(_spacings.GEL_MARGIN_ABOVE_400PX, ");\n    margin-left: ").concat(_spacings.GEL_MARGIN_ABOVE_400PX, ";\n    padding-right: ").concat(_spacings.GEL_MARGIN_ABOVE_400PX, ";\n    padding-left: ").concat(_spacings.GEL_SPACING, ";\n  }\n\n  @media (min-width: ").concat(_breakpoints.GEL_GROUP_4_SCREEN_WIDTH_MIN, ") {\n    padding-right: 0;\n    padding-left: ").concat(_spacings.GEL_SPACING, ";\n  }\n");
var Caption = (0, _base.default)("figcaption", process.env.NODE_ENV === "production" ? {
  target: "eede9f50"
} : {
  target: "eede9f50",
  label: "Caption"
})(function (_ref) {
  var script = _ref.script;
  return script && (0, _typography.getLongPrimer)(script);
}, " ", function (_ref2) {
  var service = _ref2.service;
  return (0, _fontStyles.getSansRegular)(service);
}, " color:", _colours.C_METAL, ";margin-top:", _spacings.GEL_SPACING, ";padding-left:", _spacings.GEL_MARGIN_BELOW_400PX, ";padding-right:", _spacings.GEL_MARGIN_BELOW_400PX, ";width:100%;width:calc(100% - ", _spacings.GEL_SPACING, ");@media (min-width: ", _breakpoints.GEL_GROUP_4_SCREEN_WIDTH_MIN, "){width:100%;margin:", _spacings.GEL_SPACING, " 0 0;}&>p{padding-bottom:", _spacings.GEL_SPACING_TRPL, ";margin:0;}&>p:last-child{padding-bottom:0;}", function (_ref3) {
  var dir = _ref3.dir;
  return dir === 'rtl' ? rtlStyles : ltrStyles;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0RpQyIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgb25lT2YsIHNoYXBlLCBzdHJpbmcgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7XG4gIEdFTF9TUEFDSU5HLFxuICBHRUxfU1BBQ0lOR19UUlBMLFxuICBHRUxfTUFSR0lOX0FCT1ZFXzQwMFBYLFxuICBHRUxfTUFSR0lOX0JFTE9XXzQwMFBYLFxufSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQge1xuICBHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUlOLFxuICBHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUFYLFxuICBHRUxfR1JPVVBfNF9TQ1JFRU5fV0lEVEhfTUlOLFxufSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5pbXBvcnQgeyBnZXRMb25nUHJpbWVyIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBDX01FVEFMIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvY29sb3Vycyc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5cbmNvbnN0IHJ0bFN0eWxlcyA9IGBcbiAgbWFyZ2luLXJpZ2h0OiAke0dFTF9NQVJHSU5fQkVMT1dfNDAwUFh9O1xuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAke0NfTUVUQUx9O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8yX1NDUkVFTl9XSURUSF9NSU59KSBhbmQgKG1heC13aWR0aDogJHtHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUFYfSkge1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAke0dFTF9NQVJHSU5fQUJPVkVfNDAwUFh9KTtcbiAgICBtYXJnaW4tcmlnaHQ6ICR7R0VMX01BUkdJTl9BQk9WRV80MDBQWH07XG4gICAgcGFkZGluZy1yaWdodDogJHtHRUxfU1BBQ0lOR307XG4gICAgcGFkZGluZy1sZWZ0OiAke0dFTF9NQVJHSU5fQUJPVkVfNDAwUFh9O1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6ICR7R0VMX0dST1VQXzRfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICBwYWRkaW5nLXJpZ2h0OiAke0dFTF9TUEFDSU5HfTtcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gIH1cbmA7XG5cbmNvbnN0IGx0clN0eWxlcyA9IGBcbiAgbWFyZ2luLWxlZnQ6ICR7R0VMX01BUkdJTl9CRUxPV180MDBQWH07XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgJHtDX01FVEFMfTtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUlOfSkgYW5kIChtYXgtd2lkdGg6ICR7R0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01BWH0pIHtcbiAgICB3aWR0aDogY2FsYygxMDAlIC0gJHtHRUxfTUFSR0lOX0FCT1ZFXzQwMFBYfSk7XG4gICAgbWFyZ2luLWxlZnQ6ICR7R0VMX01BUkdJTl9BQk9WRV80MDBQWH07XG4gICAgcGFkZGluZy1yaWdodDogJHtHRUxfTUFSR0lOX0FCT1ZFXzQwMFBYfTtcbiAgICBwYWRkaW5nLWxlZnQ6ICR7R0VMX1NQQUNJTkd9O1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6ICR7R0VMX0dST1VQXzRfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgIHBhZGRpbmctbGVmdDogJHtHRUxfU1BBQ0lOR307XG4gIH1cbmA7XG5cbmNvbnN0IENhcHRpb24gPSBzdHlsZWQuZmlnY2FwdGlvbmBcbiAgJHsoeyBzY3JpcHQgfSkgPT4gc2NyaXB0ICYmIGdldExvbmdQcmltZXIoc2NyaXB0KX1cbiAgJHsoeyBzZXJ2aWNlIH0pID0+IGdldFNhbnNSZWd1bGFyKHNlcnZpY2UpfVxuICBjb2xvcjogJHtDX01FVEFMfTtcbiAgbWFyZ2luLXRvcDogJHtHRUxfU1BBQ0lOR307XG4gIHBhZGRpbmctbGVmdDogJHtHRUxfTUFSR0lOX0JFTE9XXzQwMFBYfTtcbiAgcGFkZGluZy1yaWdodDogJHtHRUxfTUFSR0lOX0JFTE9XXzQwMFBYfTtcbiAgd2lkdGg6IDEwMCU7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAke0dFTF9TUEFDSU5HfSk7XG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF80X1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAke0dFTF9TUEFDSU5HfSAwIDA7XG4gIH1cbiAgJiA+IHAge1xuICAgIHBhZGRpbmctYm90dG9tOiAke0dFTF9TUEFDSU5HX1RSUEx9O1xuICAgIG1hcmdpbjogMDsgLyogcmVzZXQgKi9cbiAgfVxuICAmID4gcDpsYXN0LWNoaWxkIHtcbiAgICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgfVxuICAkeyh7IGRpciB9KSA9PiAoZGlyID09PSAncnRsJyA/IHJ0bFN0eWxlcyA6IGx0clN0eWxlcyl9XG5gO1xuXG5DYXB0aW9uLnByb3BUeXBlcyA9IHtcbiAgc2NyaXB0OiBzaGFwZShzY3JpcHRQcm9wVHlwZSkuaXNSZXF1aXJlZCxcbiAgZGlyOiBvbmVPZihbJ2x0cicsICdydGwnXSksXG4gIHNlcnZpY2U6IHN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuQ2FwdGlvbi5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpcjogJ2x0cicsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYXB0aW9uO1xuIl19 */"));
Caption.propTypes = {
  script: (0, _propTypes.shape)(_propTypes2.scriptPropType).isRequired,
  dir: (0, _propTypes.oneOf)(['ltr', 'rtl']),
  service: _propTypes.string.isRequired
};
Caption.defaultProps = {
  dir: 'ltr'
};
var _default = Caption;
exports.default = _default;