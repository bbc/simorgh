"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _colours = require("@bbc/psammead-styles/colours");

var _MediaIndicator = _interopRequireDefault(require("./MediaIndicator"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var MediaIndicatorWrapper = (0, _base.default)("div", process.env.NODE_ENV === "production" ? {
  target: "extg57c1"
} : {
  target: "extg57c1",
  label: "MediaIndicatorWrapper"
})("position:absolute;", function (_ref) {
  var dir = _ref.dir;
  return "".concat(dir === 'ltr' ? 'left' : 'right', ": 0.5rem;");
}, " top:0;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaW5rLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRd0MiLCJmaWxlIjoiLi4vc3JjL0xpbmsuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvYXJpYS1yb2xlICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbm9kZSwgc3RyaW5nLCBib29sIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDX01FVEFMLCBDX1BPU1RCT1gsIENfU1RPTkUgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcbmltcG9ydCBNZWRpYUluZGljYXRvciBmcm9tICcuL01lZGlhSW5kaWNhdG9yJztcbmltcG9ydCB7IHdpdGhFcGlzb2RlQ29udGV4dCB9IGZyb20gJy4vaGVscGVycyc7XG5cbmNvbnN0IE1lZGlhSW5kaWNhdG9yV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgJHsoeyBkaXIgfSkgPT4gYCR7ZGlyID09PSAnbHRyJyA/ICdsZWZ0JyA6ICdyaWdodCd9OiAwLjVyZW07YH1cbiAgdG9wOiAwO1xuYDtcblxuY29uc3QgU3R5bGVkQW5jaG9yID0gc3R5bGVkLmFgXG4gIDpiZWZvcmUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgY29udGVudDogJyc7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB6LWluZGV4OiAxO1xuICB9XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIC5yb3VuZGVkLXBsYXktYnV0dG9uX19yaW5nLFxuICAucm91bmRlZC1wbGF5LWJ1dHRvbl9fdHJpYW5nbGUge1xuICAgIGNvbG9yOiAjMDAwO1xuICB9XG5cbiAgJjpmb2N1cyxcbiAgJjpob3ZlciB7XG4gICAgW2NsYXNzKj0nLS1ob3ZlciddIHtcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgIH1cbiAgICAucm91bmRlZC1wbGF5LWJ1dHRvbl9fcmluZyxcbiAgICAucm91bmRlZC1wbGF5LWJ1dHRvbl9faW5uZXIge1xuICAgICAgZmlsbDogY3VycmVudENvbG9yO1xuICAgICAgY29sb3I6ICR7Q19QT1NUQk9YfTtcbiAgICB9XG4gICAgLnJvdW5kZWQtcGxheS1idXR0b25fX3RyaWFuZ2xlIHtcbiAgICAgIGZpbGw6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgfVxuICAmOnZpc2l0ZWQge1xuICAgIFtjbGFzcyo9Jy0tdmlzaXRlZCddIHtcbiAgICAgIGNvbG9yOiAkeyh7IGRhcmtNb2RlIH0pID0+IChkYXJrTW9kZSA/IENfU1RPTkUgOiBDX01FVEFMKX07XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBMaW5rID0gKHsgY2hpbGRyZW4sIHNob3dNZWRpYUluZGljYXRvciwgZGlyLCAuLi5wcm9wcyB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEFuY2hvciBzaG93TWVkaWFJbmRpY2F0b3I9e3Nob3dNZWRpYUluZGljYXRvcn0gey4uLnByb3BzfT5cbiAgICAgIHtzaG93TWVkaWFJbmRpY2F0b3IgJiYgKFxuICAgICAgICA8TWVkaWFJbmRpY2F0b3JXcmFwcGVyIGRpcj17ZGlyfT5cbiAgICAgICAgICA8TWVkaWFJbmRpY2F0b3Igc2l6ZT1cIjIuNXJlbVwiIC8+XG4gICAgICAgIDwvTWVkaWFJbmRpY2F0b3JXcmFwcGVyPlxuICAgICAgKX1cbiAgICAgIDxzcGFuIHJvbGU9XCJ0ZXh0XCI+e2NoaWxkcmVufTwvc3Bhbj5cbiAgICA8L1N0eWxlZEFuY2hvcj5cbiAgKTtcbn07XG5cbkxpbmsucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZS5pc1JlcXVpcmVkLFxuICBkaXI6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBzaG93TWVkaWFJbmRpY2F0b3I6IGJvb2wsXG59O1xuXG5MaW5rLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2hvd01lZGlhSW5kaWNhdG9yOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhFcGlzb2RlQ29udGV4dChMaW5rKTtcbiJdfQ== */"));
var StyledAnchor = (0, _base.default)("a", process.env.NODE_ENV === "production" ? {
  target: "extg57c0"
} : {
  target: "extg57c0",
  label: "StyledAnchor"
})(":before{position:absolute;top:0;bottom:0;left:0;right:0;content:'';overflow:hidden;z-index:1;}line-height:0;text-decoration:none;.rounded-play-button__ring,.rounded-play-button__triangle{color:#000;}&:focus,&:hover{[class*='--hover']{text-decoration:underline;}.rounded-play-button__ring,.rounded-play-button__inner{fill:currentColor;color:", _colours.C_POSTBOX, ";}.rounded-play-button__triangle{fill:transparent;}}&:visited{[class*='--visited']{color:", function (_ref2) {
  var darkMode = _ref2.darkMode;
  return darkMode ? _colours.C_STONE : _colours.C_METAL;
}, ";}}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaW5rLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFjNkIiLCJmaWxlIjoiLi4vc3JjL0xpbmsuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvYXJpYS1yb2xlICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbm9kZSwgc3RyaW5nLCBib29sIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDX01FVEFMLCBDX1BPU1RCT1gsIENfU1RPTkUgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcbmltcG9ydCBNZWRpYUluZGljYXRvciBmcm9tICcuL01lZGlhSW5kaWNhdG9yJztcbmltcG9ydCB7IHdpdGhFcGlzb2RlQ29udGV4dCB9IGZyb20gJy4vaGVscGVycyc7XG5cbmNvbnN0IE1lZGlhSW5kaWNhdG9yV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgJHsoeyBkaXIgfSkgPT4gYCR7ZGlyID09PSAnbHRyJyA/ICdsZWZ0JyA6ICdyaWdodCd9OiAwLjVyZW07YH1cbiAgdG9wOiAwO1xuYDtcblxuY29uc3QgU3R5bGVkQW5jaG9yID0gc3R5bGVkLmFgXG4gIDpiZWZvcmUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgY29udGVudDogJyc7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB6LWluZGV4OiAxO1xuICB9XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIC5yb3VuZGVkLXBsYXktYnV0dG9uX19yaW5nLFxuICAucm91bmRlZC1wbGF5LWJ1dHRvbl9fdHJpYW5nbGUge1xuICAgIGNvbG9yOiAjMDAwO1xuICB9XG5cbiAgJjpmb2N1cyxcbiAgJjpob3ZlciB7XG4gICAgW2NsYXNzKj0nLS1ob3ZlciddIHtcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgIH1cbiAgICAucm91bmRlZC1wbGF5LWJ1dHRvbl9fcmluZyxcbiAgICAucm91bmRlZC1wbGF5LWJ1dHRvbl9faW5uZXIge1xuICAgICAgZmlsbDogY3VycmVudENvbG9yO1xuICAgICAgY29sb3I6ICR7Q19QT1NUQk9YfTtcbiAgICB9XG4gICAgLnJvdW5kZWQtcGxheS1idXR0b25fX3RyaWFuZ2xlIHtcbiAgICAgIGZpbGw6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgfVxuICAmOnZpc2l0ZWQge1xuICAgIFtjbGFzcyo9Jy0tdmlzaXRlZCddIHtcbiAgICAgIGNvbG9yOiAkeyh7IGRhcmtNb2RlIH0pID0+IChkYXJrTW9kZSA/IENfU1RPTkUgOiBDX01FVEFMKX07XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBMaW5rID0gKHsgY2hpbGRyZW4sIHNob3dNZWRpYUluZGljYXRvciwgZGlyLCAuLi5wcm9wcyB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFN0eWxlZEFuY2hvciBzaG93TWVkaWFJbmRpY2F0b3I9e3Nob3dNZWRpYUluZGljYXRvcn0gey4uLnByb3BzfT5cbiAgICAgIHtzaG93TWVkaWFJbmRpY2F0b3IgJiYgKFxuICAgICAgICA8TWVkaWFJbmRpY2F0b3JXcmFwcGVyIGRpcj17ZGlyfT5cbiAgICAgICAgICA8TWVkaWFJbmRpY2F0b3Igc2l6ZT1cIjIuNXJlbVwiIC8+XG4gICAgICAgIDwvTWVkaWFJbmRpY2F0b3JXcmFwcGVyPlxuICAgICAgKX1cbiAgICAgIDxzcGFuIHJvbGU9XCJ0ZXh0XCI+e2NoaWxkcmVufTwvc3Bhbj5cbiAgICA8L1N0eWxlZEFuY2hvcj5cbiAgKTtcbn07XG5cbkxpbmsucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZS5pc1JlcXVpcmVkLFxuICBkaXI6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBzaG93TWVkaWFJbmRpY2F0b3I6IGJvb2wsXG59O1xuXG5MaW5rLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2hvd01lZGlhSW5kaWNhdG9yOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhFcGlzb2RlQ29udGV4dChMaW5rKTtcbiJdfQ== */"));

var Link = function Link(_ref3) {
  var children = _ref3.children,
      showMediaIndicator = _ref3.showMediaIndicator,
      dir = _ref3.dir,
      props = _objectWithoutProperties(_ref3, ["children", "showMediaIndicator", "dir"]);

  return /*#__PURE__*/_react.default.createElement(StyledAnchor, _extends({
    showMediaIndicator: showMediaIndicator
  }, props), showMediaIndicator && /*#__PURE__*/_react.default.createElement(MediaIndicatorWrapper, {
    dir: dir
  }, /*#__PURE__*/_react.default.createElement(_MediaIndicator.default, {
    size: "2.5rem"
  })), /*#__PURE__*/_react.default.createElement("span", {
    role: "text"
  }, children));
};

Link.propTypes = {
  children: _propTypes.node.isRequired,
  dir: _propTypes.string.isRequired,
  showMediaIndicator: _propTypes.bool
};
Link.defaultProps = {
  showMediaIndicator: false
};

var _default = (0, _helpers.withEpisodeContext)(Link);

exports.default = _default;