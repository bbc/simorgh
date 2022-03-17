var _excluded = ["srcset"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import omit from 'ramda/src/omit';
import { number, string } from 'prop-types'; // Prevents component outputting invalid HTML when styled with emotion

var omitInvalidProps = omit(['classname']);

var AmpImg = function AmpImg(props) {
  var srcset = props.srcset,
      otherProps = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/React.createElement("amp-img", _extends({
    srcSet: srcset
  }, omitInvalidProps(otherProps)));
};

AmpImg.propTypes = {
  alt: string.isRequired,
  attribution: string,
  height: number.isRequired,
  layout: string.isRequired,
  sizes: string,
  src: string.isRequired,
  srcset: string,
  width: number.isRequired
};
AmpImg.defaultProps = {
  attribution: '',
  sizes: null,
  srcset: null
};
export default AmpImg;