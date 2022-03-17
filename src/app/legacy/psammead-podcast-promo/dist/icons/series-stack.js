"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _react = _interopRequireDefault(require("react"));

var _svgs = require("@bbc/psammead-assets/svgs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

var StyledSeriesStackIcon = (0, _styledBase.default)("i", {
  target: "e1sw88m10",
  label: "StyledSeriesStackIcon"
})(process.env.NODE_ENV === "production" ? {
  name: "ne7b23",
  styles: "> svg{width:16px;height:16px;fill:currentColor;position:relative;bottom:2px;right:3px;}"
} : {
  name: "ne7b23",
  styles: "> svg{width:16px;height:16px;fill:currentColor;position:relative;bottom:2px;right:3px;}",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pY29ucy9zZXJpZXMtc3RhY2suanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlzQyIsImZpbGUiOiIuLi8uLi9zcmMvaWNvbnMvc2VyaWVzLXN0YWNrLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBtZWRpYUljb25zIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1hc3NldHMvc3Zncyc7XG5cbmNvbnN0IFN0eWxlZFNlcmllc1N0YWNrSWNvbiA9IHN0eWxlZC5pYFxuICA+IHN2ZyB7XG4gICAgd2lkdGg6IDE2cHg7XG4gICAgaGVpZ2h0OiAxNnB4O1xuICAgIGZpbGw6IGN1cnJlbnRDb2xvcjtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYm90dG9tOiAycHg7XG4gICAgcmlnaHQ6IDNweDtcbiAgfVxuYDtcblxuY29uc3QgU2VyaWVzU3RhY2sgPSAoKSA9PiAoXG4gIDxTdHlsZWRTZXJpZXNTdGFja0ljb24+e21lZGlhSWNvbnMuc2VyaWVzc3RhY2t9PC9TdHlsZWRTZXJpZXNTdGFja0ljb24+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBTZXJpZXNTdGFjaztcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

var SeriesStack = function SeriesStack() {
  return /*#__PURE__*/_react.default.createElement(StyledSeriesStackIcon, null, _svgs.mediaIcons.seriesstack);
};

var _default = SeriesStack;
exports.default = _default;