function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

/* eslint react/prop-types: 0 */
import React from 'react';
import { bool } from 'prop-types';
import { C_LUNAR, C_SHADOW } from '#legacy/psammead-styles/colours';
import { BBC_BLOCKS, BBC_BLOCKS_DARK_MODE } from '#legacy/psammead-assets/svgs';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/breakpoints';
var bgImageDark = 'data:image/svg+xml;base64,'.concat(BBC_BLOCKS_DARK_MODE);
var bgImageRegular = 'data:image/svg+xml;base64,'.concat(BBC_BLOCKS);

var AmpImgPlaceholderContainer = function AmpImgPlaceholderContainer(_ref) {
  var darkMode = _ref.darkMode,
    fallback = _ref.fallback,
    placeholder = _ref.placeholder,
    children = _ref.children;
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      style: {
        backgroundColor: ''.concat(darkMode ? C_SHADOW : C_LUNAR),
      },
      fallback: fallback,
      placeholder: placeholder,
    },
    children,
  );
};

var AmpImgPlaceholder = function AmpImgPlaceholder(props) {
  return /*#__PURE__*/ React.createElement(
    'amp-img',
    _extends(
      {
        style: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      },
      props,
    ),
  );
};

var AmpImgMediaQueries = function AmpImgMediaQueries(_ref2) {
  var darkMode = _ref2.darkMode;
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(AmpImgPlaceholder, {
      media: '(max-width: '.concat(GEL_GROUP_1_SCREEN_WIDTH_MAX, ')'),
      width: '60px',
      height: '17px',
      src: darkMode ? bgImageDark : bgImageRegular,
    }),
    /*#__PURE__*/ React.createElement(AmpImgPlaceholder, {
      media: '(min-width: '
        .concat(GEL_GROUP_2_SCREEN_WIDTH_MIN, ') and (max-width: ')
        .concat(GEL_GROUP_3_SCREEN_WIDTH_MAX, ')'),
      width: '77px',
      height: '22px',
      src: darkMode ? bgImageDark : bgImageRegular,
    }),
    /*#__PURE__*/ React.createElement(AmpImgPlaceholder, {
      media: '(min-width: '.concat(GEL_GROUP_4_SCREEN_WIDTH_MIN, ')'),
      width: '93px',
      height: '27px',
      src: darkMode ? bgImageDark : bgImageRegular,
    }),
  );
};

var ImagePlaceholderAmp = function ImagePlaceholderAmp(_ref3) {
  var darkMode = _ref3.darkMode;
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    /*#__PURE__*/ React.createElement(
      AmpImgPlaceholderContainer,
      {
        darkMode: darkMode,
        placeholder: '',
      },
      /*#__PURE__*/ React.createElement(AmpImgMediaQueries, {
        darkMode: darkMode,
      }),
    ),
    /*#__PURE__*/ React.createElement(
      AmpImgPlaceholderContainer,
      {
        darkMode: darkMode,
        fallback: '',
      },
      /*#__PURE__*/ React.createElement(AmpImgMediaQueries, {
        darkMode: darkMode,
      }),
    ),
  );
};

ImagePlaceholderAmp.propTypes = {
  darkMode: bool,
};
ImagePlaceholderAmp.defaultProps = {
  darkMode: false,
};
export default ImagePlaceholderAmp;
