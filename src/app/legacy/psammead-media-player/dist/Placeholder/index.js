"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _psammeadImage = _interopRequireDefault(require("@bbc/psammead-image"));

var _psammeadPlayButton = _interopRequireDefault(require("@bbc/psammead-play-button"));

var _colours = require("@bbc/psammead-styles/colours");

var _Guidance = _interopRequireDefault(require("../Guidance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledPlayButton = ( /*#__PURE__*/0, _base.default)(_psammeadPlayButton.default, process.env.NODE_ENV === "production" ? {
  target: "e1wy66x1"
} : {
  target: "e1wy66x1",
  label: "StyledPlayButton"
})("position:absolute;bottom:0;", function (_ref) {
  var noJsClassName = _ref.noJsClassName;
  return noJsClassName && ".".concat(noJsClassName, " & {\n        display: none;\n      }\n    ");
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9QbGFjZWhvbGRlci9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUTJDIiwiZmlsZSI6Ii4uLy4uL3NyYy9QbGFjZWhvbGRlci9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgc3RyaW5nLCBmdW5jLCBzaGFwZSwgb25lT2YgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbWFnZSBmcm9tICdAYmJjL3BzYW1tZWFkLWltYWdlJztcbmltcG9ydCBQbGF5QnV0dG9uIGZyb20gJ0BiYmMvcHNhbW1lYWQtcGxheS1idXR0b24nO1xuaW1wb3J0IHsgQ19QT1NUQk9YIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvY29sb3Vycyc7XG5pbXBvcnQgR3VpZGFuY2UgZnJvbSAnLi4vR3VpZGFuY2UnO1xuXG5jb25zdCBTdHlsZWRQbGF5QnV0dG9uID0gc3R5bGVkKFBsYXlCdXR0b24pYFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgJHsoeyBub0pzQ2xhc3NOYW1lIH0pID0+XG4gICAgbm9Kc0NsYXNzTmFtZSAmJlxuICAgIGAuJHtub0pzQ2xhc3NOYW1lfSAmIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cbiAgICBgfVxuYDtcblxuY29uc3QgU3R5bGVkUGxhY2Vob2xkZXIgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgJHsoeyBub0pzQ2xhc3NOYW1lIH0pID0+IGBjdXJzb3I6ICR7bm9Kc0NsYXNzTmFtZSA/ICdkZWZhdWx0JyA6ICdwb2ludGVyJ307YH1cblxuICAmOmhvdmVyLCAmOmZvY3VzIHtcbiAgICAke1N0eWxlZFBsYXlCdXR0b259IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Q19QT1NUQk9YfTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IFBsYWNlaG9sZGVyID0gKHtcbiAgb25DbGljayxcbiAgc2VydmljZSxcbiAgc3JjLFxuICBzcmNzZXQsXG4gIG1lZGlhSW5mbyxcbiAgbm9Kc0NsYXNzTmFtZSxcbiAgbm9Kc01lc3NhZ2UsXG59KSA9PiB7XG4gIGNvbnN0IHtcbiAgICB0aXRsZSxcbiAgICBkYXRldGltZSxcbiAgICBkdXJhdGlvbixcbiAgICBkdXJhdGlvblNwb2tlbixcbiAgICB0eXBlLFxuICAgIGd1aWRhbmNlTWVzc2FnZSxcbiAgfSA9IG1lZGlhSW5mbztcblxuICByZXR1cm4gKFxuICAgIDxTdHlsZWRQbGFjZWhvbGRlclxuICAgICAgZGF0YS1lMmU9XCJtZWRpYS1wbGF5ZXJfX3BsYWNlaG9sZGVyXCJcbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICBub0pzQ2xhc3NOYW1lPXtub0pzQ2xhc3NOYW1lfVxuICAgID5cbiAgICAgIDxHdWlkYW5jZVxuICAgICAgICBzZXJ2aWNlPXtzZXJ2aWNlfVxuICAgICAgICBndWlkYW5jZU1lc3NhZ2U9e2d1aWRhbmNlTWVzc2FnZX1cbiAgICAgICAgbm9Kc0NsYXNzTmFtZT17bm9Kc0NsYXNzTmFtZX1cbiAgICAgICAgbm9Kc01lc3NhZ2U9e25vSnNNZXNzYWdlfVxuICAgICAgLz5cbiAgICAgIDxTdHlsZWRQbGF5QnV0dG9uXG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgc2VydmljZT17c2VydmljZX1cbiAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgIGRhdGV0aW1lPXtkYXRldGltZX1cbiAgICAgICAgZHVyYXRpb249e2R1cmF0aW9ufVxuICAgICAgICBkdXJhdGlvblNwb2tlbj17ZHVyYXRpb25TcG9rZW59XG4gICAgICAgIHR5cGU9e3R5cGV9XG4gICAgICAgIGd1aWRhbmNlTWVzc2FnZT17Z3VpZGFuY2VNZXNzYWdlfVxuICAgICAgICBub0pzQ2xhc3NOYW1lPXtub0pzQ2xhc3NOYW1lfVxuICAgICAgLz5cblxuICAgICAgPEltYWdlIGFsdD1cIlwiIHNyYz17c3JjfSBzcmNzZXQ9e3NyY3NldH0gLz5cbiAgICA8L1N0eWxlZFBsYWNlaG9sZGVyPlxuICApO1xufTtcblxuUGxhY2Vob2xkZXIucHJvcFR5cGVzID0ge1xuICBvbkNsaWNrOiBmdW5jLmlzUmVxdWlyZWQsXG4gIHNlcnZpY2U6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBzcmM6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBzcmNzZXQ6IHN0cmluZyxcbiAgbm9Kc0NsYXNzTmFtZTogc3RyaW5nLFxuICBub0pzTWVzc2FnZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG1lZGlhSW5mbzogc2hhcGUoe1xuICAgIHRpdGxlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBkYXRldGltZTogc3RyaW5nLFxuICAgIGR1cmF0aW9uOiBzdHJpbmcsXG4gICAgZHVyYXRpb25TcG9rZW46IHN0cmluZyxcbiAgICB0eXBlOiBvbmVPZihbJ2F1ZGlvJywgJ3ZpZGVvJ10pLFxuICAgIGd1aWRhbmNlTWVzc2FnZTogc3RyaW5nLFxuICB9KSxcbn07XG5QbGFjZWhvbGRlci5kZWZhdWx0UHJvcHMgPSB7XG4gIHNyY3NldDogbnVsbCxcbiAgbm9Kc0NsYXNzTmFtZTogbnVsbCxcbiAgbWVkaWFJbmZvOiBzaGFwZSh7XG4gICAgZGF0ZXRpbWU6IG51bGwsXG4gICAgZHVyYXRpb246IG51bGwsXG4gICAgZHVyYXRpb25TcG9rZW46IG51bGwsXG4gICAgdHlwZTogJ3ZpZGVvJyxcbiAgICBndWlkYW5jZU1lc3NhZ2U6IG51bGwsXG4gIH0pLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUGxhY2Vob2xkZXI7XG4iXX0= */"));
var StyledPlaceholder = (0, _base.default)("div", process.env.NODE_ENV === "production" ? {
  target: "e1wy66x0"
} : {
  target: "e1wy66x0",
  label: "StyledPlaceholder"
})("position:absolute;top:0;left:0;width:100%;height:100%;", function (_ref2) {
  var noJsClassName = _ref2.noJsClassName;
  return "cursor: ".concat(noJsClassName ? 'default' : 'pointer', ";");
}, " &:hover,&:focus{", StyledPlayButton, "{background-color:", _colours.C_POSTBOX, ";}}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9QbGFjZWhvbGRlci9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUJvQyIsImZpbGUiOiIuLi8uLi9zcmMvUGxhY2Vob2xkZXIvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IHN0cmluZywgZnVuYywgc2hhcGUsIG9uZU9mIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgSW1hZ2UgZnJvbSAnQGJiYy9wc2FtbWVhZC1pbWFnZSc7XG5pbXBvcnQgUGxheUJ1dHRvbiBmcm9tICdAYmJjL3BzYW1tZWFkLXBsYXktYnV0dG9uJztcbmltcG9ydCB7IENfUE9TVEJPWCB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IEd1aWRhbmNlIGZyb20gJy4uL0d1aWRhbmNlJztcblxuY29uc3QgU3R5bGVkUGxheUJ1dHRvbiA9IHN0eWxlZChQbGF5QnV0dG9uKWBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gICR7KHsgbm9Kc0NsYXNzTmFtZSB9KSA9PlxuICAgIG5vSnNDbGFzc05hbWUgJiZcbiAgICBgLiR7bm9Kc0NsYXNzTmFtZX0gJiB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICB9XG4gICAgYH1cbmA7XG5cbmNvbnN0IFN0eWxlZFBsYWNlaG9sZGVyID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gICR7KHsgbm9Kc0NsYXNzTmFtZSB9KSA9PiBgY3Vyc29yOiAke25vSnNDbGFzc05hbWUgPyAnZGVmYXVsdCcgOiAncG9pbnRlcid9O2B9XG5cbiAgJjpob3ZlciwgJjpmb2N1cyB7XG4gICAgJHtTdHlsZWRQbGF5QnV0dG9ufSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke0NfUE9TVEJPWH07XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBQbGFjZWhvbGRlciA9ICh7XG4gIG9uQ2xpY2ssXG4gIHNlcnZpY2UsXG4gIHNyYyxcbiAgc3Jjc2V0LFxuICBtZWRpYUluZm8sXG4gIG5vSnNDbGFzc05hbWUsXG4gIG5vSnNNZXNzYWdlLFxufSkgPT4ge1xuICBjb25zdCB7XG4gICAgdGl0bGUsXG4gICAgZGF0ZXRpbWUsXG4gICAgZHVyYXRpb24sXG4gICAgZHVyYXRpb25TcG9rZW4sXG4gICAgdHlwZSxcbiAgICBndWlkYW5jZU1lc3NhZ2UsXG4gIH0gPSBtZWRpYUluZm87XG5cbiAgcmV0dXJuIChcbiAgICA8U3R5bGVkUGxhY2Vob2xkZXJcbiAgICAgIGRhdGEtZTJlPVwibWVkaWEtcGxheWVyX19wbGFjZWhvbGRlclwiXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgbm9Kc0NsYXNzTmFtZT17bm9Kc0NsYXNzTmFtZX1cbiAgICA+XG4gICAgICA8R3VpZGFuY2VcbiAgICAgICAgc2VydmljZT17c2VydmljZX1cbiAgICAgICAgZ3VpZGFuY2VNZXNzYWdlPXtndWlkYW5jZU1lc3NhZ2V9XG4gICAgICAgIG5vSnNDbGFzc05hbWU9e25vSnNDbGFzc05hbWV9XG4gICAgICAgIG5vSnNNZXNzYWdlPXtub0pzTWVzc2FnZX1cbiAgICAgIC8+XG4gICAgICA8U3R5bGVkUGxheUJ1dHRvblxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgIHNlcnZpY2U9e3NlcnZpY2V9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHt9fVxuICAgICAgICBkYXRldGltZT17ZGF0ZXRpbWV9XG4gICAgICAgIGR1cmF0aW9uPXtkdXJhdGlvbn1cbiAgICAgICAgZHVyYXRpb25TcG9rZW49e2R1cmF0aW9uU3Bva2VufVxuICAgICAgICB0eXBlPXt0eXBlfVxuICAgICAgICBndWlkYW5jZU1lc3NhZ2U9e2d1aWRhbmNlTWVzc2FnZX1cbiAgICAgICAgbm9Kc0NsYXNzTmFtZT17bm9Kc0NsYXNzTmFtZX1cbiAgICAgIC8+XG5cbiAgICAgIDxJbWFnZSBhbHQ9XCJcIiBzcmM9e3NyY30gc3Jjc2V0PXtzcmNzZXR9IC8+XG4gICAgPC9TdHlsZWRQbGFjZWhvbGRlcj5cbiAgKTtcbn07XG5cblBsYWNlaG9sZGVyLnByb3BUeXBlcyA9IHtcbiAgb25DbGljazogZnVuYy5pc1JlcXVpcmVkLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc3JjOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc3Jjc2V0OiBzdHJpbmcsXG4gIG5vSnNDbGFzc05hbWU6IHN0cmluZyxcbiAgbm9Kc01lc3NhZ2U6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBtZWRpYUluZm86IHNoYXBlKHtcbiAgICB0aXRsZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgZGF0ZXRpbWU6IHN0cmluZyxcbiAgICBkdXJhdGlvbjogc3RyaW5nLFxuICAgIGR1cmF0aW9uU3Bva2VuOiBzdHJpbmcsXG4gICAgdHlwZTogb25lT2YoWydhdWRpbycsICd2aWRlbyddKSxcbiAgICBndWlkYW5jZU1lc3NhZ2U6IHN0cmluZyxcbiAgfSksXG59O1xuUGxhY2Vob2xkZXIuZGVmYXVsdFByb3BzID0ge1xuICBzcmNzZXQ6IG51bGwsXG4gIG5vSnNDbGFzc05hbWU6IG51bGwsXG4gIG1lZGlhSW5mbzogc2hhcGUoe1xuICAgIGRhdGV0aW1lOiBudWxsLFxuICAgIGR1cmF0aW9uOiBudWxsLFxuICAgIGR1cmF0aW9uU3Bva2VuOiBudWxsLFxuICAgIHR5cGU6ICd2aWRlbycsXG4gICAgZ3VpZGFuY2VNZXNzYWdlOiBudWxsLFxuICB9KSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYWNlaG9sZGVyO1xuIl19 */"));

var Placeholder = function Placeholder(_ref3) {
  var onClick = _ref3.onClick,
      service = _ref3.service,
      src = _ref3.src,
      srcset = _ref3.srcset,
      mediaInfo = _ref3.mediaInfo,
      noJsClassName = _ref3.noJsClassName,
      noJsMessage = _ref3.noJsMessage;
  var title = mediaInfo.title,
      datetime = mediaInfo.datetime,
      duration = mediaInfo.duration,
      durationSpoken = mediaInfo.durationSpoken,
      type = mediaInfo.type,
      guidanceMessage = mediaInfo.guidanceMessage;
  return /*#__PURE__*/_react.default.createElement(StyledPlaceholder, {
    "data-e2e": "media-player__placeholder",
    onClick: onClick,
    noJsClassName: noJsClassName
  }, /*#__PURE__*/_react.default.createElement(_Guidance.default, {
    service: service,
    guidanceMessage: guidanceMessage,
    noJsClassName: noJsClassName,
    noJsMessage: noJsMessage
  }), /*#__PURE__*/_react.default.createElement(StyledPlayButton, {
    title: title,
    service: service,
    onClick: function onClick() {},
    datetime: datetime,
    duration: duration,
    durationSpoken: durationSpoken,
    type: type,
    guidanceMessage: guidanceMessage,
    noJsClassName: noJsClassName
  }), /*#__PURE__*/_react.default.createElement(_psammeadImage.default, {
    alt: "",
    src: src,
    srcset: srcset
  }));
};

Placeholder.propTypes = {
  onClick: _propTypes.func.isRequired,
  service: _propTypes.string.isRequired,
  src: _propTypes.string.isRequired,
  srcset: _propTypes.string,
  noJsClassName: _propTypes.string,
  noJsMessage: _propTypes.string.isRequired,
  mediaInfo: (0, _propTypes.shape)({
    title: _propTypes.string.isRequired,
    datetime: _propTypes.string,
    duration: _propTypes.string,
    durationSpoken: _propTypes.string,
    type: (0, _propTypes.oneOf)(['audio', 'video']),
    guidanceMessage: _propTypes.string
  })
};
Placeholder.defaultProps = {
  srcset: null,
  noJsClassName: null,
  mediaInfo: (0, _propTypes.shape)({
    datetime: null,
    duration: null,
    durationSpoken: null,
    type: 'video',
    guidanceMessage: null
  })
};
var _default = Placeholder;
exports.default = _default;