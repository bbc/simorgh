"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _colours = require("@bbc/psammead-styles/colours");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

var _typography = require("@bbc/gel-foundations/typography");

var _spacings = require("@bbc/gel-foundations/spacings");

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C_BLACK = '#000000';
var Figure = (0, _base.default)("figure", process.env.NODE_ENV === "production" ? {
  target: "e1wn2dcg1"
} : {
  target: "e1wn2dcg1",
  label: "Figure"
})("background-color:", C_BLACK, ";margin:0;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DYXB0aW9uV3JhcHBlci9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVzRCIiwiZmlsZSI6Ii4uLy4uL3NyYy9DYXB0aW9uV3JhcHBlci9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbm9kZSwgc3RyaW5nIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDX1dISVRFIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvY29sb3Vycyc7XG5pbXBvcnQgeyBnZXRTYW5zUmVndWxhciB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2ZvbnQtc3R5bGVzJztcbmltcG9ydCB7IEdFTF9CUkVWSUVSIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBHRUxfU1BBQ0lORyB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcbmltcG9ydCB7IHZpc3VhbGx5SGlkZGVuU3R5bGUgfSBmcm9tICcuLi91dGlsaXRpZXMnO1xuXG5jb25zdCBDX0JMQUNLID0gJyMwMDAwMDAnO1xuXG5jb25zdCBGaWd1cmUgPSBzdHlsZWQuZmlndXJlYFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke0NfQkxBQ0t9O1xuICBtYXJnaW46IDA7XG5gO1xuXG5jb25zdCBGaWdDYXB0aW9uID0gc3R5bGVkLmZpZ2NhcHRpb25gXG4gICR7KHsgc2VydmljZSB9KSA9PiBnZXRTYW5zUmVndWxhcihzZXJ2aWNlKX1cbiAgJHtHRUxfQlJFVklFUn1cbiAgY29sb3I6ICR7Q19XSElURX07XG4gIHBhZGRpbmc6ICR7R0VMX1NQQUNJTkd9O1xuXG4gID4gc3BhbiB7XG4gICAgJHt2aXN1YWxseUhpZGRlblN0eWxlfVxuICB9XG5gO1xuXG5jb25zdCBDYXB0aW9uV3JhcHBlciA9ICh7XG4gIGNoaWxkcmVuLFxuICBzZXJ2aWNlLFxuICB0ZXh0UHJlZml4VmlzdWFsbHlIaWRkZW4sXG4gIHRleHQsXG59KSA9PiAoXG4gIDxGaWd1cmU+XG4gICAge2NoaWxkcmVufVxuICAgIDxGaWdDYXB0aW9uIHNlcnZpY2U9e3NlcnZpY2V9PlxuICAgICAge3RleHRQcmVmaXhWaXN1YWxseUhpZGRlbiAmJiA8c3Bhbj57dGV4dFByZWZpeFZpc3VhbGx5SGlkZGVufTwvc3Bhbj59XG4gICAgICB7dGV4dH1cbiAgICA8L0ZpZ0NhcHRpb24+XG4gIDwvRmlndXJlPlxuKTtcblxuQ2FwdGlvbldyYXBwZXIuZGVmYXVsdFByb3BzID0ge1xuICB0ZXh0UHJlZml4VmlzdWFsbHlIaWRkZW46IG51bGwsXG59O1xuXG5DYXB0aW9uV3JhcHBlci5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBub2RlLmlzUmVxdWlyZWQsXG4gIHNlcnZpY2U6IHN0cmluZy5pc1JlcXVpcmVkLFxuICB0ZXh0UHJlZml4VmlzdWFsbHlIaWRkZW46IHN0cmluZyxcbiAgdGV4dDogc3RyaW5nLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYXB0aW9uV3JhcHBlcjtcbiJdfQ== */"));
var FigCaption = (0, _base.default)("figcaption", process.env.NODE_ENV === "production" ? {
  target: "e1wn2dcg0"
} : {
  target: "e1wn2dcg0",
  label: "FigCaption"
})(function (_ref) {
  var service = _ref.service;
  return (0, _fontStyles.getSansRegular)(service);
}, " ", _typography.GEL_BREVIER, " color:", _colours.C_WHITE, ";padding:", _spacings.GEL_SPACING, ";>span{", _utilities.visuallyHiddenStyle, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DYXB0aW9uV3JhcHBlci9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0JvQyIsImZpbGUiOiIuLi8uLi9zcmMvQ2FwdGlvbldyYXBwZXIvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG5vZGUsIHN0cmluZyB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgQ19XSElURSB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5pbXBvcnQgeyBHRUxfQlJFVklFUiB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3R5cG9ncmFwaHknO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkcgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgeyB2aXN1YWxseUhpZGRlblN0eWxlIH0gZnJvbSAnLi4vdXRpbGl0aWVzJztcblxuY29uc3QgQ19CTEFDSyA9ICcjMDAwMDAwJztcblxuY29uc3QgRmlndXJlID0gc3R5bGVkLmZpZ3VyZWBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtDX0JMQUNLfTtcbiAgbWFyZ2luOiAwO1xuYDtcblxuY29uc3QgRmlnQ2FwdGlvbiA9IHN0eWxlZC5maWdjYXB0aW9uYFxuICAkeyh7IHNlcnZpY2UgfSkgPT4gZ2V0U2Fuc1JlZ3VsYXIoc2VydmljZSl9XG4gICR7R0VMX0JSRVZJRVJ9XG4gIGNvbG9yOiAke0NfV0hJVEV9O1xuICBwYWRkaW5nOiAke0dFTF9TUEFDSU5HfTtcblxuICA+IHNwYW4ge1xuICAgICR7dmlzdWFsbHlIaWRkZW5TdHlsZX1cbiAgfVxuYDtcblxuY29uc3QgQ2FwdGlvbldyYXBwZXIgPSAoe1xuICBjaGlsZHJlbixcbiAgc2VydmljZSxcbiAgdGV4dFByZWZpeFZpc3VhbGx5SGlkZGVuLFxuICB0ZXh0LFxufSkgPT4gKFxuICA8RmlndXJlPlxuICAgIHtjaGlsZHJlbn1cbiAgICA8RmlnQ2FwdGlvbiBzZXJ2aWNlPXtzZXJ2aWNlfT5cbiAgICAgIHt0ZXh0UHJlZml4VmlzdWFsbHlIaWRkZW4gJiYgPHNwYW4+e3RleHRQcmVmaXhWaXN1YWxseUhpZGRlbn08L3NwYW4+fVxuICAgICAge3RleHR9XG4gICAgPC9GaWdDYXB0aW9uPlxuICA8L0ZpZ3VyZT5cbik7XG5cbkNhcHRpb25XcmFwcGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgdGV4dFByZWZpeFZpc3VhbGx5SGlkZGVuOiBudWxsLFxufTtcblxuQ2FwdGlvbldyYXBwZXIucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZS5pc1JlcXVpcmVkLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgdGV4dFByZWZpeFZpc3VhbGx5SGlkZGVuOiBzdHJpbmcsXG4gIHRleHQ6IHN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FwdGlvbldyYXBwZXI7XG4iXX0= */"));

var CaptionWrapper = function CaptionWrapper(_ref2) {
  var children = _ref2.children,
      service = _ref2.service,
      textPrefixVisuallyHidden = _ref2.textPrefixVisuallyHidden,
      text = _ref2.text;
  return /*#__PURE__*/_react.default.createElement(Figure, null, children, /*#__PURE__*/_react.default.createElement(FigCaption, {
    service: service
  }, textPrefixVisuallyHidden && /*#__PURE__*/_react.default.createElement("span", null, textPrefixVisuallyHidden), text));
};

CaptionWrapper.defaultProps = {
  textPrefixVisuallyHidden: null
};
CaptionWrapper.propTypes = {
  children: _propTypes.node.isRequired,
  service: _propTypes.string.isRequired,
  textPrefixVisuallyHidden: _propTypes.string,
  text: _propTypes.string.isRequired
};
var _default = CaptionWrapper;
exports.default = _default;