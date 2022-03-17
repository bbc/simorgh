"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _typography = require("@bbc/gel-foundations/typography");

var _spacings = require("@bbc/gel-foundations/spacings");

var _colours = require("@bbc/psammead-styles/colours");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var borderStyling = "\n  padding-left: ".concat(_spacings.GEL_SPACING, ";\n  margin-left: ").concat(_spacings.GEL_SPACING, ";\n  border-left: 0.0625rem solid ").concat(_colours.C_CLOUD_LIGHT, ";\n");
var Metadata = (0, _base.default)("span", {
  target: "eevk8w0",
  label: "Metadata"
})(function (_ref) {
  var script = _ref.script;
  return (0, _typography.getBrevier)(script);
}, " ", function (_ref2) {
  var service = _ref2.service;
  return (0, _fontStyles.getSansRegular)(service);
}, " color:", function (_ref3) {
  var darkMode = _ref3.darkMode;
  return darkMode ? _colours.C_PEBBLE : _colours.C_METAL;
}, ";", function (_ref4) {
  var hasBorder = _ref4.hasBorder;
  return hasBorder && borderStyling;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXRhZGF0YS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYzRCIiwiZmlsZSI6Ii4uL3NyYy9NZXRhZGF0YS5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBnZXRCcmV2aWVyIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBHRUxfU1BBQ0lORyB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcbmltcG9ydCB7IENfTUVUQUwsIENfUEVCQkxFLCBDX0NMT1VEX0xJR0hUIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvY29sb3Vycyc7XG5pbXBvcnQgeyBnZXRTYW5zUmVndWxhciB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2ZvbnQtc3R5bGVzJztcblxuaW1wb3J0IHsgd2l0aEVwaXNvZGVDb250ZXh0IH0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgYm9yZGVyU3R5bGluZyA9IGBcbiAgcGFkZGluZy1sZWZ0OiAke0dFTF9TUEFDSU5HfTtcbiAgbWFyZ2luLWxlZnQ6ICR7R0VMX1NQQUNJTkd9O1xuICBib3JkZXItbGVmdDogMC4wNjI1cmVtIHNvbGlkICR7Q19DTE9VRF9MSUdIVH07XG5gO1xuXG5jb25zdCBNZXRhZGF0YSA9IHN0eWxlZC5zcGFuYFxuICAkeyh7IHNjcmlwdCB9KSA9PiBnZXRCcmV2aWVyKHNjcmlwdCl9XG4gICR7KHsgc2VydmljZSB9KSA9PiBnZXRTYW5zUmVndWxhcihzZXJ2aWNlKX1cbiAgY29sb3I6ICR7KHsgZGFya01vZGUgfSkgPT4gKGRhcmtNb2RlID8gQ19QRUJCTEUgOiBDX01FVEFMKX07XG4gICR7KHsgaGFzQm9yZGVyIH0pID0+IGhhc0JvcmRlciAmJiBib3JkZXJTdHlsaW5nfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aEVwaXNvZGVDb250ZXh0KE1ldGFkYXRhKTtcbiJdfQ== */"));

var _default = (0, _helpers.withEpisodeContext)(Metadata);

exports.default = _default;