function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { custom, landscape, portrait, square } from './fixtureData';

var snapshotTests = function snapshotTests(Component, additionalProps) {
  shouldMatchSnapshot('should render landscape image correctly', /*#__PURE__*/React.createElement(Component, _extends({
    alt: landscape.alt,
    attribution: landscape.attribution,
    sizes: landscape.sizes,
    src: landscape.src,
    height: landscape.height,
    width: landscape.width
  }, additionalProps)));
  shouldMatchSnapshot('should render portrait image correctly', /*#__PURE__*/React.createElement(Component, _extends({
    alt: portrait.alt,
    attribution: portrait.attribution,
    sizes: portrait.sizes,
    src: portrait.src,
    height: portrait.height,
    width: portrait.width
  }, additionalProps)));
  shouldMatchSnapshot('should render square image correctly', /*#__PURE__*/React.createElement(Component, _extends({
    alt: square.alt,
    attribution: square.attribution,
    sizes: square.sizes,
    src: square.src,
    height: square.height,
    width: square.width
  }, additionalProps)));
  shouldMatchSnapshot('should render image with custom dimensions correctly', /*#__PURE__*/React.createElement(Component, _extends({
    alt: custom.alt,
    attribution: custom.attribution,
    sizes: custom.sizes,
    src: custom.src,
    height: custom.height,
    width: custom.width
  }, additionalProps)));
  shouldMatchSnapshot('should render image with srcset correctly', /*#__PURE__*/React.createElement(Component, _extends({
    alt: landscape.alt,
    attribution: landscape.attribution,
    sizes: landscape.sizes,
    src: landscape.src,
    srcset: landscape.srcset,
    height: landscape.height,
    width: landscape.width
  }, additionalProps)));
};

export default snapshotTests;