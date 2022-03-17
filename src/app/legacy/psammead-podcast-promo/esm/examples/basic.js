function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { string } from 'prop-types';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import serviceData from './fixtureData';
import PodcastPromo from '..';

var BasicExample = function BasicExample(props) {
  var service = props.service;

  if (service !== 'russian' && service !== 'news') {
    service = 'news';
  }

  return /*#__PURE__*/React.createElement(PodcastPromo, _extends({}, props, {
    role: "region",
    "aria-labelledby": "some-id"
  }), /*#__PURE__*/React.createElement(PodcastPromo.Title, {
    id: "some-id"
  }, serviceData[service].podcastPromoTitle), /*#__PURE__*/React.createElement(PodcastPromo.Card, null, /*#__PURE__*/React.createElement(PodcastPromo.Card.ImageWrapper, null, /*#__PURE__*/React.createElement(ImagePlaceholder, {
    ratio: 100
  }, /*#__PURE__*/React.createElement("img", {
    src: serviceData[service].image.src,
    alt: serviceData[service].image.alt,
    width: "100%"
  }))), /*#__PURE__*/React.createElement(PodcastPromo.Card.Content, null, /*#__PURE__*/React.createElement(PodcastPromo.Card.Title, null, /*#__PURE__*/React.createElement(PodcastPromo.Card.Link, {
    href: serviceData[service].linkLabel.href
  }, /*#__PURE__*/React.createElement("span", {
    className: "podcast-promo--hover podcast-promo--focus podcast-promo--visited"
  }, serviceData[service].brandTitle))), /*#__PURE__*/React.createElement(PodcastPromo.Card.Description, null, serviceData[service].brandDescription), /*#__PURE__*/React.createElement(PodcastPromo.Card.EpisodesText, null, serviceData[service].linkLabel.text))));
};

BasicExample.propTypes = {
  service: string.isRequired
};
export default BasicExample;