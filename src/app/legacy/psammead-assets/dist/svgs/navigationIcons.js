"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

var svgSize = '2.75rem'; // 44px

var MenuIcon = (0, _base.default)("svg", process.env.NODE_ENV === "production" ? {
  target: "eqe69jx0"
} : {
  target: "eqe69jx0",
  label: "MenuIcon"
})(process.env.NODE_ENV === "production" ? {
  name: "kwtio1",
  styles: "color:#fff;fill:currentColor"
} : {
  name: "kwtio1",
  styles: "color:#fff;fill:currentColor",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdmdzL25hdmlnYXRpb25JY29ucy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSzJCIiwiZmlsZSI6Ii4uLy4uL3NyYy9zdmdzL25hdmlnYXRpb25JY29ucy5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuXG5jb25zdCBzdmdTaXplID0gJzIuNzVyZW0nOyAvLyA0NHB4XG5cbmNvbnN0IE1lbnVJY29uID0gc3R5bGVkLnN2Z2BcbiAgY29sb3I6ICNmZmY7XG4gIGZpbGw6IGN1cnJlbnRDb2xvcjtcbmA7XG5cbmNvbnN0IGRlZmF1bHRBdHRycyA9IHtcbiAgZm9jdXNhYmxlOiAnZmFsc2UnLFxuICB3aWR0aDogc3ZnU2l6ZSxcbiAgaGVpZ2h0OiBzdmdTaXplLFxuICB2aWV3Qm94OiAnMCAwIDQ0IDQ0Jyxcbn07XG5cbmNvbnN0IG5hdmlnYXRpb25JY29ucyA9IHtcbiAgaGFtYnVyZ2VyOiAoXG4gICAgPE1lbnVJY29uIHsuLi5kZWZhdWx0QXR0cnN9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgPHBhdGggZD1cIk0xMiAyOWgyMXYtMi4zMzNIMTJWMjl6bTAtNS44MzNoMjF2LTIuMzM0SDEydjIuMzM0ek0xMiAxNXYyLjMzM2gyMVYxNUgxMnpcIiAvPlxuICAgIDwvTWVudUljb24+XG4gICksXG4gIGNyb3NzOiAoXG4gICAgPE1lbnVJY29uIHsuLi5kZWZhdWx0QXR0cnN9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgPHBhdGhcbiAgICAgICAgZD1cIk0yNi43NDEgMTVMMjEuNiAyMC4xNDIgMTYuNDU4IDE1IDE1IDE2LjQ1OGw1LjE0MiA1LjE0MkwxNSAyNi43NDJsMS40NTggMS40NTggNS4xNDItNS4xNDEgNS4xNDEgNS4xNDEgMS40NTktMS40NTgtNS4xNDItNS4xNDIgNS4xNDItNS4xNDJ6XCJcbiAgICAgICAgZmlsbFJ1bGU9XCJldmVub2RkXCJcbiAgICAgIC8+XG4gICAgPC9NZW51SWNvbj5cbiAgKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5hdmlnYXRpb25JY29ucztcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
var defaultAttrs = {
  focusable: 'false',
  width: svgSize,
  height: svgSize,
  viewBox: '0 0 44 44'
};
var navigationIcons = {
  hamburger: /*#__PURE__*/_react.default.createElement(MenuIcon, _extends({}, defaultAttrs, {
    "aria-hidden": "true"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M12 29h21v-2.333H12V29zm0-5.833h21v-2.334H12v2.334zM12 15v2.333h21V15H12z"
  })),
  cross: /*#__PURE__*/_react.default.createElement(MenuIcon, _extends({}, defaultAttrs, {
    "aria-hidden": "true"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M26.741 15L21.6 20.142 16.458 15 15 16.458l5.142 5.142L15 26.742l1.458 1.458 5.142-5.141 5.141 5.141 1.459-1.458-5.142-5.142 5.142-5.142z",
    fillRule: "evenodd"
  }))
};
var _default = navigationIcons;
exports.default = _default;