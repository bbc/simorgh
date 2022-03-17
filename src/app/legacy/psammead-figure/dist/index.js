"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _spacings = require("@bbc/gel-foundations/spacings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Figure = (0, _base.default)("figure", process.env.NODE_ENV === "production" ? {
  target: "e6bmn90"
} : {
  target: "e6bmn90",
  label: "Figure"
})("margin:0;padding-bottom:", _spacings.GEL_SPACING_TRPL, ";width:100%;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRzRCIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBHRUxfU1BBQ0lOR19UUlBMIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvc3BhY2luZ3MnO1xuXG5jb25zdCBGaWd1cmUgPSBzdHlsZWQuZmlndXJlYFxuICBtYXJnaW46IDA7XG4gIHBhZGRpbmctYm90dG9tOiAke0dFTF9TUEFDSU5HX1RSUEx9O1xuICB3aWR0aDogMTAwJTtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IEZpZ3VyZTtcbiJdfQ== */"));
var _default = Figure;
exports.default = _default;