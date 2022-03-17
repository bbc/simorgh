"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _colours = require("@bbc/psammead-styles/colours");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

var _spacings = require("@bbc/gel-foundations/spacings");

var _typography = require("@bbc/gel-foundations/typography");

var _utilities = require("../utilities");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BORDER_WEIGHT = '0.0625rem';
var Wrapper = (0, _base.default)("div", process.env.NODE_ENV === "production" ? {
  target: "e1o9bgab0"
} : {
  target: "e1o9bgab0",
  label: "Wrapper"
})(function (_ref) {
  var service = _ref.service;
  return (0, _fontStyles.getSansRegular)(service);
}, " ", _typography.GEL_BODY_COPY, " border:", BORDER_WEIGHT, " solid ", _colours.C_PEBBLE, ";border-radius:", _spacings.GEL_SPACING, ";color:", _colours.C_SHADOW, ";padding:", _spacings.GEL_SPACING_DBL, ";p{margin-top:0;margin-bottom:", _spacings.GEL_SPACING, ";}a,small{display:block;}a{", function (_ref2) {
  var service = _ref2.service;
  return (0, _fontStyles.getSansBold)(service);
}, " color:", _colours.C_EBON, ";text-decoration:none;&:visited{color:", _colours.C_METAL, ";}&:hover,&:focus{text-decoration:underline;}}small{margin-top:", _spacings.GEL_SPACING, ";", _typography.GEL_MINION, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ob3RpY2UvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlCMEIiLCJmaWxlIjoiLi4vLi4vc3JjL05vdGljZS9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgbWVtbyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHN0cmluZyB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHtcbiAgQ19QRUJCTEUsXG4gIENfTUVUQUwsXG4gIENfRUJPTixcbiAgQ19TSEFET1csXG59IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIsIGdldFNhbnNCb2xkIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvZm9udC1zdHlsZXMnO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkdfREJMLCBHRUxfU1BBQ0lORyB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcbmltcG9ydCB7IEdFTF9CT0RZX0NPUFksIEdFTF9NSU5JT04gfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy90eXBvZ3JhcGh5JztcblxuaW1wb3J0IHsgZGV0b2tlbmlzZSwgZGljdGlvbmFyeUZhY3RvcnkgfSBmcm9tICcuLi91dGlsaXRpZXMnO1xuXG5jb25zdCBCT1JERVJfV0VJR0hUID0gJzAuMDYyNXJlbSc7XG5cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICAkeyh7IHNlcnZpY2UgfSkgPT4gZ2V0U2Fuc1JlZ3VsYXIoc2VydmljZSl9XG4gICR7R0VMX0JPRFlfQ09QWX1cbiAgYm9yZGVyOiAke0JPUkRFUl9XRUlHSFR9IHNvbGlkICR7Q19QRUJCTEV9O1xuICBib3JkZXItcmFkaXVzOiAke0dFTF9TUEFDSU5HfTtcbiAgY29sb3I6ICR7Q19TSEFET1d9O1xuICBwYWRkaW5nOiAke0dFTF9TUEFDSU5HX0RCTH07XG5cbiAgcCB7XG4gICAgbWFyZ2luLXRvcDogMDtcbiAgICBtYXJnaW4tYm90dG9tOiAke0dFTF9TUEFDSU5HfTtcbiAgfVxuXG4gIGEsXG4gIHNtYWxsIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuXG4gIGEge1xuICAgICR7KHsgc2VydmljZSB9KSA9PiBnZXRTYW5zQm9sZChzZXJ2aWNlKX1cbiAgICBjb2xvcjogJHtDX0VCT059O1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblxuICAgICY6dmlzaXRlZCB7XG4gICAgICBjb2xvcjogJHtDX01FVEFMfTtcbiAgICB9XG5cbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMge1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgfVxuICB9XG5cbiAgc21hbGwge1xuICAgIG1hcmdpbi10b3A6ICR7R0VMX1NQQUNJTkd9O1xuICAgICR7R0VMX01JTklPTn1cbiAgfVxuYDtcblxuY29uc3QgTm90aWNlID0gKHtcbiAgcHJvdmlkZXIsXG4gIHNlcnZpY2UsXG4gIHRleHQsXG4gIGxpbmtUZXh0LFxuICBsaW5rVGV4dFN1ZmZpeFZpc3VhbGx5SGlkZGVuLFxuICBsaW5rSHJlZixcbiAgd2FybmluZ1RleHQsXG59KSA9PiB7XG4gIGNvbnN0IGRpY3Rpb25hcnkgPSBkaWN0aW9uYXJ5RmFjdG9yeSh7IHByb3ZpZGVyIH0pO1xuICBjb25zdCBbZGV0b2tlbmlzZWRMaW5rVGV4dCwgZGV0b2tlbmlzZWRMaW5rVGV4dFN1ZmZpeF0gPSBbXG4gICAgZGV0b2tlbmlzZShsaW5rVGV4dCwgZGljdGlvbmFyeSksXG4gICAgZGV0b2tlbmlzZShsaW5rVGV4dFN1ZmZpeFZpc3VhbGx5SGlkZGVuLCBkaWN0aW9uYXJ5KSxcbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxXcmFwcGVyIHNlcnZpY2U9e3NlcnZpY2V9PlxuICAgICAgPHA+e2RldG9rZW5pc2UodGV4dCwgZGljdGlvbmFyeSl9PC9wPlxuICAgICAgPGFcbiAgICAgICAgaHJlZj17bGlua0hyZWZ9XG4gICAgICAgIGFyaWEtbGFiZWw9e1xuICAgICAgICAgIGRldG9rZW5pc2VkTGlua1RleHRTdWZmaXggJiZcbiAgICAgICAgICBgJHtkZXRva2VuaXNlZExpbmtUZXh0fSR7ZGV0b2tlbmlzZWRMaW5rVGV4dFN1ZmZpeH1gXG4gICAgICAgIH1cbiAgICAgID5cbiAgICAgICAge2RldG9rZW5pc2VkTGlua1RleHR9XG4gICAgICA8L2E+XG4gICAgICB7d2FybmluZ1RleHQgJiYgPHNtYWxsPnt3YXJuaW5nVGV4dH08L3NtYWxsPn1cbiAgICA8L1dyYXBwZXI+XG4gICk7XG59O1xuXG5Ob3RpY2UuZGVmYXVsdFByb3BzID0ge1xuICBsaW5rVGV4dFN1ZmZpeFZpc3VhbGx5SGlkZGVuOiBudWxsLFxuICB3YXJuaW5nVGV4dDogbnVsbCxcbn07XG5cbk5vdGljZS5wcm9wVHlwZXMgPSB7XG4gIHByb3ZpZGVyOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgc2VydmljZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRleHQ6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBsaW5rVGV4dDogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGxpbmtUZXh0U3VmZml4VmlzdWFsbHlIaWRkZW46IHN0cmluZyxcbiAgbGlua0hyZWY6IHN0cmluZy5pc1JlcXVpcmVkLFxuICB3YXJuaW5nVGV4dDogc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWVtbyhOb3RpY2UpO1xuIl19 */"));

var Notice = function Notice(_ref3) {
  var provider = _ref3.provider,
      service = _ref3.service,
      text = _ref3.text,
      linkText = _ref3.linkText,
      linkTextSuffixVisuallyHidden = _ref3.linkTextSuffixVisuallyHidden,
      linkHref = _ref3.linkHref,
      warningText = _ref3.warningText;
  var dictionary = (0, _utilities.dictionaryFactory)({
    provider: provider
  });
  var _ref4 = [(0, _utilities.detokenise)(linkText, dictionary), (0, _utilities.detokenise)(linkTextSuffixVisuallyHidden, dictionary)],
      detokenisedLinkText = _ref4[0],
      detokenisedLinkTextSuffix = _ref4[1];
  return /*#__PURE__*/_react.default.createElement(Wrapper, {
    service: service
  }, /*#__PURE__*/_react.default.createElement("p", null, (0, _utilities.detokenise)(text, dictionary)), /*#__PURE__*/_react.default.createElement("a", {
    href: linkHref,
    "aria-label": detokenisedLinkTextSuffix && "".concat(detokenisedLinkText).concat(detokenisedLinkTextSuffix)
  }, detokenisedLinkText), warningText && /*#__PURE__*/_react.default.createElement("small", null, warningText));
};

Notice.defaultProps = {
  linkTextSuffixVisuallyHidden: null,
  warningText: null
};
Notice.propTypes = {
  provider: _propTypes.string.isRequired,
  service: _propTypes.string.isRequired,
  text: _propTypes.string.isRequired,
  linkText: _propTypes.string.isRequired,
  linkTextSuffixVisuallyHidden: _propTypes.string,
  linkHref: _propTypes.string.isRequired,
  warningText: _propTypes.string
};

var _default = /*#__PURE__*/(0, _react.memo)(Notice);

exports.default = _default;