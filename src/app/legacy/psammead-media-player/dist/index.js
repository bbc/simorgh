"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaMessage = exports.AmpMediaPlayer = exports.CanonicalMediaPlayer = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _equals = _interopRequireDefault(require("ramda/src/equals"));

var _spacings = require("@bbc/gel-foundations/spacings");

var _breakpoints = require("@bbc/gel-foundations/breakpoints");

var _Placeholder = _interopRequireDefault(require("./Placeholder"));

var _Amp = _interopRequireDefault(require("./Amp"));

var _Canonical = _interopRequireDefault(require("./Canonical"));

var _Message = _interopRequireDefault(require("./Message"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var landscapeRatio = '56.25%'; // (9/16)*100 = 16:9

var portraitRatio = '177.78%'; // (16/9)*100 = 9:16

var StyledVideoContainer = (0, _base.default)("div", process.env.NODE_ENV === "production" ? {
  target: "eveuav31"
} : {
  target: "eveuav31",
  label: "StyledVideoContainer"
})("padding-top:", function (_ref) {
  var portrait = _ref.portrait;
  return portrait ? portraitRatio : landscapeRatio;
}, ";position:relative;overflow:hidden;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0J1QyIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCBtZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgc3RyaW5nLCBib29sLCBvbmVPZiwgc2hhcGUsIGZ1bmMsIGFycmF5T2YgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBlcXVhbHMgZnJvbSAncmFtZGEvc3JjL2VxdWFscyc7XG5pbXBvcnQge1xuICBHRUxfU1BBQ0lOR19EQkwsXG4gIEdFTF9TUEFDSU5HX1FVQUQsXG59IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcbmltcG9ydCB7IEdFTF9HUk9VUF80X1NDUkVFTl9XSURUSF9NSU4gfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5pbXBvcnQgUGxhY2Vob2xkZXIgZnJvbSAnLi9QbGFjZWhvbGRlcic7XG5pbXBvcnQgQW1wIGZyb20gJy4vQW1wJztcbmltcG9ydCBDYW5vbmljYWwgZnJvbSAnLi9DYW5vbmljYWwnO1xuaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi9NZXNzYWdlJztcblxuY29uc3QgbGFuZHNjYXBlUmF0aW8gPSAnNTYuMjUlJzsgLy8gKDkvMTYpKjEwMCA9IDE2OjlcbmNvbnN0IHBvcnRyYWl0UmF0aW8gPSAnMTc3Ljc4JSc7IC8vICgxNi85KSoxMDAgPSA5OjE2XG5jb25zdCBTdHlsZWRWaWRlb0NvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmctdG9wOiAkeyh7IHBvcnRyYWl0IH0pID0+IChwb3J0cmFpdCA/IHBvcnRyYWl0UmF0aW8gOiBsYW5kc2NhcGVSYXRpbyl9O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG5gO1xuXG5jb25zdCBTdHlsZWRBdWRpb0NvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogMTY1cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWJvdHRvbTogJHtHRUxfU1BBQ0lOR19EQkx9O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF80X1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgbWFyZ2luLWJvdHRvbTogJHtHRUxfU1BBQ0lOR19RVUFEfTtcbiAgfVxuYDtcblxuY29uc3QgQ2Fub25pY2FsTWVkaWFQbGF5ZXJDb21wb25lbnQgPSAoe1xuICBzaG93UGxhY2Vob2xkZXIsXG4gIHBsYWNlaG9sZGVyU3JjLFxuICBwbGFjZWhvbGRlclNyY3NldCxcbiAgcG9ydHJhaXQsXG4gIHNyYyxcbiAgdGl0bGUsXG4gIHNraW4sXG4gIHNlcnZpY2UsXG4gIG1lZGlhSW5mbyxcbiAgbm9Kc0NsYXNzTmFtZSxcbiAgbm9Kc01lc3NhZ2UsXG4gIHNob3dMb2FkaW5nSW1hZ2UsXG4gIGRhcmtNb2RlLFxuICBvbk1lZGlhSW5pdGlhbGlzZWQsXG4gIG9uTWVkaWFQbGF5aW5nLFxuICBvbk1lZGlhUGF1c2UsXG4gIG9uTWVkaWFFbmRlZCxcbiAgb25NZWRpYVBsYXlsaXN0RW5kZWQsXG4gIG9uTWVkaWFFcnJvcixcbiAgYWNjZXB0YWJsZUV2ZW50T3JpZ2lucyxcbn0pID0+IHtcbiAgY29uc3QgW3BsYWNlaG9sZGVyQWN0aXZlLCBzZXRQbGFjZWhvbGRlckFjdGl2ZV0gPSB1c2VTdGF0ZShzaG93UGxhY2Vob2xkZXIpO1xuICBjb25zdCBoYW5kbGVQbGFjZWhvbGRlckNsaWNrID0gKCkgPT4gc2V0UGxhY2Vob2xkZXJBY3RpdmUoZmFsc2UpO1xuXG4gIGNvbnN0IFN0eWxlZENvbnRhaW5lciA9XG4gICAgc2tpbiA9PT0gJ2F1ZGlvJyA/IFN0eWxlZEF1ZGlvQ29udGFpbmVyIDogU3R5bGVkVmlkZW9Db250YWluZXI7XG5cbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkQ29udGFpbmVyIGRhdGEtZTJlPVwibWVkaWEtcGxheWVyXCIgcG9ydHJhaXQ9e3BvcnRyYWl0fT5cbiAgICAgIHtwbGFjZWhvbGRlckFjdGl2ZSA/IChcbiAgICAgICAgPFBsYWNlaG9sZGVyXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlUGxhY2Vob2xkZXJDbGlja31cbiAgICAgICAgICBzcmM9e3BsYWNlaG9sZGVyU3JjfVxuICAgICAgICAgIHNyY3NldD17cGxhY2Vob2xkZXJTcmNzZXR9XG4gICAgICAgICAgc2VydmljZT17c2VydmljZX1cbiAgICAgICAgICBtZWRpYUluZm89e21lZGlhSW5mb31cbiAgICAgICAgICBub0pzQ2xhc3NOYW1lPXtub0pzQ2xhc3NOYW1lfVxuICAgICAgICAgIG5vSnNNZXNzYWdlPXtub0pzTWVzc2FnZX1cbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxDYW5vbmljYWxcbiAgICAgICAgICBzcmM9e3NyY31cbiAgICAgICAgICBwbGFjZWhvbGRlclNyY3NldD17cGxhY2Vob2xkZXJTcmNzZXR9XG4gICAgICAgICAgc2hvd1BsYWNlaG9sZGVyPXtzaG93UGxhY2Vob2xkZXJ9XG4gICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgIHBsYWNlaG9sZGVyU3JjPXtwbGFjZWhvbGRlclNyY31cbiAgICAgICAgICBzZXJ2aWNlPXtzZXJ2aWNlfVxuICAgICAgICAgIG5vSnNNZXNzYWdlPXtub0pzTWVzc2FnZX1cbiAgICAgICAgICBzaG93TG9hZGluZ0ltYWdlPXtzaG93TG9hZGluZ0ltYWdlfVxuICAgICAgICAgIGRhcmtNb2RlPXtkYXJrTW9kZX1cbiAgICAgICAgICBvbk1lZGlhSW5pdGlhbGlzZWQ9e29uTWVkaWFJbml0aWFsaXNlZH1cbiAgICAgICAgICBvbk1lZGlhUGxheWluZz17b25NZWRpYVBsYXlpbmd9XG4gICAgICAgICAgb25NZWRpYVBhdXNlPXtvbk1lZGlhUGF1c2V9XG4gICAgICAgICAgb25NZWRpYUVuZGVkPXtvbk1lZGlhRW5kZWR9XG4gICAgICAgICAgb25NZWRpYVBsYXlsaXN0RW5kZWQ9e29uTWVkaWFQbGF5bGlzdEVuZGVkfVxuICAgICAgICAgIG9uTWVkaWFFcnJvcj17b25NZWRpYUVycm9yfVxuICAgICAgICAgIGFjY2VwdGFibGVFdmVudE9yaWdpbnM9e2FjY2VwdGFibGVFdmVudE9yaWdpbnN9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvU3R5bGVkQ29udGFpbmVyPlxuICApO1xufTtcblxuLy8gQ29tcG9uZW50IHJlY2VpdmVzIGEgXCJtZWRpYUluZm9cIiBvYmplY3QgcHJvcCAtIHRoaXMgY2FuIGNhdXNlIHVubmVjZXNzYXJ5XG4vLyByZS1yZW5kZXJzIHdoZW4gdGhlIG9iamVjdCByZWZlcmVuY2UgY2hhbmdlcywgYnV0IHRoZSBjb250ZW50IGlzIHRoZSBzYW1lLlxuLy8gV2Ugb25seSByZXJlbmRlciBpZiB0aGUgcHJldlByb3BzIGFuZCBuZXh0UHJvcHMgZmFpbCBkZWVwIGVxdWFsaXR5IGNoZWNrXG5leHBvcnQgY29uc3QgQ2Fub25pY2FsTWVkaWFQbGF5ZXIgPSBtZW1vKENhbm9uaWNhbE1lZGlhUGxheWVyQ29tcG9uZW50LCBlcXVhbHMpO1xuXG5leHBvcnQgY29uc3QgQW1wTWVkaWFQbGF5ZXIgPSAoe1xuICBwbGFjZWhvbGRlclNyY3NldCxcbiAgcGxhY2Vob2xkZXJTcmMsXG4gIHBvcnRyYWl0LFxuICBzcmMsXG4gIHRpdGxlLFxuICBza2luLFxuICBub0pzTWVzc2FnZSxcbiAgc2VydmljZSxcbn0pID0+IHtcbiAgY29uc3QgU3R5bGVkQ29udGFpbmVyID1cbiAgICBza2luID09PSAnYXVkaW8nID8gU3R5bGVkQXVkaW9Db250YWluZXIgOiBTdHlsZWRWaWRlb0NvbnRhaW5lcjtcblxuICByZXR1cm4gKFxuICAgIDxTdHlsZWRDb250YWluZXIgcG9ydHJhaXQ9e3BvcnRyYWl0fT5cbiAgICAgIDxBbXBcbiAgICAgICAgcGxhY2Vob2xkZXJTcmNzZXQ9e3BsYWNlaG9sZGVyU3Jjc2V0fVxuICAgICAgICBwbGFjZWhvbGRlclNyYz17cGxhY2Vob2xkZXJTcmN9XG4gICAgICAgIHNyYz17c3JjfVxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgIGhlaWdodD17cG9ydHJhaXQgPyA5IDogMTZ9XG4gICAgICAgIHdpZHRoPXtwb3J0cmFpdCA/IDE2IDogOX1cbiAgICAgICAgbm9Kc01lc3NhZ2U9e25vSnNNZXNzYWdlfVxuICAgICAgICBzZXJ2aWNlPXtzZXJ2aWNlfVxuICAgICAgLz5cbiAgICA8L1N0eWxlZENvbnRhaW5lcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBNZWRpYU1lc3NhZ2UgPSBNZXNzYWdlO1xuXG5DYW5vbmljYWxNZWRpYVBsYXllckNvbXBvbmVudC5wcm9wVHlwZXMgPSB7XG4gIHBsYWNlaG9sZGVyU3JjOiBzdHJpbmcsXG4gIHBsYWNlaG9sZGVyU3Jjc2V0OiBzdHJpbmcsXG4gIHBvcnRyYWl0OiBib29sLFxuICBzaG93UGxhY2Vob2xkZXI6IGJvb2wsXG4gIHNyYzogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRpdGxlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2tpbjogb25lT2YoWydjbGFzc2ljJywgJ2F1ZGlvJ10pLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgbm9Kc0NsYXNzTmFtZTogc3RyaW5nLFxuICBub0pzTWVzc2FnZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG1lZGlhSW5mbzogc2hhcGUoe1xuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgZGF0ZXRpbWU6IHN0cmluZyxcbiAgICBkdXJhdGlvbjogc3RyaW5nLFxuICAgIGR1cmF0aW9uU3Bva2VuOiBzdHJpbmcsXG4gICAgdHlwZTogb25lT2YoWyd2aWRlbycsICdhdWRpbyddKSxcbiAgICBndWlkYW5jZU1lc3NhZ2U6IHN0cmluZyxcbiAgfSksXG4gIHNob3dMb2FkaW5nSW1hZ2U6IGJvb2wsXG4gIGRhcmtNb2RlOiBib29sLFxuICBvbk1lZGlhSW5pdGlhbGlzZWQ6IGZ1bmMsXG4gIG9uTWVkaWFQbGF5aW5nOiBmdW5jLFxuICBvbk1lZGlhUGF1c2U6IGZ1bmMsXG4gIG9uTWVkaWFFbmRlZDogZnVuYyxcbiAgb25NZWRpYVBsYXlsaXN0RW5kZWQ6IGZ1bmMsXG4gIG9uTWVkaWFFcnJvcjogZnVuYyxcbiAgYWNjZXB0YWJsZUV2ZW50T3JpZ2luczogYXJyYXlPZihzdHJpbmcpLFxufTtcblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5DYW5vbmljYWxNZWRpYVBsYXllckNvbXBvbmVudC5kZWZhdWx0UHJvcHMgPSB7XG4gIHBvcnRyYWl0OiBmYWxzZSxcbiAgc2hvd1BsYWNlaG9sZGVyOiB0cnVlLFxuICBza2luOiAnY2xhc3NpYycsXG4gIHBsYWNlaG9sZGVyU3JjOiBudWxsLFxuICBwbGFjZWhvbGRlclNyY3NldDogbnVsbCxcbiAgbm9Kc0NsYXNzTmFtZTogbnVsbCxcbiAgbWVkaWFJbmZvOiB7fSxcbiAgc2hvd0xvYWRpbmdJbWFnZTogZmFsc2UsXG4gIGRhcmtNb2RlOiBmYWxzZSxcbiAgb25NZWRpYUluaXRpYWxpc2VkOiBub29wLFxuICBvbk1lZGlhUGxheWluZzogbm9vcCxcbiAgb25NZWRpYVBhdXNlOiBub29wLFxuICBvbk1lZGlhRW5kZWQ6IG5vb3AsXG4gIG9uTWVkaWFQbGF5bGlzdEVuZGVkOiBub29wLFxuICBvbk1lZGlhRXJyb3I6IG5vb3AsXG4gIGFjY2VwdGFibGVFdmVudE9yaWdpbnM6IFtcbiAgICAnd3d3LnRlc3QuYmJjLmNvbScsXG4gICAgJ3BvbGxpbmcudGVzdC5iYmMuY29tJyxcbiAgICAnd3d3LmJiYy5jb20nLFxuICAgICdwb2xsaW5nLmJiYy5jb20nLFxuICAgICdsb2NhbGhvc3QuYmJjLmNvbScsXG4gICAgJ2xvY2FsaG9zdCcsXG4gIF0sXG59O1xuXG5NZWRpYU1lc3NhZ2UucHJvcFR5cGVzID0ge1xuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgbWVzc2FnZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHBsYWNlaG9sZGVyU3JjOiBzdHJpbmcsXG4gIHBsYWNlaG9sZGVyU3Jjc2V0OiBzdHJpbmcsXG59O1xuXG5NZWRpYU1lc3NhZ2UuZGVmYXVsdFByb3BzID0ge1xuICBwbGFjZWhvbGRlclNyYzogbnVsbCxcbiAgcGxhY2Vob2xkZXJTcmNzZXQ6IG51bGwsXG59O1xuXG5BbXBNZWRpYVBsYXllci5wcm9wVHlwZXMgPSB7XG4gIHBsYWNlaG9sZGVyU3JjOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgcGxhY2Vob2xkZXJTcmNzZXQ6IHN0cmluZyxcbiAgcG9ydHJhaXQ6IGJvb2wsXG4gIHNyYzogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRpdGxlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2tpbjogb25lT2YoWydjbGFzc2ljJywgJ2F1ZGlvJ10pLFxuICBub0pzTWVzc2FnZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHNlcnZpY2U6IHN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuQW1wTWVkaWFQbGF5ZXIuZGVmYXVsdFByb3BzID0ge1xuICBwb3J0cmFpdDogZmFsc2UsXG4gIHNraW46ICdjbGFzc2ljJyxcbiAgcGxhY2Vob2xkZXJTcmNzZXQ6IG51bGwsXG59O1xuIl19 */"));
var StyledAudioContainer = (0, _base.default)("div", process.env.NODE_ENV === "production" ? {
  target: "eveuav30"
} : {
  target: "eveuav30",
  label: "StyledAudioContainer"
})("height:165px;position:relative;margin-bottom:", _spacings.GEL_SPACING_DBL, ";@media (min-width: ", _breakpoints.GEL_GROUP_4_SCREEN_WIDTH_MIN, "){margin-bottom:", _spacings.GEL_SPACING_QUAD, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0J1QyIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCBtZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgc3RyaW5nLCBib29sLCBvbmVPZiwgc2hhcGUsIGZ1bmMsIGFycmF5T2YgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBlcXVhbHMgZnJvbSAncmFtZGEvc3JjL2VxdWFscyc7XG5pbXBvcnQge1xuICBHRUxfU1BBQ0lOR19EQkwsXG4gIEdFTF9TUEFDSU5HX1FVQUQsXG59IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcbmltcG9ydCB7IEdFTF9HUk9VUF80X1NDUkVFTl9XSURUSF9NSU4gfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5pbXBvcnQgUGxhY2Vob2xkZXIgZnJvbSAnLi9QbGFjZWhvbGRlcic7XG5pbXBvcnQgQW1wIGZyb20gJy4vQW1wJztcbmltcG9ydCBDYW5vbmljYWwgZnJvbSAnLi9DYW5vbmljYWwnO1xuaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi9NZXNzYWdlJztcblxuY29uc3QgbGFuZHNjYXBlUmF0aW8gPSAnNTYuMjUlJzsgLy8gKDkvMTYpKjEwMCA9IDE2OjlcbmNvbnN0IHBvcnRyYWl0UmF0aW8gPSAnMTc3Ljc4JSc7IC8vICgxNi85KSoxMDAgPSA5OjE2XG5jb25zdCBTdHlsZWRWaWRlb0NvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmctdG9wOiAkeyh7IHBvcnRyYWl0IH0pID0+IChwb3J0cmFpdCA/IHBvcnRyYWl0UmF0aW8gOiBsYW5kc2NhcGVSYXRpbyl9O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG5gO1xuXG5jb25zdCBTdHlsZWRBdWRpb0NvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogMTY1cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWJvdHRvbTogJHtHRUxfU1BBQ0lOR19EQkx9O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF80X1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgbWFyZ2luLWJvdHRvbTogJHtHRUxfU1BBQ0lOR19RVUFEfTtcbiAgfVxuYDtcblxuY29uc3QgQ2Fub25pY2FsTWVkaWFQbGF5ZXJDb21wb25lbnQgPSAoe1xuICBzaG93UGxhY2Vob2xkZXIsXG4gIHBsYWNlaG9sZGVyU3JjLFxuICBwbGFjZWhvbGRlclNyY3NldCxcbiAgcG9ydHJhaXQsXG4gIHNyYyxcbiAgdGl0bGUsXG4gIHNraW4sXG4gIHNlcnZpY2UsXG4gIG1lZGlhSW5mbyxcbiAgbm9Kc0NsYXNzTmFtZSxcbiAgbm9Kc01lc3NhZ2UsXG4gIHNob3dMb2FkaW5nSW1hZ2UsXG4gIGRhcmtNb2RlLFxuICBvbk1lZGlhSW5pdGlhbGlzZWQsXG4gIG9uTWVkaWFQbGF5aW5nLFxuICBvbk1lZGlhUGF1c2UsXG4gIG9uTWVkaWFFbmRlZCxcbiAgb25NZWRpYVBsYXlsaXN0RW5kZWQsXG4gIG9uTWVkaWFFcnJvcixcbiAgYWNjZXB0YWJsZUV2ZW50T3JpZ2lucyxcbn0pID0+IHtcbiAgY29uc3QgW3BsYWNlaG9sZGVyQWN0aXZlLCBzZXRQbGFjZWhvbGRlckFjdGl2ZV0gPSB1c2VTdGF0ZShzaG93UGxhY2Vob2xkZXIpO1xuICBjb25zdCBoYW5kbGVQbGFjZWhvbGRlckNsaWNrID0gKCkgPT4gc2V0UGxhY2Vob2xkZXJBY3RpdmUoZmFsc2UpO1xuXG4gIGNvbnN0IFN0eWxlZENvbnRhaW5lciA9XG4gICAgc2tpbiA9PT0gJ2F1ZGlvJyA/IFN0eWxlZEF1ZGlvQ29udGFpbmVyIDogU3R5bGVkVmlkZW9Db250YWluZXI7XG5cbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkQ29udGFpbmVyIGRhdGEtZTJlPVwibWVkaWEtcGxheWVyXCIgcG9ydHJhaXQ9e3BvcnRyYWl0fT5cbiAgICAgIHtwbGFjZWhvbGRlckFjdGl2ZSA/IChcbiAgICAgICAgPFBsYWNlaG9sZGVyXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlUGxhY2Vob2xkZXJDbGlja31cbiAgICAgICAgICBzcmM9e3BsYWNlaG9sZGVyU3JjfVxuICAgICAgICAgIHNyY3NldD17cGxhY2Vob2xkZXJTcmNzZXR9XG4gICAgICAgICAgc2VydmljZT17c2VydmljZX1cbiAgICAgICAgICBtZWRpYUluZm89e21lZGlhSW5mb31cbiAgICAgICAgICBub0pzQ2xhc3NOYW1lPXtub0pzQ2xhc3NOYW1lfVxuICAgICAgICAgIG5vSnNNZXNzYWdlPXtub0pzTWVzc2FnZX1cbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxDYW5vbmljYWxcbiAgICAgICAgICBzcmM9e3NyY31cbiAgICAgICAgICBwbGFjZWhvbGRlclNyY3NldD17cGxhY2Vob2xkZXJTcmNzZXR9XG4gICAgICAgICAgc2hvd1BsYWNlaG9sZGVyPXtzaG93UGxhY2Vob2xkZXJ9XG4gICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgIHBsYWNlaG9sZGVyU3JjPXtwbGFjZWhvbGRlclNyY31cbiAgICAgICAgICBzZXJ2aWNlPXtzZXJ2aWNlfVxuICAgICAgICAgIG5vSnNNZXNzYWdlPXtub0pzTWVzc2FnZX1cbiAgICAgICAgICBzaG93TG9hZGluZ0ltYWdlPXtzaG93TG9hZGluZ0ltYWdlfVxuICAgICAgICAgIGRhcmtNb2RlPXtkYXJrTW9kZX1cbiAgICAgICAgICBvbk1lZGlhSW5pdGlhbGlzZWQ9e29uTWVkaWFJbml0aWFsaXNlZH1cbiAgICAgICAgICBvbk1lZGlhUGxheWluZz17b25NZWRpYVBsYXlpbmd9XG4gICAgICAgICAgb25NZWRpYVBhdXNlPXtvbk1lZGlhUGF1c2V9XG4gICAgICAgICAgb25NZWRpYUVuZGVkPXtvbk1lZGlhRW5kZWR9XG4gICAgICAgICAgb25NZWRpYVBsYXlsaXN0RW5kZWQ9e29uTWVkaWFQbGF5bGlzdEVuZGVkfVxuICAgICAgICAgIG9uTWVkaWFFcnJvcj17b25NZWRpYUVycm9yfVxuICAgICAgICAgIGFjY2VwdGFibGVFdmVudE9yaWdpbnM9e2FjY2VwdGFibGVFdmVudE9yaWdpbnN9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvU3R5bGVkQ29udGFpbmVyPlxuICApO1xufTtcblxuLy8gQ29tcG9uZW50IHJlY2VpdmVzIGEgXCJtZWRpYUluZm9cIiBvYmplY3QgcHJvcCAtIHRoaXMgY2FuIGNhdXNlIHVubmVjZXNzYXJ5XG4vLyByZS1yZW5kZXJzIHdoZW4gdGhlIG9iamVjdCByZWZlcmVuY2UgY2hhbmdlcywgYnV0IHRoZSBjb250ZW50IGlzIHRoZSBzYW1lLlxuLy8gV2Ugb25seSByZXJlbmRlciBpZiB0aGUgcHJldlByb3BzIGFuZCBuZXh0UHJvcHMgZmFpbCBkZWVwIGVxdWFsaXR5IGNoZWNrXG5leHBvcnQgY29uc3QgQ2Fub25pY2FsTWVkaWFQbGF5ZXIgPSBtZW1vKENhbm9uaWNhbE1lZGlhUGxheWVyQ29tcG9uZW50LCBlcXVhbHMpO1xuXG5leHBvcnQgY29uc3QgQW1wTWVkaWFQbGF5ZXIgPSAoe1xuICBwbGFjZWhvbGRlclNyY3NldCxcbiAgcGxhY2Vob2xkZXJTcmMsXG4gIHBvcnRyYWl0LFxuICBzcmMsXG4gIHRpdGxlLFxuICBza2luLFxuICBub0pzTWVzc2FnZSxcbiAgc2VydmljZSxcbn0pID0+IHtcbiAgY29uc3QgU3R5bGVkQ29udGFpbmVyID1cbiAgICBza2luID09PSAnYXVkaW8nID8gU3R5bGVkQXVkaW9Db250YWluZXIgOiBTdHlsZWRWaWRlb0NvbnRhaW5lcjtcblxuICByZXR1cm4gKFxuICAgIDxTdHlsZWRDb250YWluZXIgcG9ydHJhaXQ9e3BvcnRyYWl0fT5cbiAgICAgIDxBbXBcbiAgICAgICAgcGxhY2Vob2xkZXJTcmNzZXQ9e3BsYWNlaG9sZGVyU3Jjc2V0fVxuICAgICAgICBwbGFjZWhvbGRlclNyYz17cGxhY2Vob2xkZXJTcmN9XG4gICAgICAgIHNyYz17c3JjfVxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgIGhlaWdodD17cG9ydHJhaXQgPyA5IDogMTZ9XG4gICAgICAgIHdpZHRoPXtwb3J0cmFpdCA/IDE2IDogOX1cbiAgICAgICAgbm9Kc01lc3NhZ2U9e25vSnNNZXNzYWdlfVxuICAgICAgICBzZXJ2aWNlPXtzZXJ2aWNlfVxuICAgICAgLz5cbiAgICA8L1N0eWxlZENvbnRhaW5lcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBNZWRpYU1lc3NhZ2UgPSBNZXNzYWdlO1xuXG5DYW5vbmljYWxNZWRpYVBsYXllckNvbXBvbmVudC5wcm9wVHlwZXMgPSB7XG4gIHBsYWNlaG9sZGVyU3JjOiBzdHJpbmcsXG4gIHBsYWNlaG9sZGVyU3Jjc2V0OiBzdHJpbmcsXG4gIHBvcnRyYWl0OiBib29sLFxuICBzaG93UGxhY2Vob2xkZXI6IGJvb2wsXG4gIHNyYzogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRpdGxlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2tpbjogb25lT2YoWydjbGFzc2ljJywgJ2F1ZGlvJ10pLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgbm9Kc0NsYXNzTmFtZTogc3RyaW5nLFxuICBub0pzTWVzc2FnZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG1lZGlhSW5mbzogc2hhcGUoe1xuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgZGF0ZXRpbWU6IHN0cmluZyxcbiAgICBkdXJhdGlvbjogc3RyaW5nLFxuICAgIGR1cmF0aW9uU3Bva2VuOiBzdHJpbmcsXG4gICAgdHlwZTogb25lT2YoWyd2aWRlbycsICdhdWRpbyddKSxcbiAgICBndWlkYW5jZU1lc3NhZ2U6IHN0cmluZyxcbiAgfSksXG4gIHNob3dMb2FkaW5nSW1hZ2U6IGJvb2wsXG4gIGRhcmtNb2RlOiBib29sLFxuICBvbk1lZGlhSW5pdGlhbGlzZWQ6IGZ1bmMsXG4gIG9uTWVkaWFQbGF5aW5nOiBmdW5jLFxuICBvbk1lZGlhUGF1c2U6IGZ1bmMsXG4gIG9uTWVkaWFFbmRlZDogZnVuYyxcbiAgb25NZWRpYVBsYXlsaXN0RW5kZWQ6IGZ1bmMsXG4gIG9uTWVkaWFFcnJvcjogZnVuYyxcbiAgYWNjZXB0YWJsZUV2ZW50T3JpZ2luczogYXJyYXlPZihzdHJpbmcpLFxufTtcblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5DYW5vbmljYWxNZWRpYVBsYXllckNvbXBvbmVudC5kZWZhdWx0UHJvcHMgPSB7XG4gIHBvcnRyYWl0OiBmYWxzZSxcbiAgc2hvd1BsYWNlaG9sZGVyOiB0cnVlLFxuICBza2luOiAnY2xhc3NpYycsXG4gIHBsYWNlaG9sZGVyU3JjOiBudWxsLFxuICBwbGFjZWhvbGRlclNyY3NldDogbnVsbCxcbiAgbm9Kc0NsYXNzTmFtZTogbnVsbCxcbiAgbWVkaWFJbmZvOiB7fSxcbiAgc2hvd0xvYWRpbmdJbWFnZTogZmFsc2UsXG4gIGRhcmtNb2RlOiBmYWxzZSxcbiAgb25NZWRpYUluaXRpYWxpc2VkOiBub29wLFxuICBvbk1lZGlhUGxheWluZzogbm9vcCxcbiAgb25NZWRpYVBhdXNlOiBub29wLFxuICBvbk1lZGlhRW5kZWQ6IG5vb3AsXG4gIG9uTWVkaWFQbGF5bGlzdEVuZGVkOiBub29wLFxuICBvbk1lZGlhRXJyb3I6IG5vb3AsXG4gIGFjY2VwdGFibGVFdmVudE9yaWdpbnM6IFtcbiAgICAnd3d3LnRlc3QuYmJjLmNvbScsXG4gICAgJ3BvbGxpbmcudGVzdC5iYmMuY29tJyxcbiAgICAnd3d3LmJiYy5jb20nLFxuICAgICdwb2xsaW5nLmJiYy5jb20nLFxuICAgICdsb2NhbGhvc3QuYmJjLmNvbScsXG4gICAgJ2xvY2FsaG9zdCcsXG4gIF0sXG59O1xuXG5NZWRpYU1lc3NhZ2UucHJvcFR5cGVzID0ge1xuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgbWVzc2FnZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHBsYWNlaG9sZGVyU3JjOiBzdHJpbmcsXG4gIHBsYWNlaG9sZGVyU3Jjc2V0OiBzdHJpbmcsXG59O1xuXG5NZWRpYU1lc3NhZ2UuZGVmYXVsdFByb3BzID0ge1xuICBwbGFjZWhvbGRlclNyYzogbnVsbCxcbiAgcGxhY2Vob2xkZXJTcmNzZXQ6IG51bGwsXG59O1xuXG5BbXBNZWRpYVBsYXllci5wcm9wVHlwZXMgPSB7XG4gIHBsYWNlaG9sZGVyU3JjOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgcGxhY2Vob2xkZXJTcmNzZXQ6IHN0cmluZyxcbiAgcG9ydHJhaXQ6IGJvb2wsXG4gIHNyYzogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRpdGxlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2tpbjogb25lT2YoWydjbGFzc2ljJywgJ2F1ZGlvJ10pLFxuICBub0pzTWVzc2FnZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHNlcnZpY2U6IHN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuQW1wTWVkaWFQbGF5ZXIuZGVmYXVsdFByb3BzID0ge1xuICBwb3J0cmFpdDogZmFsc2UsXG4gIHNraW46ICdjbGFzc2ljJyxcbiAgcGxhY2Vob2xkZXJTcmNzZXQ6IG51bGwsXG59O1xuIl19 */"));

var CanonicalMediaPlayerComponent = function CanonicalMediaPlayerComponent(_ref2) {
  var showPlaceholder = _ref2.showPlaceholder,
      placeholderSrc = _ref2.placeholderSrc,
      placeholderSrcset = _ref2.placeholderSrcset,
      portrait = _ref2.portrait,
      src = _ref2.src,
      title = _ref2.title,
      skin = _ref2.skin,
      service = _ref2.service,
      mediaInfo = _ref2.mediaInfo,
      noJsClassName = _ref2.noJsClassName,
      noJsMessage = _ref2.noJsMessage,
      showLoadingImage = _ref2.showLoadingImage,
      darkMode = _ref2.darkMode,
      onMediaInitialised = _ref2.onMediaInitialised,
      onMediaPlaying = _ref2.onMediaPlaying,
      onMediaPause = _ref2.onMediaPause,
      onMediaEnded = _ref2.onMediaEnded,
      onMediaPlaylistEnded = _ref2.onMediaPlaylistEnded,
      onMediaError = _ref2.onMediaError,
      acceptableEventOrigins = _ref2.acceptableEventOrigins;

  var _useState = (0, _react.useState)(showPlaceholder),
      _useState2 = _slicedToArray(_useState, 2),
      placeholderActive = _useState2[0],
      setPlaceholderActive = _useState2[1];

  var handlePlaceholderClick = function handlePlaceholderClick() {
    return setPlaceholderActive(false);
  };

  var StyledContainer = skin === 'audio' ? StyledAudioContainer : StyledVideoContainer;
  return /*#__PURE__*/_react.default.createElement(StyledContainer, {
    "data-e2e": "media-player",
    portrait: portrait
  }, placeholderActive ? /*#__PURE__*/_react.default.createElement(_Placeholder.default, {
    onClick: handlePlaceholderClick,
    src: placeholderSrc,
    srcset: placeholderSrcset,
    service: service,
    mediaInfo: mediaInfo,
    noJsClassName: noJsClassName,
    noJsMessage: noJsMessage
  }) : /*#__PURE__*/_react.default.createElement(_Canonical.default, {
    src: src,
    placeholderSrcset: placeholderSrcset,
    showPlaceholder: showPlaceholder,
    title: title,
    placeholderSrc: placeholderSrc,
    service: service,
    noJsMessage: noJsMessage,
    showLoadingImage: showLoadingImage,
    darkMode: darkMode,
    onMediaInitialised: onMediaInitialised,
    onMediaPlaying: onMediaPlaying,
    onMediaPause: onMediaPause,
    onMediaEnded: onMediaEnded,
    onMediaPlaylistEnded: onMediaPlaylistEnded,
    onMediaError: onMediaError,
    acceptableEventOrigins: acceptableEventOrigins
  }));
}; // Component receives a "mediaInfo" object prop - this can cause unnecessary
// re-renders when the object reference changes, but the content is the same.
// We only rerender if the prevProps and nextProps fail deep equality check


var CanonicalMediaPlayer = /*#__PURE__*/(0, _react.memo)(CanonicalMediaPlayerComponent, _equals.default);
exports.CanonicalMediaPlayer = CanonicalMediaPlayer;

var AmpMediaPlayer = function AmpMediaPlayer(_ref3) {
  var placeholderSrcset = _ref3.placeholderSrcset,
      placeholderSrc = _ref3.placeholderSrc,
      portrait = _ref3.portrait,
      src = _ref3.src,
      title = _ref3.title,
      skin = _ref3.skin,
      noJsMessage = _ref3.noJsMessage,
      service = _ref3.service;
  var StyledContainer = skin === 'audio' ? StyledAudioContainer : StyledVideoContainer;
  return /*#__PURE__*/_react.default.createElement(StyledContainer, {
    portrait: portrait
  }, /*#__PURE__*/_react.default.createElement(_Amp.default, {
    placeholderSrcset: placeholderSrcset,
    placeholderSrc: placeholderSrc,
    src: src,
    title: title,
    height: portrait ? 9 : 16,
    width: portrait ? 16 : 9,
    noJsMessage: noJsMessage,
    service: service
  }));
};

exports.AmpMediaPlayer = AmpMediaPlayer;
var MediaMessage = _Message.default;
exports.MediaMessage = MediaMessage;
CanonicalMediaPlayerComponent.propTypes = {
  placeholderSrc: _propTypes.string,
  placeholderSrcset: _propTypes.string,
  portrait: _propTypes.bool,
  showPlaceholder: _propTypes.bool,
  src: _propTypes.string.isRequired,
  title: _propTypes.string.isRequired,
  skin: (0, _propTypes.oneOf)(['classic', 'audio']),
  service: _propTypes.string.isRequired,
  noJsClassName: _propTypes.string,
  noJsMessage: _propTypes.string.isRequired,
  mediaInfo: (0, _propTypes.shape)({
    title: _propTypes.string,
    datetime: _propTypes.string,
    duration: _propTypes.string,
    durationSpoken: _propTypes.string,
    type: (0, _propTypes.oneOf)(['video', 'audio']),
    guidanceMessage: _propTypes.string
  }),
  showLoadingImage: _propTypes.bool,
  darkMode: _propTypes.bool,
  onMediaInitialised: _propTypes.func,
  onMediaPlaying: _propTypes.func,
  onMediaPause: _propTypes.func,
  onMediaEnded: _propTypes.func,
  onMediaPlaylistEnded: _propTypes.func,
  onMediaError: _propTypes.func,
  acceptableEventOrigins: (0, _propTypes.arrayOf)(_propTypes.string)
};

var noop = function noop() {};

CanonicalMediaPlayerComponent.defaultProps = {
  portrait: false,
  showPlaceholder: true,
  skin: 'classic',
  placeholderSrc: null,
  placeholderSrcset: null,
  noJsClassName: null,
  mediaInfo: {},
  showLoadingImage: false,
  darkMode: false,
  onMediaInitialised: noop,
  onMediaPlaying: noop,
  onMediaPause: noop,
  onMediaEnded: noop,
  onMediaPlaylistEnded: noop,
  onMediaError: noop,
  acceptableEventOrigins: ['www.test.bbc.com', 'polling.test.bbc.com', 'www.bbc.com', 'polling.bbc.com', 'localhost.bbc.com', 'localhost']
};
MediaMessage.propTypes = {
  service: _propTypes.string.isRequired,
  message: _propTypes.string.isRequired,
  placeholderSrc: _propTypes.string,
  placeholderSrcset: _propTypes.string
};
MediaMessage.defaultProps = {
  placeholderSrc: null,
  placeholderSrcset: null
};
AmpMediaPlayer.propTypes = {
  placeholderSrc: _propTypes.string.isRequired,
  placeholderSrcset: _propTypes.string,
  portrait: _propTypes.bool,
  src: _propTypes.string.isRequired,
  title: _propTypes.string.isRequired,
  skin: (0, _propTypes.oneOf)(['classic', 'audio']),
  noJsMessage: _propTypes.string.isRequired,
  service: _propTypes.string.isRequired
};
AmpMediaPlayer.defaultProps = {
  portrait: false,
  skin: 'classic',
  placeholderSrcset: null
};