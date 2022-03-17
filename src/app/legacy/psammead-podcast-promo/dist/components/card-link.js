"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _colours = require("@bbc/psammead-styles/colours");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardLink = (0, _base.default)("a", process.env.NODE_ENV === "production" ? {
  target: "e16kstjc0"
} : {
  target: "e16kstjc0",
  label: "CardLink"
})("color:", _colours.C_EBON, ";text-decoration:none;:before{position:absolute;top:0;bottom:0;left:0;right:0;content:'';overflow:hidden;z-index:1;}&:visited{.podcast-promo--visited{color:", _colours.C_METAL, ";}}&:focus{.podcast-promo--focus{text-decoration:underline;}}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhcmQtbGluay5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR3lCIiwiZmlsZSI6Ii4uLy4uL3NyYy9jb21wb25lbnRzL2NhcmQtbGluay5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDX01FVEFMLCBDX0VCT04gfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcblxuY29uc3QgQ2FyZExpbmsgPSBzdHlsZWQuYWBcbiAgY29sb3I6ICR7Q19FQk9OfTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICA6YmVmb3JlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgei1pbmRleDogMTtcbiAgfVxuICAmOnZpc2l0ZWQge1xuICAgIC5wb2RjYXN0LXByb21vLS12aXNpdGVkIHtcbiAgICAgIGNvbG9yOiAke0NfTUVUQUx9O1xuICAgIH1cbiAgfVxuICAmOmZvY3VzIHtcbiAgICAucG9kY2FzdC1wcm9tby0tZm9jdXMge1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJkTGluaztcbiJdfQ== */"));
var _default = CardLink;
exports.default = _default;