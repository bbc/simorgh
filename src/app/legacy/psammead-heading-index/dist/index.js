"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _propTypes = require("prop-types");

var _propTypes2 = require("@bbc/gel-foundations/prop-types");

var _colours = require("@bbc/psammead-styles/colours");

var _typography = require("@bbc/gel-foundations/typography");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeadingIndex = (0, _base.default)("h1", process.env.NODE_ENV === "production" ? {
  target: "e1rv5fpv0"
} : {
  target: "e1rv5fpv0",
  label: "HeadingIndex"
})(function (_ref) {
  var script = _ref.script;
  return script && (0, _typography.getDoublePica)(script);
}, ";", function (_ref2) {
  var service = _ref2.service;
  return (0, _fontStyles.getSansRegular)(service);
}, ";color:", _colours.C_METAL, ";margin:0;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTzhCIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBzaGFwZSwgc3RyaW5nIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ19NRVRBTCB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgZ2V0RG91YmxlUGljYSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3R5cG9ncmFwaHknO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5cbmNvbnN0IEhlYWRpbmdJbmRleCA9IHN0eWxlZC5oMWBcbiAgJHsoeyBzY3JpcHQgfSkgPT4gc2NyaXB0ICYmIGdldERvdWJsZVBpY2Eoc2NyaXB0KX07XG4gICR7KHsgc2VydmljZSB9KSA9PiBnZXRTYW5zUmVndWxhcihzZXJ2aWNlKX07XG4gIGNvbG9yOiAke0NfTUVUQUx9O1xuICBtYXJnaW46IDA7XG5gO1xuXG5IZWFkaW5nSW5kZXgucHJvcFR5cGVzID0ge1xuICBzY3JpcHQ6IHNoYXBlKHNjcmlwdFByb3BUeXBlKS5pc1JlcXVpcmVkLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbkhlYWRpbmdJbmRleC5kZWZhdWx0UHJvcHMgPSB7XG4gIHRhYkluZGV4OiAnLTEnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgSGVhZGluZ0luZGV4O1xuIl19 */"));
HeadingIndex.propTypes = {
  script: (0, _propTypes.shape)(_propTypes2.scriptPropType).isRequired,
  service: _propTypes.string.isRequired
};
HeadingIndex.defaultProps = {
  tabIndex: '-1'
};
var _default = HeadingIndex;
exports.default = _default;