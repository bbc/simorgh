"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _breakpoints = require("@bbc/gel-foundations/breakpoints");

var _spacings = require("@bbc/gel-foundations/spacings");

var _detection = require("@bbc/psammead-styles/detection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var twoOfSixColumnsMaxWidthScaleable = "33.33%"; // (2 / 6) * 100 = 0.3333333333 = 33.33%

var fullWidthColumnsMaxScaleable = "100%"; // (12 / 12) * 100 = 100 = 100%

var halfWidthColumnsMaxScaleable = "50%";
var imageGridFallbackRadio = "\n  @media (min-width: ".concat(_breakpoints.GEL_GROUP_3_SCREEN_WIDTH_MIN, ") and (max-width: ").concat(_breakpoints.GEL_GROUP_3_SCREEN_WIDTH_MAX, ") {\n    width: ").concat(twoOfSixColumnsMaxWidthScaleable, ";\n  }\n");
var imageGridFallbackTv = "\n  @media (min-width: ".concat(_breakpoints.GEL_GROUP_3_SCREEN_WIDTH_MIN, ") {\n    width: ").concat(halfWidthColumnsMaxScaleable, ";\n  }\n");
var imageGridRadio = "\n  @media (min-width: ".concat(_breakpoints.GEL_GROUP_3_SCREEN_WIDTH_MIN, ") and (max-width: ").concat(_breakpoints.GEL_GROUP_3_SCREEN_WIDTH_MAX, ") {\n    grid-column: 1 / span 2;\n  }\n");
var imageGridTv = "\n  @media (min-width: ".concat(_breakpoints.GEL_GROUP_3_SCREEN_WIDTH_MIN, ") {\n    grid-column: 1 / span 3;\n  }\n");
var imageGridFallbackStyles = {
  radio: imageGridFallbackRadio,
  tv: imageGridFallbackTv
};
var imageGridStyles = {
  radio: imageGridRadio,
  tv: imageGridTv
};
var ImageGridItem = (0, _base.default)("div", process.env.NODE_ENV === "production" ? {
  target: "efdpnwp0"
} : {
  target: "efdpnwp0",
  label: "ImageGridItem"
})("vertical-align:top;display:inline-block;width:", fullWidthColumnsMaxScaleable, ";padding:", _spacings.GEL_SPACING, " ", _spacings.GEL_SPACING, " 0 ", _spacings.GEL_SPACING, ";", function (_ref) {
  var bulletinType = _ref.bulletinType;
  return imageGridFallbackStyles[bulletinType];
}, "@media (min-width: ", _breakpoints.GEL_GROUP_3_SCREEN_WIDTH_MIN, "){padding:0;}@supports (", _detection.grid, "){width:initial;grid-column:1/span 6;", function (_ref2) {
  var bulletinType = _ref2.bulletinType;
  return imageGridStyles[bulletinType];
}, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9JbWFnZVN0eWxlcy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0RnQyIsImZpbGUiOiIuLi9zcmMvSW1hZ2VTdHlsZXMuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHtcbiAgR0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01JTixcbiAgR0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01BWCxcbn0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvYnJlYWtwb2ludHMnO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkcgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgeyBncmlkIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvZGV0ZWN0aW9uJztcblxuY29uc3QgdHdvT2ZTaXhDb2x1bW5zTWF4V2lkdGhTY2FsZWFibGUgPSBgMzMuMzMlYDtcbi8vICgyIC8gNikgKiAxMDAgPSAwLjMzMzMzMzMzMzMgPSAzMy4zMyVcblxuY29uc3QgZnVsbFdpZHRoQ29sdW1uc01heFNjYWxlYWJsZSA9IGAxMDAlYDtcbi8vICgxMiAvIDEyKSAqIDEwMCA9IDEwMCA9IDEwMCVcblxuY29uc3QgaGFsZldpZHRoQ29sdW1uc01heFNjYWxlYWJsZSA9IGA1MCVgO1xuXG5jb25zdCBpbWFnZUdyaWRGYWxsYmFja1JhZGlvID0gYFxuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUlOfSkgYW5kIChtYXgtd2lkdGg6ICR7R0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01BWH0pIHtcbiAgICB3aWR0aDogJHt0d29PZlNpeENvbHVtbnNNYXhXaWR0aFNjYWxlYWJsZX07XG4gIH1cbmA7XG5cbmNvbnN0IGltYWdlR3JpZEZhbGxiYWNrVHYgPSBgXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgd2lkdGg6ICR7aGFsZldpZHRoQ29sdW1uc01heFNjYWxlYWJsZX07XG4gIH1cbmA7XG5cbmNvbnN0IGltYWdlR3JpZFJhZGlvID0gYFxuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUlOfSkgYW5kIChtYXgtd2lkdGg6ICR7R0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01BWH0pIHtcbiAgICBncmlkLWNvbHVtbjogMSAvIHNwYW4gMjtcbiAgfVxuYDtcblxuY29uc3QgaW1hZ2VHcmlkVHYgPSBgXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgZ3JpZC1jb2x1bW46IDEgLyBzcGFuIDM7XG4gIH1cbmA7XG5cbmNvbnN0IGltYWdlR3JpZEZhbGxiYWNrU3R5bGVzID0ge1xuICByYWRpbzogaW1hZ2VHcmlkRmFsbGJhY2tSYWRpbyxcbiAgdHY6IGltYWdlR3JpZEZhbGxiYWNrVHYsXG59O1xuXG5jb25zdCBpbWFnZUdyaWRTdHlsZXMgPSB7XG4gIHJhZGlvOiBpbWFnZUdyaWRSYWRpbyxcbiAgdHY6IGltYWdlR3JpZFR2LFxufTtcblxuY29uc3QgSW1hZ2VHcmlkSXRlbSA9IHN0eWxlZC5kaXZgXG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6ICR7ZnVsbFdpZHRoQ29sdW1uc01heFNjYWxlYWJsZX07XG4gIHBhZGRpbmc6ICR7R0VMX1NQQUNJTkd9ICR7R0VMX1NQQUNJTkd9IDAgJHtHRUxfU1BBQ0lOR307XG4gICR7KHsgYnVsbGV0aW5UeXBlIH0pID0+IGltYWdlR3JpZEZhbGxiYWNrU3R5bGVzW2J1bGxldGluVHlwZV19XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6ICR7R0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgQHN1cHBvcnRzICgke2dyaWR9KSB7XG4gICAgd2lkdGg6IGluaXRpYWw7XG4gICAgZ3JpZC1jb2x1bW46IDEgLyBzcGFuIDY7XG4gICAgJHsoeyBidWxsZXRpblR5cGUgfSkgPT4gaW1hZ2VHcmlkU3R5bGVzW2J1bGxldGluVHlwZV19XG4gIH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlR3JpZEl0ZW07XG4iXX0= */"));
var _default = ImageGridItem;
exports.default = _default;