"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ScrollableNavigation = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _spacings = require("@bbc/gel-foundations/spacings");

var _breakpoints = require("@bbc/gel-foundations/breakpoints");

var _excluded = ["children", "dir", "brandBackgroundColour", "brandHighlightColour"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// Because IE11 can't handle 8-digit hex, need to convert to rgba
var hexToRGB = function hexToRGB(hex) {
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
};

var StyledScrollableNav = (0, _base.default)("div", process.env.NODE_ENV === "production" ? {
  target: "e1fc18nj0"
} : {
  target: "e1fc18nj0",
  label: "StyledScrollableNav"
})("@media (max-width: ", _breakpoints.GEL_GROUP_2_SCREEN_WIDTH_MAX, "){white-space:nowrap;overflow-x:scroll;scroll-behavior:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;-ms-overflow-style:none;&::-webkit-scrollbar{display:none;}&:after{content:' ';height:100%;width:", _spacings.GEL_SPACING_SEXT, ";position:absolute;", function (_ref) {
  var dir = _ref.dir;
  return "\n        ".concat(dir === 'ltr' ? 'right' : 'left', ": 0;\n      ");
}, " bottom:0;z-index:3;overflow:hidden;pointer-events:none;background:linear-gradient(\n        ", function (_ref2) {
  var dir = _ref2.dir;
  return dir === 'ltr' ? 'to right' : 'to left';
}, ",\n        ", function (_ref3) {
  var brandBackgroundColour = _ref3.brandBackgroundColour;
  return hexToRGB(brandBackgroundColour, 0);
}, " 0%,\n        ", function (_ref4) {
  var brandBackgroundColour = _ref4.brandBackgroundColour;
  return hexToRGB(brandBackgroundColour, 1);
}, "\n          100%\n      );@media (min-width: ", _breakpoints.GEL_GROUP_2_SCREEN_WIDTH_MIN, "){width:6rem;}}}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TY3JvbGxhYmxlTmF2aWdhdGlvbi9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUJzQyIsImZpbGUiOiIuLi8uLi9zcmMvU2Nyb2xsYWJsZU5hdmlnYXRpb24vaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IG5vZGUsIG9uZU9mLCBzdHJpbmcgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEdFTF9TUEFDSU5HX1NFWFQgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQge1xuICBHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUlOLFxuICBHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUFYLFxufSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5cbi8vIEJlY2F1c2UgSUUxMSBjYW4ndCBoYW5kbGUgOC1kaWdpdCBoZXgsIG5lZWQgdG8gY29udmVydCB0byByZ2JhXG5jb25zdCBoZXhUb1JHQiA9IChoZXgsIGFscGhhID0gMSkgPT4ge1xuICBjb25zdCByID0gcGFyc2VJbnQoaGV4LnNsaWNlKDEsIDMpLCAxNik7XG4gIGNvbnN0IGcgPSBwYXJzZUludChoZXguc2xpY2UoMywgNSksIDE2KTtcbiAgY29uc3QgYiA9IHBhcnNlSW50KGhleC5zbGljZSg1LCA3KSwgMTYpO1xuICByZXR1cm4gYHJnYmEoJHtyfSwgJHtnfSwgJHtifSwgJHthbHBoYX0pYDtcbn07XG5cbmNvbnN0IFN0eWxlZFNjcm9sbGFibGVOYXYgPSBzdHlsZWQuZGl2YFxuICBAbWVkaWEgKG1heC13aWR0aDogJHtHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUFYfSkge1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3cteDogc2Nyb2xsO1xuXG4gICAgLyogQXZvaWQgdXNpbmcgc21vb3RoIHNjcm9sbGluZyBhcyBpdCBjYXVzZXMgYWNjZXNzaWJpbGl0eSBpc3N1ZXMgKi9cbiAgICBzY3JvbGwtYmVoYXZpb3I6IGF1dG87XG4gICAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xuXG4gICAgLyogSGlkZSBzY3JvbGxiYXIgKi9cbiAgICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gICAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lO1xuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgJjphZnRlciB7XG4gICAgICBjb250ZW50OiAnICc7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICB3aWR0aDogJHtHRUxfU1BBQ0lOR19TRVhUfTtcbiAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8yX1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgICAgIHdpZHRoOiA2cmVtO1xuICAgICAgfVxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgJHsoeyBkaXIgfSkgPT4gYFxuICAgICAgICAke2RpciA9PT0gJ2x0cicgPyAncmlnaHQnIDogJ2xlZnQnfTogMDtcbiAgICAgIGB9XG4gICAgICBib3R0b206IDA7XG4gICAgICB6LWluZGV4OiAzO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICAkeyh7IGRpciB9KSA9PiAoZGlyID09PSAnbHRyJyA/ICd0byByaWdodCcgOiAndG8gbGVmdCcpfSxcbiAgICAgICAgJHsoeyBicmFuZEJhY2tncm91bmRDb2xvdXIgfSkgPT4gaGV4VG9SR0IoYnJhbmRCYWNrZ3JvdW5kQ29sb3VyLCAwKX0gMCUsXG4gICAgICAgICR7KHsgYnJhbmRCYWNrZ3JvdW5kQ29sb3VyIH0pID0+IGhleFRvUkdCKGJyYW5kQmFja2dyb3VuZENvbG91ciwgMSl9XG4gICAgICAgICAgMTAwJVxuICAgICAgKTtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTY3JvbGxhYmxlTmF2aWdhdGlvbiA9ICh7XG4gIGNoaWxkcmVuLFxuICBkaXIsXG4gIGJyYW5kQmFja2dyb3VuZENvbG91cixcbiAgYnJhbmRIaWdobGlnaHRDb2xvdXIsXG4gIC4uLnByb3BzXG59KSA9PiAoXG4gIDxTdHlsZWRTY3JvbGxhYmxlTmF2XG4gICAgZGF0YS1lMmU9XCJzY3JvbGxhYmxlLW5hdlwiXG4gICAgZGlyPXtkaXJ9XG4gICAgYnJhbmRCYWNrZ3JvdW5kQ29sb3VyPXticmFuZEJhY2tncm91bmRDb2xvdXJ9XG4gICAgYnJhbmRIaWdobGlnaHRDb2xvdXI9e2JyYW5kSGlnaGxpZ2h0Q29sb3VyfVxuICAgIHsuLi5wcm9wc31cbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9TdHlsZWRTY3JvbGxhYmxlTmF2PlxuKTtcblxuU2Nyb2xsYWJsZU5hdmlnYXRpb24ucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZS5pc1JlcXVpcmVkLFxuICBkaXI6IG9uZU9mKFsnbHRyJywgJ3J0bCddKSxcbiAgYnJhbmRCYWNrZ3JvdW5kQ29sb3VyOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgYnJhbmRIaWdobGlnaHRDb2xvdXI6IHN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuU2Nyb2xsYWJsZU5hdmlnYXRpb24uZGVmYXVsdFByb3BzID0ge1xuICBkaXI6ICdsdHInLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2Nyb2xsYWJsZU5hdmlnYXRpb247XG4iXX0= */"));

var ScrollableNavigation = function ScrollableNavigation(_ref5) {
  var children = _ref5.children,
      dir = _ref5.dir,
      brandBackgroundColour = _ref5.brandBackgroundColour,
      brandHighlightColour = _ref5.brandHighlightColour,
      props = _objectWithoutProperties(_ref5, _excluded);

  return /*#__PURE__*/_react.default.createElement(StyledScrollableNav, _extends({
    "data-e2e": "scrollable-nav",
    dir: dir,
    brandBackgroundColour: brandBackgroundColour,
    brandHighlightColour: brandHighlightColour
  }, props), children);
};

exports.ScrollableNavigation = ScrollableNavigation;
ScrollableNavigation.propTypes = {
  children: _propTypes.node.isRequired,
  dir: (0, _propTypes.oneOf)(['ltr', 'rtl']),
  brandBackgroundColour: _propTypes.string.isRequired,
  brandHighlightColour: _propTypes.string.isRequired
};
ScrollableNavigation.defaultProps = {
  dir: 'ltr'
};
var _default = ScrollableNavigation;
exports.default = _default;