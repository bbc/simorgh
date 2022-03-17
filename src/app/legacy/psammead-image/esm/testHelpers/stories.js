function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import notes from '../../README.md';
import { custom, landscape, portrait, square } from './fixtureData';
export function getProps(image, includeHeight, type) {
  var props = {
    alt: image.alt,
    sizes: image.sizes,
    src: image.src,
    srcset: image.srcset,
    width: image.width,
    fade: type === 'Img' ? boolean('Fade', false) : null
  };
  props.height = includeHeight ? image.height : null;
  return props;
}
export var stories = function stories(Component, title) {
  var includeHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var additionalProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var styleDecorator = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (storyFn) {
    return storyFn();
  };
  var type = arguments.length > 5 ? arguments[5] : undefined;
  return storiesOf(title, module).addDecorator(styleDecorator).add('landscape image', function () {
    return /*#__PURE__*/React.createElement(Component, _extends({}, getProps(landscape, includeHeight, type), additionalProps));
  }, {
    notes: notes
  }).add('portrait image', function () {
    return /*#__PURE__*/React.createElement(Component, _extends({}, getProps(portrait, includeHeight, type), additionalProps));
  }, {
    notes: notes
  }).add('square image', function () {
    return /*#__PURE__*/React.createElement(Component, _extends({}, getProps(square, includeHeight, type), additionalProps));
  }, {
    notes: notes
  }).add('custom ratio image', function () {
    return /*#__PURE__*/React.createElement(Component, _extends({}, getProps(custom, includeHeight, type), additionalProps));
  }, {
    notes: notes
  }).add('image with srcset', function () {
    return /*#__PURE__*/React.createElement(Component, _extends({}, getProps(landscape, includeHeight, type), {
      srcset: landscape.srcset
    }, additionalProps));
  }, {
    notes: notes
  });
};