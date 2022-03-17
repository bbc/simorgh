"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _breakpoints = require("@bbc/gel-foundations/breakpoints");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardImage = (0, _styledBase.default)("figure", {
  target: "ef32a450",
  label: "CardImage"
})("width:88px;display:inline-block;vertical-align:top;margin:8px 0 0 8px;@media (min-width:", _breakpoints.GEL_GROUP_2_SCREEN_WIDTH_MIN, "){width:109px;}@media (min-width:", _breakpoints.GEL_GROUP_3_SCREEN_WIDTH_MIN, "){width:178px;margin:0;}@media (min-width:", _breakpoints.GEL_GROUP_4_SCREEN_WIDTH_MIN, "){width:100%;margin:0;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhcmQtaW1hZ2UuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVErQiIsImZpbGUiOiIuLi8uLi9zcmMvY29tcG9uZW50cy9jYXJkLWltYWdlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcblxuaW1wb3J0IHtcbiAgR0VMX0dST1VQXzJfU0NSRUVOX1dJRFRIX01JTixcbiAgR0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01JTixcbiAgR0VMX0dST1VQXzRfU0NSRUVOX1dJRFRIX01JTixcbn0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvYnJlYWtwb2ludHMnO1xuXG5jb25zdCBDYXJkSW1hZ2UgPSBzdHlsZWQuZmlndXJlYFxuICB3aWR0aDogODhweDtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICBtYXJnaW46IDhweCAwIDAgOHB4O1xuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUlOfSkge1xuICAgIHdpZHRoOiAxMDlweDtcbiAgfVxuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUlOfSkge1xuICAgIHdpZHRoOiAxNzhweDtcbiAgICBtYXJnaW46IDA7XG4gIH1cbiAgQG1lZGlhIChtaW4td2lkdGg6ICR7R0VMX0dST1VQXzRfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDA7XG4gIH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IENhcmRJbWFnZTtcbiJdfQ== */"));
var _default = CardImage;
exports.default = _default;