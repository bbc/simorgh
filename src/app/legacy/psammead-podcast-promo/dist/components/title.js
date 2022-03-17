"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _svgs = require("@bbc/psammead-assets/svgs");

var _spacings = require("@bbc/gel-foundations/spacings");

var _typography = require("@bbc/gel-foundations/typography");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

var _colours = require("@bbc/psammead-styles/colours");

var _excluded = ["children"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Heading = (0, _base.default)("h2", process.env.NODE_ENV === "production" ? {
  target: "e10r5b0d1"
} : {
  target: "e10r5b0d1",
  label: "Heading"
})(function (_ref) {
  var script = _ref.script;
  return (0, _typography.getGreatPrimer)(script);
}, ";", function (_ref2) {
  var service = _ref2.service;
  return (0, _fontStyles.getSansRegular)(service);
}, ";display:inline;color:", _colours.C_EBON, ";>svg{margin-left:0;width:1.375rem;height:1.375rem;fill:currentColor;position:relative;bottom:0.3125rem;right:0.1875rem;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3RpdGxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTeUIiLCJmaWxlIjoiLi4vLi4vc3JjL2NvbXBvbmVudHMvdGl0bGUuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IG5vZGUgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IG1lZGlhSWNvbnMgfSBmcm9tICdAYmJjL3BzYW1tZWFkLWFzc2V0cy9zdmdzJztcbmltcG9ydCB7IEdFTF9TUEFDSU5HX0RCTCB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcbmltcG9ydCB7IGdldEdyZWF0UHJpbWVyIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBnZXRTYW5zUmVndWxhciB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2ZvbnQtc3R5bGVzJztcbmltcG9ydCB7IENfRUJPTiB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuXG5jb25zdCBIZWFkaW5nID0gc3R5bGVkLmgyYFxuICAkeyh7IHNjcmlwdCB9KSA9PiBnZXRHcmVhdFByaW1lcihzY3JpcHQpfTtcbiAgJHsoeyBzZXJ2aWNlIH0pID0+IGdldFNhbnNSZWd1bGFyKHNlcnZpY2UpfTtcbiAgZGlzcGxheTogaW5saW5lO1xuICBjb2xvcjogJHtDX0VCT059O1xuXG4gID4gc3ZnIHtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgICB3aWR0aDogMS4zNzVyZW07XG4gICAgaGVpZ2h0OiAxLjM3NXJlbTtcbiAgICBmaWxsOiBjdXJyZW50Q29sb3I7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJvdHRvbTogMC4zMTI1cmVtO1xuICAgIHJpZ2h0OiAwLjE4NzVyZW07XG4gIH1cbmA7XG5cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW46IDAgMCAke0dFTF9TUEFDSU5HX0RCTH07XG5gO1xuXG5jb25zdCBUaXRsZSA9ICh7IGNoaWxkcmVuLCAuLi5wcm9wcyB9KSA9PiAoXG4gIDxXcmFwcGVyPlxuICAgIDxIZWFkaW5nIHsuLi5wcm9wc30+XG4gICAgICB7bWVkaWFJY29ucy5wb2RjYXN0fVxuICAgICAge2NoaWxkcmVufVxuICAgIDwvSGVhZGluZz5cbiAgPC9XcmFwcGVyPlxuKTtcblxuVGl0bGUucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGl0bGU7XG4iXX0= */"));
var Wrapper = (0, _base.default)("div", process.env.NODE_ENV === "production" ? {
  target: "e10r5b0d0"
} : {
  target: "e10r5b0d0",
  label: "Wrapper"
})("margin:0 0 ", _spacings.GEL_SPACING_DBL, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3RpdGxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQjBCIiwiZmlsZSI6Ii4uLy4uL3NyYy9jb21wb25lbnRzL3RpdGxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBub2RlIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBtZWRpYUljb25zIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1hc3NldHMvc3Zncyc7XG5pbXBvcnQgeyBHRUxfU1BBQ0lOR19EQkwgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgeyBnZXRHcmVhdFByaW1lciB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3R5cG9ncmFwaHknO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5pbXBvcnQgeyBDX0VCT04gfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcblxuY29uc3QgSGVhZGluZyA9IHN0eWxlZC5oMmBcbiAgJHsoeyBzY3JpcHQgfSkgPT4gZ2V0R3JlYXRQcmltZXIoc2NyaXB0KX07XG4gICR7KHsgc2VydmljZSB9KSA9PiBnZXRTYW5zUmVndWxhcihzZXJ2aWNlKX07XG4gIGRpc3BsYXk6IGlubGluZTtcbiAgY29sb3I6ICR7Q19FQk9OfTtcblxuICA+IHN2ZyB7XG4gICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgd2lkdGg6IDEuMzc1cmVtO1xuICAgIGhlaWdodDogMS4zNzVyZW07XG4gICAgZmlsbDogY3VycmVudENvbG9yO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBib3R0b206IDAuMzEyNXJlbTtcbiAgICByaWdodDogMC4xODc1cmVtO1xuICB9XG5gO1xuXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luOiAwIDAgJHtHRUxfU1BBQ0lOR19EQkx9O1xuYDtcblxuY29uc3QgVGl0bGUgPSAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSkgPT4gKFxuICA8V3JhcHBlcj5cbiAgICA8SGVhZGluZyB7Li4ucHJvcHN9PlxuICAgICAge21lZGlhSWNvbnMucG9kY2FzdH1cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0hlYWRpbmc+XG4gIDwvV3JhcHBlcj5cbik7XG5cblRpdGxlLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IG5vZGUuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRpdGxlO1xuIl19 */"));

var Title = function Title(_ref3) {
  var children = _ref3.children,
      props = _objectWithoutProperties(_ref3, _excluded);

  return /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement(Heading, props, _svgs.mediaIcons.podcast, children));
};

Title.propTypes = {
  children: _propTypes.node.isRequired
};
var _default = Title;
exports.default = _default;