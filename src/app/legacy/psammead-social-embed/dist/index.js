"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmpSocialEmbed = exports.CanonicalSocialEmbed = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _SkipLinkWrapper = _interopRequireDefault(require("./SkipLinkWrapper"));

var _CaptionWrapper = _interopRequireDefault(require("./CaptionWrapper"));

var _Notice = _interopRequireDefault(require("./Notice"));

var _Canonical = _interopRequireWildcard(require("./Canonical"));

var _Amp = _interopRequireDefault(require("./Amp"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Returns a social embed or fallback component for use on Canonical pages.
 * @param {Object} props
 */
var CanonicalSocialEmbed = function CanonicalSocialEmbed(_ref) {
  var provider = _ref.provider,
      service = _ref.service,
      skipLink = _ref.skipLink,
      oEmbed = _ref.oEmbed,
      caption = _ref.caption,
      fallback = _ref.fallback,
      onRender = _ref.onRender;
  var isSupportedProvider = Object.keys(_Canonical.providers).includes(provider);
  var hasCaption = caption && caption.text;
  if (!isSupportedProvider || !oEmbed) return /*#__PURE__*/_react.default.createElement(_SkipLinkWrapper.default, _extends({
    service: service,
    provider: provider
  }, skipLink), /*#__PURE__*/_react.default.createElement(_Notice.default, _extends({
    service: service,
    provider: provider
  }, fallback)));
  return /*#__PURE__*/_react.default.createElement(_SkipLinkWrapper.default, _extends({
    service: service,
    provider: provider
  }, skipLink), hasCaption ? /*#__PURE__*/_react.default.createElement(_CaptionWrapper.default, _extends({
    service: service
  }, caption), /*#__PURE__*/_react.default.createElement(_Canonical.default, {
    provider: provider,
    oEmbed: oEmbed,
    onRender: onRender
  })) : /*#__PURE__*/_react.default.createElement(_Canonical.default, {
    provider: provider,
    oEmbed: oEmbed,
    onRender: onRender
  }));
};
/**
 * Returns a social embed or fallback component for use on AMP pages.
 * @param {Object} props
 */


exports.CanonicalSocialEmbed = CanonicalSocialEmbed;

var AmpSocialEmbed = function AmpSocialEmbed(_ref2) {
  var provider = _ref2.provider,
      service = _ref2.service,
      skipLink = _ref2.skipLink,
      id = _ref2.id,
      caption = _ref2.caption,
      fallback = _ref2.fallback;
  var AmpElement = _Amp.default[provider];
  var hasCaption = caption && caption.text;
  if (!AmpElement) return /*#__PURE__*/_react.default.createElement(_SkipLinkWrapper.default, _extends({
    service: service,
    provider: provider
  }, skipLink), /*#__PURE__*/_react.default.createElement(_Notice.default, _extends({
    service: service,
    provider: provider
  }, fallback)));
  return /*#__PURE__*/_react.default.createElement(_SkipLinkWrapper.default, _extends({
    service: service,
    provider: provider
  }, skipLink), hasCaption ? /*#__PURE__*/_react.default.createElement(_CaptionWrapper.default, _extends({
    service: service
  }, caption), /*#__PURE__*/_react.default.createElement(AmpElement, {
    id: id
  })) : /*#__PURE__*/_react.default.createElement(AmpElement, {
    id: id
  }));
};

exports.AmpSocialEmbed = AmpSocialEmbed;
var sharedPropTypes = {
  provider: _propTypes.string.isRequired,
  service: _propTypes.string.isRequired,
  skipLink: (0, _propTypes.shape)({
    text: _propTypes.string.isRequired,
    endTextId: _propTypes.string.isRequired,
    endTextVisuallyHidden: _propTypes.string.isRequired
  }).isRequired,
  caption: (0, _propTypes.shape)({
    textPrefixVisuallyHidden: _propTypes.string,
    text: _propTypes.string.isRequired
  }),
  fallback: (0, _propTypes.shape)({
    text: _propTypes.string.isRequired,
    linkText: _propTypes.string.isRequired,
    linkTextSuffixVisuallyHidden: _propTypes.string,
    linkHref: _propTypes.string.isRequired,
    warningText: _propTypes.string
  }).isRequired
};
CanonicalSocialEmbed.defaultProps = {
  oEmbed: null,
  onRender: null
};
CanonicalSocialEmbed.propTypes = _objectSpread(_objectSpread({}, sharedPropTypes), {}, {
  oEmbed: (0, _propTypes.shape)({
    html: _propTypes.string.isRequired
  }),
  onRender: _propTypes.func
});
AmpSocialEmbed.propTypes = _objectSpread(_objectSpread({}, sharedPropTypes), {}, {
  id: _propTypes.string.isRequired
});