import React, { memo } from 'react';
import { string } from 'prop-types';
import { Helmet } from 'react-helmet';

var Instagram = function Instagram(_ref) {
  var id = _ref.id;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Helmet, null, /*#__PURE__*/React.createElement("script", {
    async: true,
    "custom-element": "amp-instagram",
    src: "https://cdn.ampproject.org/v0/amp-instagram-0.1.js"
  })), /*#__PURE__*/React.createElement("amp-instagram", {
    "data-captioned": true,
    "data-shortcode": id,
    height: "1",
    layout: "responsive",
    width: "1"
  }));
};

var Twitter = function Twitter(_ref2) {
  var id = _ref2.id;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Helmet, null, /*#__PURE__*/React.createElement("script", {
    async: true,
    "custom-element": "amp-twitter",
    src: "https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
  })), /*#__PURE__*/React.createElement("amp-twitter", {
    "data-tweetid": id,
    height: "9",
    layout: "responsive",
    width: "16"
  }));
};

var YouTube = function YouTube(_ref3) {
  var id = _ref3.id;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Helmet, null, /*#__PURE__*/React.createElement("script", {
    async: true,
    "custom-element": "amp-youtube",
    src: "https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
  })), /*#__PURE__*/React.createElement("amp-youtube", {
    "data-videoid": id,
    height: "9",
    layout: "responsive",
    width: "16"
  }));
};

var sharedPropTypes = {
  id: string.isRequired
};
Instagram.propTypes = sharedPropTypes;
Twitter.propTypes = sharedPropTypes;
YouTube.propTypes = sharedPropTypes;
export default {
  instagram: /*#__PURE__*/memo(Instagram),
  twitter: /*#__PURE__*/memo(Twitter),
  youtube: /*#__PURE__*/memo(YouTube)
};