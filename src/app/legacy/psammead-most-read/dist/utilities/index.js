"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemWrapperArray = exports.getItem = void 0;

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
  return (
    /*#__PURE__*/
    // This will return the provided english translations
    _react.default.createElement(_psammeadTimestamp.default, {
      datetime: "2019-03-01T14:00+00:00",
      script: script,
      padding: false,
      service: service
    }, "Last updated: 5th November 2016")
  );
};

var getItem = function getItem(_ref2) {
  var service = _ref2.service,
      _ref2$withTimestamp = _ref2.withTimestamp,
      withTimestamp = _ref2$withTimestamp === void 0 ? false : _ref2$withTimestamp;
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

var getItemWrapperArray = function getItemWrapperArray(_ref3) {
  var numberOfItems = _ref3.numberOfItems,
      service = _ref3.service,
      script = _ref3.script,
      dir = _ref3.dir,
      _ref3$withTimestamp = _ref3.withTimestamp,
      withTimestamp = _ref3$withTimestamp === void 0 ? false : _ref3$withTimestamp,
      columnLayout = _ref3.columnLayout,
      size = _ref3.size;
  var itemWrapperArray = [];
  var item = getItem({
    service: service,
    withTimestamp: withTimestamp
  });

  for (var i = 1; i <= numberOfItems; i += 1) {
    itemWrapperArray.push( /*#__PURE__*/_react.default.createElement(_Item.MostReadItemWrapper, {
      dir: dir,
      key: i,
      columnLayout: columnLayout
    }, /*#__PURE__*/_react.default.createElement(_Rank.default, {
      service: service,
      script: script,
      listIndex: i,
      numberOfItems: numberOfItems,
      dir: dir,
      columnLayout: columnLayout,
      size: size
    }), /*#__PURE__*/_react.default.createElement(_Item.MostReadLink, {
      dir: dir,
      href: item.href,
      service: service,
      script: script,
      title: item.title,
      size: size
    }, item.timestamp)));
  }

  return itemWrapperArray;
};

exports.getItemWrapperArray = getItemWrapperArray;