"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable no-use-before-define */
var xmldoc = require('xmldoc');

var path = require('ramda/src/path');

var pathOr = require('ramda/src/pathOr');

var is = require('ramda/src/is');

var _require = require('./models'),
    fragment = _require.fragment,
    urlLink = _require.urlLink;

var attributeTags = ['bold', 'italic', 'span'];
var supportedXmlNodeNames = ['paragraph', 'link', 'url'].concat(attributeTags);

var isXmlNodeSupported = function isXmlNodeSupported(node) {
  if (path(['type'], node) === 'text') {
    return true;
  }

  return supportedXmlNodeNames.includes(path(['name'], node));
};

var getTextFromChildBlocks = function getTextFromChildBlocks(childBlocks) {
  if (!is(Array, childBlocks)) return '';
  return childBlocks.map(function (_ref) {
    var model = _ref.model;
    return pathOr('', ['text'], model);
  }).join('');
};

var createUrlLink = function createUrlLink(element) {
  var text;
  var locator;
  var blocks;
  path(['children'], element).forEach(function (childNode) {
    if (childNode.name === 'caption') {
      text = path(['children', 0, 'text'], childNode);
    }

    if (childNode.name === 'url') {
      locator = path(['attr', 'href'], childNode);
    }

    blocks = [fragment(text)];
  });
  var isInternalRegex = /(\.|\/)bbc\.(in|com|co\.uk)/;
  var isExternal = !isInternalRegex.test(locator);
  return urlLink(text, locator, blocks, isExternal);
};

var handleSupportedNodes = function handleSupportedNodes(childNode, attributes, acc) {
  var block = xmlNodeToBlock(childNode, attributes);
  var blocks = is(Array, block) ? block : [block];
  return [].concat(_toConsumableArray(acc), _toConsumableArray(blocks));
};

var convertToBlocks = function convertToBlocks(node) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return pathOr([], ['children'], node).reduce(function (acc, childNode) {
    if (isXmlNodeSupported(childNode, attributes)) {
      return handleSupportedNodes(childNode, attributes, acc);
    }

    if (childNode.children && childNode.children.length !== 0) {
      // ignore the unsupported node and try to render it's children
      return convertToBlocks(childNode, attributes);
    }

    return acc;
  }, []);
};

var xmlNodeToBlock = function xmlNodeToBlock(node, attributes) {
  if (!is(Object, node)) return undefined;

  if (node.type === 'text') {
    return fragment(node.text, attributes);
  }

  if (node.name === 'link') {
    return createUrlLink(node);
  }

  if (attributeTags.includes(node.name)) {
    if (!is(Array, attributes)) return undefined;
    var styleAttribute = node.name;
    return convertToBlocks(node, [].concat(_toConsumableArray(attributes), [styleAttribute]));
  }

  var childBlocks = convertToBlocks(node);
  return {
    type: node.name,
    model: {
      text: getTextFromChildBlocks(childBlocks),
      blocks: childBlocks
    }
  };
};

var candyXmlToRichText = function candyXmlToRichText(xml) {
  try {
    var parsedXml = new xmldoc.XmlDocument(xml);
    var blocks = convertToBlocks(parsedXml);
    return {
      type: 'text',
      model: {
        blocks: blocks
      }
    };
  } catch (e) {
    return null;
  }
};

module.exports = candyXmlToRichText;