"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.visuallyHiddenTextStyle = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var visuallyHiddenTextStyle = "\n  clip-path: inset(100%);\n  clip: rect(1px, 1px, 1px, 1px);\n  height: 1px;\n  overflow: hidden;\n  position: absolute;\n  width: 1px;\n  margin: 0;\n";
exports.visuallyHiddenTextStyle = visuallyHiddenTextStyle;
var VisuallyHiddenText = (0, _base.default)("span", process.env.NODE_ENV === "production" ? {
  target: "e1yt7oin0"
} : {
  target: "e1yt7oin0",
  label: "VisuallyHiddenText"
})(visuallyHiddenTextStyle, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBWXNDIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5cbmV4cG9ydCBjb25zdCB2aXN1YWxseUhpZGRlblRleHRTdHlsZSA9IGBcbiAgY2xpcC1wYXRoOiBpbnNldCgxMDAlKTtcbiAgY2xpcDogcmVjdCgxcHgsIDFweCwgMXB4LCAxcHgpO1xuICBoZWlnaHQ6IDFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMXB4O1xuICBtYXJnaW46IDA7XG5gO1xuXG5jb25zdCBWaXN1YWxseUhpZGRlblRleHQgPSBzdHlsZWQuc3BhbmBcbiAgJHt2aXN1YWxseUhpZGRlblRleHRTdHlsZX07XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBWaXN1YWxseUhpZGRlblRleHQ7XG4iXX0= */"));
var _default = VisuallyHiddenText;
exports.default = _default;