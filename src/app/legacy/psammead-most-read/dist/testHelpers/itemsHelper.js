"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemPropTypes = exports.getItems = exports.getItem = void 0;

var _react = _interopRequireDefault(require("react"));

var _psammeadStorybookHelpers = require("@bbc/psammead-storybook-helpers");

var _scripts = require("@bbc/gel-foundations/scripts");

var _propTypes = require("prop-types");

var _psammeadTimestamp = _interopRequireDefault(require("@bbc/psammead-timestamp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lastUpdated = function lastUpdated(script, service) {
  return _react.default.createElement(_psammeadTimestamp.default, {
    datetime: "2019-03-01T14:00+00:00",
    script: script,
    padding: false,
    service: service
  }, "Last updated: 5th November 2016");
};

var getItem = function getItem(service) {
  var withTimestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var baseUrl = 'https://www.bbc.com';
  var _TEXT_VARIANTS$servic = _psammeadStorybookHelpers.TEXT_VARIANTS[service],
      text = _TEXT_VARIANTS$servic.text,
      articlePath = _TEXT_VARIANTS$servic.articlePath;
  var timestamp = withTimestamp ? lastUpdated(_scripts.latin, service) : null;
  return {
    id: Math.floor(Math.random() * 100000) + 1,
    title: text,
    href: "".concat(baseUrl).concat(articlePath),
    timestamp: timestamp
  };
};

exports.getItem = getItem;

var getItems = function getItems() {
  var service = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'news';
  var arraySize = arguments.length > 1 ? arguments[1] : undefined;
  return Array.from({
    length: arraySize
  }, function () {
    return getItem(service);
  });
};

exports.getItems = getItems;
var itemPropTypes = (0, _propTypes.shape)({
  id: _propTypes.string.isRequired,
  title: _propTypes.string.isRequired,
  href: _propTypes.string.isRequired,
  timestamp: _propTypes.node.isRequired
});
exports.itemPropTypes = itemPropTypes;