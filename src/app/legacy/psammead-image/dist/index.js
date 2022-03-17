"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AmpImg", {
  enumerable: true,
  get: function get() {
    return _index.default;
  }
});
exports.default = exports.Img = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _react2 = require("@emotion/react");

var _index = _interopRequireDefault(require("./index.amp"));

var _excluded = ["srcset"];

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var fadeInKeyframes = (0, _react2.keyframes)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n"])));
var fadeIn = /*#__PURE__*/(0, _react2.css)("animation:", fadeInKeyframes, " 0.2s linear;transition:visibility 0.2s linear;" + (process.env.NODE_ENV === "production" ? "" : ";label:fadeIn;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUJrQiIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG51bWJlciwgb25lT2ZUeXBlLCBzdHJpbmcsIGJvb2wgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGtleWZyYW1lcywgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIEFtcEltZyB9IGZyb20gJy4vaW5kZXguYW1wJztcblxuY29uc3QgZmFkZUluS2V5ZnJhbWVzID0ga2V5ZnJhbWVzYFxuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG5cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbmA7XG5cbmNvbnN0IGZhZGVJbiA9IGNzc2BcbiAgYW5pbWF0aW9uOiAke2ZhZGVJbktleWZyYW1lc30gMC4ycyBsaW5lYXI7XG4gIHRyYW5zaXRpb246IHZpc2liaWxpdHkgMC4ycyBsaW5lYXI7XG5gO1xuXG5jb25zdCBTdHlsZWRJbWcgPSBzdHlsZWQuaW1nYFxuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICR7cHJvcHMgPT4gcHJvcHMuZmFkZSAmJiBmYWRlSW59O1xuYDtcblxuZXhwb3J0IGNvbnN0IEltZyA9IHByb3BzID0+IHtcbiAgY29uc3QgeyBzcmNzZXQsIC4uLm90aGVyUHJvcHMgfSA9IHByb3BzO1xuXG4gIHJldHVybiA8U3R5bGVkSW1nIHNyY1NldD17c3Jjc2V0fSB7Li4ub3RoZXJQcm9wc30gLz47XG59O1xuXG5JbWcucHJvcFR5cGVzID0ge1xuICBhbHQ6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBmYWRlOiBib29sLFxuICBoZWlnaHQ6IG9uZU9mVHlwZShbc3RyaW5nLCBudW1iZXJdKSxcbiAgc2l6ZXM6IHN0cmluZyxcbiAgc3JjOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc3Jjc2V0OiBzdHJpbmcsXG4gIHdpZHRoOiBvbmVPZlR5cGUoW3N0cmluZywgbnVtYmVyXSksXG59O1xuXG5JbWcuZGVmYXVsdFByb3BzID0ge1xuICBmYWRlOiBmYWxzZSxcbiAgaGVpZ2h0OiBudWxsLFxuICBzaXplczogbnVsbCxcbiAgc3Jjc2V0OiBudWxsLFxuICB3aWR0aDogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEltZztcbiJdfQ== */");
var StyledImg = (0, _base.default)("img", process.env.NODE_ENV === "production" ? {
  target: "e1enwo3v0"
} : {
  target: "e1enwo3v0",
  label: "StyledImg"
})("display:block;width:100%;visibility:visible;", function (props) {
  return props.fade && fadeIn;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0I0QiIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG51bWJlciwgb25lT2ZUeXBlLCBzdHJpbmcsIGJvb2wgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGtleWZyYW1lcywgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIEFtcEltZyB9IGZyb20gJy4vaW5kZXguYW1wJztcblxuY29uc3QgZmFkZUluS2V5ZnJhbWVzID0ga2V5ZnJhbWVzYFxuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG5cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbmA7XG5cbmNvbnN0IGZhZGVJbiA9IGNzc2BcbiAgYW5pbWF0aW9uOiAke2ZhZGVJbktleWZyYW1lc30gMC4ycyBsaW5lYXI7XG4gIHRyYW5zaXRpb246IHZpc2liaWxpdHkgMC4ycyBsaW5lYXI7XG5gO1xuXG5jb25zdCBTdHlsZWRJbWcgPSBzdHlsZWQuaW1nYFxuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICR7cHJvcHMgPT4gcHJvcHMuZmFkZSAmJiBmYWRlSW59O1xuYDtcblxuZXhwb3J0IGNvbnN0IEltZyA9IHByb3BzID0+IHtcbiAgY29uc3QgeyBzcmNzZXQsIC4uLm90aGVyUHJvcHMgfSA9IHByb3BzO1xuXG4gIHJldHVybiA8U3R5bGVkSW1nIHNyY1NldD17c3Jjc2V0fSB7Li4ub3RoZXJQcm9wc30gLz47XG59O1xuXG5JbWcucHJvcFR5cGVzID0ge1xuICBhbHQ6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBmYWRlOiBib29sLFxuICBoZWlnaHQ6IG9uZU9mVHlwZShbc3RyaW5nLCBudW1iZXJdKSxcbiAgc2l6ZXM6IHN0cmluZyxcbiAgc3JjOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc3Jjc2V0OiBzdHJpbmcsXG4gIHdpZHRoOiBvbmVPZlR5cGUoW3N0cmluZywgbnVtYmVyXSksXG59O1xuXG5JbWcuZGVmYXVsdFByb3BzID0ge1xuICBmYWRlOiBmYWxzZSxcbiAgaGVpZ2h0OiBudWxsLFxuICBzaXplczogbnVsbCxcbiAgc3Jjc2V0OiBudWxsLFxuICB3aWR0aDogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEltZztcbiJdfQ== */"));

var Img = function Img(props) {
  var srcset = props.srcset,
      otherProps = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/_react.default.createElement(StyledImg, _extends({
    srcSet: srcset
  }, otherProps));
};

exports.Img = Img;
Img.propTypes = {
  alt: _propTypes.string.isRequired,
  fade: _propTypes.bool,
  height: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number]),
  sizes: _propTypes.string,
  src: _propTypes.string.isRequired,
  srcset: _propTypes.string,
  width: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number])
};
Img.defaultProps = {
  fade: false,
  height: null,
  sizes: null,
  srcset: null,
  width: null
};
var _default = Img;
exports.default = _default;