"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _psammeadInlineLink = _interopRequireDefault(require("@bbc/psammead-inline-link"));

var _psammeadStorybookHelpers = require("@bbc/psammead-storybook-helpers");

var _README = _interopRequireDefault(require("../README.md"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/prop-types */
(0, _react2.storiesOf)('Components/Paragraph', module).addDecorator(_addonKnobs.withKnobs).addDecorator((0, _psammeadStorybookHelpers.withServicesKnob)()).add('default', function (_ref) {
  var text = _ref.text,
      script = _ref.script,
      service = _ref.service;
  return /*#__PURE__*/_react.default.createElement(_index.default, {
    script: script,
    service: service
  }, text);
}, {
  notes: _README.default,
  knobs: {
    escapeHTML: false
  }
}).add('dark mode', function (_ref2) {
  var text = _ref2.text,
      script = _ref2.script,
      service = _ref2.service;
  return /*#__PURE__*/_react.default.createElement(_index.default, {
    script: script,
    service: service,
    darkMode: true
  }, text);
}, {
  notes: _README.default,
  knobs: {
    escapeHTML: false
  },
  options: {
    theme: _psammeadStorybookHelpers.themes.dark
  }
}).add('containing an inline link', function (_ref3) {
  var text = _ref3.text,
      script = _ref3.script,
      service = _ref3.service;
  return /*#__PURE__*/_react.default.createElement(_index.default, {
    script: script,
    service: service
  }, "".concat(text, " "), /*#__PURE__*/_react.default.createElement(_psammeadInlineLink.default, {
    href: "https://www.bbc.com"
  }, text), " ".concat(text));
}, {
  notes: _README.default,
  knobs: {
    escapeHTML: false
  }
});