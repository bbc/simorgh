"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemWrapperArray = exports.getItems = exports.getItem = exports.getServiceVariant = void 0;

var _react = _interopRequireDefault(require("react"));

var _psammeadStorybookHelpers = require("@bbc/psammead-storybook-helpers");

var _scripts = require("@bbc/gel-foundations/scripts");

var _psammeadTimestamp = _interopRequireDefault(require("@bbc/psammead-timestamp"));

var _Item = require("../Item");

var _Rank = _interopRequireDefault(require("../Rank"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/prop-types */
var lastUpdated = function lastUpdated(_ref) {
  var script = _ref.script,
      service = _ref.service;
  return (// This will return the provided english translations
    _react.default.createElement(_psammeadTimestamp.default, {
      datetime: "2019-03-01T14:00+00:00",
      script: script,
      padding: false,
      service: service
    }, "Last updated: 5th November 2016")
  );
};

var getServiceVariant = function getServiceVariant(_ref2) {
  var service = _ref2.service,
      _ref2$variant = _ref2.variant,
      variant = _ref2$variant === void 0 ? '' : _ref2$variant;

  if (variant !== 'default') {
    var variantOverride = variant.charAt(0).toUpperCase() + variant.substring(1);
    return service + variantOverride;
  }

  return service;
};

exports.getServiceVariant = getServiceVariant;

var getItem = function getItem(_ref3) {
  var service = _ref3.service,
      _ref3$withTimestamp = _ref3.withTimestamp,
      withTimestamp = _ref3$withTimestamp === void 0 ? false : _ref3$withTimestamp;
  var baseUrl = 'https://www.bbc.com';
  var _TEXT_VARIANTS$servic = _psammeadStorybookHelpers.TEXT_VARIANTS[service],
      text = _TEXT_VARIANTS$servic.text,
      articlePath = _TEXT_VARIANTS$servic.articlePath;
  var timestamp = withTimestamp ? lastUpdated({
    script: _scripts.latin,
    service: service
  }) : null;
  return {
    id: "".concat(Math.floor(Math.random() * 100000) + 1),
    title: text,
    href: "".concat(baseUrl).concat(articlePath),
    timestamp: timestamp
  };
};

exports.getItem = getItem;

var getItems = function getItems(_ref4) {
  var _ref4$service = _ref4.service,
      service = _ref4$service === void 0 ? 'news' : _ref4$service,
      arraySize = _ref4.arraySize,
      withTimestamp = _ref4.withTimestamp;
  return Array.from({
    length: arraySize
  }, function () {
    return getItem({
      service: service,
      withTimestamp: withTimestamp
    });
  });
};

exports.getItems = getItems;

var getItemWrapperArray = function getItemWrapperArray(_ref5) {
  var numberOfItems = _ref5.numberOfItems,
      service = _ref5.service,
      script = _ref5.script,
      dir = _ref5.dir;
  var itemWrapperArray = [];
  var item = getItem({
    service: service
  });

  for (var i = 1; i <= numberOfItems; i += 1) {
    itemWrapperArray.push(_react.default.createElement(_Item.MostReadItemWrapper, {
      dir: dir,
      key: i
    }, _react.default.createElement(_Rank.default, {
      service: service,
      script: script,
      listIndex: i,
      numberOfItems: numberOfItems,
      dir: dir
    }), _react.default.createElement(_Item.MostReadLink, {
      dir: dir,
      href: item.href,
      service: service,
      script: script,
      title: item.title
    })));
  }

  return itemWrapperArray;
};

exports.getItemWrapperArray = getItemWrapperArray;