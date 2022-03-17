"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _colours = require("@bbc/psammead-styles/colours");

var _typography = require("@bbc/gel-foundations/typography");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Title = (0, _base.default)("span", process.env.NODE_ENV === "production" ? {
  target: "e1bh4kp50"
} : {
  target: "e1bh4kp50",
  label: "Title"
})(function (_ref) {
  var script = _ref.script;
  return (0, _typography.getPica)(script);
}, " ", function (_ref2) {
  var service = _ref2.service;
  return (0, _fontStyles.getSansRegular)(service);
}, " color:", function (_ref3) {
  var darkMode = _ref3.darkMode;
  return darkMode ? _colours.C_WHITE : _colours.C_EBON;
}, ";display:inline-block;width:100%;font-weight:700;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UaXRsZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT3lCIiwiZmlsZSI6Ii4uL3NyYy9UaXRsZS5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDX1dISVRFLCBDX0VCT04gfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcbmltcG9ydCB7IGdldFBpY2EgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy90eXBvZ3JhcGh5JztcbmltcG9ydCB7IGdldFNhbnNSZWd1bGFyIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvZm9udC1zdHlsZXMnO1xuXG5pbXBvcnQgeyB3aXRoRXBpc29kZUNvbnRleHQgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5jb25zdCBUaXRsZSA9IHN0eWxlZC5zcGFuYFxuICAkeyh7IHNjcmlwdCB9KSA9PiBnZXRQaWNhKHNjcmlwdCl9XG4gICR7KHsgc2VydmljZSB9KSA9PiBnZXRTYW5zUmVndWxhcihzZXJ2aWNlKX1cbiAgY29sb3I6ICR7KHsgZGFya01vZGUgfSkgPT4gKGRhcmtNb2RlID8gQ19XSElURSA6IENfRUJPTil9O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBmb250LXdlaWdodDogNzAwO1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aEVwaXNvZGVDb250ZXh0KFRpdGxlKTtcbiJdfQ== */"));

var _default = (0, _helpers.withEpisodeContext)(Title);

exports.default = _default;