"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _omit = _interopRequireDefault(require("ramda/src/omit"));

var _propTypes = require("prop-types");

var _excluded = ["srcset"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// Prevents component outputting invalid HTML when styled with emotion
var omitInvalidProps = (0, _omit.default)(['classname']);

var AmpImg = function AmpImg(props) {
  var srcset = props.srcset,
      otherProps = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/_react.default.createElement("amp-img", _extends({
    srcSet: srcset
  }, omitInvalidProps(otherProps)));
};

AmpImg.propTypes = {
  alt: _propTypes.string.isRequired,
  attribution: _propTypes.string,
  height: _propTypes.number.isRequired,
  layout: _propTypes.string.isRequired,
  sizes: _propTypes.string,
  src: _propTypes.string.isRequired,
  srcset: _propTypes.string,
  width: _propTypes.number.isRequired
};
AmpImg.defaultProps = {
  attribution: '',
  sizes: null,
  srcset: null
};
var _default = AmpImg;
exports.default = _default;