import React from 'react';
import { string, number } from 'prop-types';
import { Helmet } from 'react-helmet';
import { AmpImg } from '@bbc/psammead-image';
import Message from '../Message';

var AmpHead = function AmpHead() {
  return /*#__PURE__*/React.createElement(Helmet, null, /*#__PURE__*/React.createElement("script", {
    async: true,
    "custom-element": "amp-iframe",
    src: "https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
  }));
};

var AmpMediaPlayer = function AmpMediaPlayer(_ref) {
  var src = _ref.src,
      placeholderSrc = _ref.placeholderSrc,
      placeholderSrcset = _ref.placeholderSrcset,
      title = _ref.title,
      height = _ref.height,
      width = _ref.width,
      noJsMessage = _ref.noJsMessage,
      service = _ref.service;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AmpHead, null), /*#__PURE__*/React.createElement("amp-iframe", {
    "data-e2e": "media-player",
    sandbox: "allow-scripts allow-same-origin",
    layout: "fill",
    scrolling: "no",
    frameborder: "0",
    src: src,
    title: title,
    allowfullscreen: "allowfullscreen"
  }, /*#__PURE__*/React.createElement(AmpImg, {
    "data-e2e": "media-player__placeholder",
    layout: "fill",
    src: placeholderSrc,
    srcset: placeholderSrcset,
    placeholder: true,
    alt: "",
    height: height,
    width: width
  }), /*#__PURE__*/React.createElement("noscript", null, /*#__PURE__*/React.createElement(Message, {
    service: service,
    message: noJsMessage,
    placeholderSrc: placeholderSrc,
    placeholderSrcset: placeholderSrcset
  }))));
};

AmpMediaPlayer.propTypes = {
  src: string.isRequired,
  placeholderSrc: string.isRequired,
  placeholderSrcset: string,
  title: string.isRequired,
  height: number.isRequired,
  width: number.isRequired,
  noJsMessage: string.isRequired,
  service: string.isRequired
};
AmpMediaPlayer.defaultProps = {
  placeholderSrcset: null
};
export default AmpMediaPlayer;