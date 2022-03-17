"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

var _colours = require("@bbc/psammead-styles/colours");

var _spacings = require("@bbc/gel-foundations/spacings");

var _psammeadVisuallyHiddenText = _interopRequireDefault(require("@bbc/psammead-visually-hidden-text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var StyledSpan = (0, _base.default)("span", process.env.NODE_ENV === "production" ? {
  target: "effkio50"
} : {
  target: "effkio50",
  label: "StyledSpan"
})(function (_ref) {
  var service = _ref.service;
  return (0, _fontStyles.getSansBold)(service);
}, " color:", _colours.C_POSTBOX, ";display:inline-block;", function (_ref2) {
  var dir = _ref2.dir;
  return dir === 'rtl' ? "margin-left: ".concat(_spacings.GEL_SPACING, ";") : "margin-right: ".concat(_spacings.GEL_SPACING, ";");
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUThCIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgbm9kZSwgYm9vbCwgc3RyaW5nLCBvbmVPZiB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U2Fuc0JvbGQgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5pbXBvcnQgeyBDX1BPU1RCT1ggfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcbmltcG9ydCB7IEdFTF9TUEFDSU5HIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvc3BhY2luZ3MnO1xuaW1wb3J0IFZpc3VhbGx5SGlkZGVuVGV4dCBmcm9tICdAYmJjL3BzYW1tZWFkLXZpc3VhbGx5LWhpZGRlbi10ZXh0JztcblxuY29uc3QgU3R5bGVkU3BhbiA9IHN0eWxlZC5zcGFuYFxuICAkeyh7IHNlcnZpY2UgfSkgPT4gZ2V0U2Fuc0JvbGQoc2VydmljZSl9XG4gIGNvbG9yOiAke0NfUE9TVEJPWH07XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgJHsoeyBkaXIgfSkgPT5cbiAgICBkaXIgPT09ICdydGwnXG4gICAgICA/IGBtYXJnaW4tbGVmdDogJHtHRUxfU1BBQ0lOR307YFxuICAgICAgOiBgbWFyZ2luLXJpZ2h0OiAke0dFTF9TUEFDSU5HfTtgfVxuYDtcblxuY29uc3QgTGl2ZUxhYmVsID0gKHtcbiAgc2VydmljZSxcbiAgZGlyLFxuICBhcmlhSGlkZGVuLFxuICBsaXZlVGV4dCxcbiAgb2ZmU2NyZWVuVGV4dCxcbiAgbGFuZyxcbiAgY2hpbGRyZW4sXG59KSA9PiAoXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9hcmlhLXJvbGVcbiAgPHNwYW4gcm9sZT1cInRleHRcIj5cbiAgICA8U3R5bGVkU3BhblxuICAgICAgc2VydmljZT17c2VydmljZX1cbiAgICAgIGRpcj17ZGlyfVxuICAgICAgey4uLihhcmlhSGlkZGVuICYmIHsgJ2FyaWEtaGlkZGVuJzogJ3RydWUnIH0pfVxuICAgID5cbiAgICAgIHtgJHtsaXZlVGV4dH0gYH1cbiAgICA8L1N0eWxlZFNwYW4+XG4gICAge29mZlNjcmVlblRleHQgJiYgKFxuICAgICAgPFZpc3VhbGx5SGlkZGVuVGV4dCBsYW5nPXtsYW5nfT5cbiAgICAgICAge2Ake29mZlNjcmVlblRleHR9LCBgfVxuICAgICAgPC9WaXN1YWxseUhpZGRlblRleHQ+XG4gICAgKX1cbiAgICB7Y2hpbGRyZW59XG4gIDwvc3Bhbj5cbik7XG5cbkxpdmVMYWJlbC5wcm9wVHlwZXMgPSB7XG4gIHNlcnZpY2U6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBkaXI6IG9uZU9mKFsncnRsJywgJ2x0ciddKSxcbiAgYXJpYUhpZGRlbjogYm9vbCxcbiAgbGl2ZVRleHQ6IHN0cmluZyxcbiAgb2ZmU2NyZWVuVGV4dDogc3RyaW5nLFxuICBsYW5nOiBzdHJpbmcsXG4gIGNoaWxkcmVuOiBub2RlLFxufTtcblxuTGl2ZUxhYmVsLmRlZmF1bHRQcm9wcyA9IHtcbiAgZGlyOiAnbHRyJyxcbiAgYXJpYUhpZGRlbjogZmFsc2UsXG4gIGxpdmVUZXh0OiAnTElWRScsXG4gIG9mZlNjcmVlblRleHQ6IG51bGwsXG4gIGxhbmc6ICdlbi1HQicsXG4gIGNoaWxkcmVuOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGl2ZUxhYmVsO1xuIl19 */"));

var LiveLabel = function LiveLabel(_ref3) {
  var service = _ref3.service,
      dir = _ref3.dir,
      ariaHidden = _ref3.ariaHidden,
      liveText = _ref3.liveText,
      offScreenText = _ref3.offScreenText,
      lang = _ref3.lang,
      children = _ref3.children;
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/aria-role
    _react.default.createElement("span", {
      role: "text"
    }, /*#__PURE__*/_react.default.createElement(StyledSpan, _extends({
      service: service,
      dir: dir
    }, ariaHidden && {
      'aria-hidden': 'true'
    }), "".concat(liveText, " ")), offScreenText && /*#__PURE__*/_react.default.createElement(_psammeadVisuallyHiddenText.default, {
      lang: lang
    }, "".concat(offScreenText, ", ")), children)
  );
};

LiveLabel.propTypes = {
  service: _propTypes.string.isRequired,
  dir: (0, _propTypes.oneOf)(['rtl', 'ltr']),
  ariaHidden: _propTypes.bool,
  liveText: _propTypes.string,
  offScreenText: _propTypes.string,
  lang: _propTypes.string,
  children: _propTypes.node
};
LiveLabel.defaultProps = {
  dir: 'ltr',
  ariaHidden: false,
  liveText: 'LIVE',
  offScreenText: null,
  lang: 'en-GB',
  children: null
};
var _default = LiveLabel;
exports.default = _default;