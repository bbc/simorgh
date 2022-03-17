"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _psammeadImagePlaceholder = _interopRequireDefault(require("@bbc/psammead-image-placeholder"));

var _fixtureData = _interopRequireDefault(require("./fixtureData"));

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var BasicExample = function BasicExample(props) {
  var service = props.service;

  if (service !== 'russian' && service !== 'news') {
    service = 'news';
  }

  return /*#__PURE__*/_react.default.createElement(_.default, _extends({}, props, {
    role: "region",
    "aria-labelledby": "some-id"
  }), /*#__PURE__*/_react.default.createElement(_.default.Title, {
    id: "some-id"
  }, _fixtureData.default[service].podcastPromoTitle), /*#__PURE__*/_react.default.createElement(_.default.Card, null, /*#__PURE__*/_react.default.createElement(_.default.Card.ImageWrapper, null, /*#__PURE__*/_react.default.createElement(_psammeadImagePlaceholder.default, {
    ratio: 100
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _fixtureData.default[service].image.src,
    alt: _fixtureData.default[service].image.alt,
    width: "100%"
  }))), /*#__PURE__*/_react.default.createElement(_.default.Card.Content, null, /*#__PURE__*/_react.default.createElement(_.default.Card.Title, null, /*#__PURE__*/_react.default.createElement(_.default.Card.Link, {
    href: _fixtureData.default[service].linkLabel.href
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "podcast-promo--hover podcast-promo--focus podcast-promo--visited"
  }, _fixtureData.default[service].brandTitle))), /*#__PURE__*/_react.default.createElement(_.default.Card.Description, null, _fixtureData.default[service].brandDescription), /*#__PURE__*/_react.default.createElement(_.default.Card.EpisodesText, null, _fixtureData.default[service].linkLabel.text))));
};

BasicExample.propTypes = {
  service: _propTypes.string.isRequired
};
var _default = BasicExample;
exports.default = _default;