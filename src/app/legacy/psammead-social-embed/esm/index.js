function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shape, string, func } from 'prop-types';
import SkipLinkWrapper from './SkipLinkWrapper';
import CaptionWrapper from './CaptionWrapper';
import Notice from './Notice';
import CanonicalEmbed, { providers } from './Canonical';
import AmpElements from './Amp';
/**
 * Returns a social embed or fallback component for use on Canonical pages.
 * @param {Object} props
 */

export var CanonicalSocialEmbed = function CanonicalSocialEmbed(_ref) {
  var provider = _ref.provider,
      service = _ref.service,
      skipLink = _ref.skipLink,
      oEmbed = _ref.oEmbed,
      caption = _ref.caption,
      fallback = _ref.fallback,
      onRender = _ref.onRender;
  var isSupportedProvider = Object.keys(providers).includes(provider);
  var hasCaption = caption && caption.text;
  if (!isSupportedProvider || !oEmbed) return /*#__PURE__*/React.createElement(SkipLinkWrapper, _extends({
    service: service,
    provider: provider
  }, skipLink), /*#__PURE__*/React.createElement(Notice, _extends({
    service: service,
    provider: provider
  }, fallback)));
  return /*#__PURE__*/React.createElement(SkipLinkWrapper, _extends({
    service: service,
    provider: provider
  }, skipLink), hasCaption ? /*#__PURE__*/React.createElement(CaptionWrapper, _extends({
    service: service
  }, caption), /*#__PURE__*/React.createElement(CanonicalEmbed, {
    provider: provider,
    oEmbed: oEmbed,
    onRender: onRender
  })) : /*#__PURE__*/React.createElement(CanonicalEmbed, {
    provider: provider,
    oEmbed: oEmbed,
    onRender: onRender
  }));
};
/**
 * Returns a social embed or fallback component for use on AMP pages.
 * @param {Object} props
 */

export var AmpSocialEmbed = function AmpSocialEmbed(_ref2) {
  var provider = _ref2.provider,
      service = _ref2.service,
      skipLink = _ref2.skipLink,
      id = _ref2.id,
      caption = _ref2.caption,
      fallback = _ref2.fallback;
  var AmpElement = AmpElements[provider];
  var hasCaption = caption && caption.text;
  if (!AmpElement) return /*#__PURE__*/React.createElement(SkipLinkWrapper, _extends({
    service: service,
    provider: provider
  }, skipLink), /*#__PURE__*/React.createElement(Notice, _extends({
    service: service,
    provider: provider
  }, fallback)));
  return /*#__PURE__*/React.createElement(SkipLinkWrapper, _extends({
    service: service,
    provider: provider
  }, skipLink), hasCaption ? /*#__PURE__*/React.createElement(CaptionWrapper, _extends({
    service: service
  }, caption), /*#__PURE__*/React.createElement(AmpElement, {
    id: id
  })) : /*#__PURE__*/React.createElement(AmpElement, {
    id: id
  }));
};
var sharedPropTypes = {
  provider: string.isRequired,
  service: string.isRequired,
  skipLink: shape({
    text: string.isRequired,
    endTextId: string.isRequired,
    endTextVisuallyHidden: string.isRequired
  }).isRequired,
  caption: shape({
    textPrefixVisuallyHidden: string,
    text: string.isRequired
  }),
  fallback: shape({
    text: string.isRequired,
    linkText: string.isRequired,
    linkTextSuffixVisuallyHidden: string,
    linkHref: string.isRequired,
    warningText: string
  }).isRequired
};
CanonicalSocialEmbed.defaultProps = {
  oEmbed: null,
  onRender: null
};
CanonicalSocialEmbed.propTypes = _objectSpread(_objectSpread({}, sharedPropTypes), {}, {
  oEmbed: shape({
    html: string.isRequired
  }),
  onRender: func
});
AmpSocialEmbed.propTypes = _objectSpread(_objectSpread({}, sharedPropTypes), {}, {
  id: string.isRequired
});