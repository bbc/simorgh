/* eslint-disable no-use-before-define */
const xmldoc = require('xmldoc');
const path = require('ramda/src/path');
const pathOr = require('ramda/src/pathOr');
const is = require('ramda/src/is');
const { fragment, urlLink } = require('./models');

const attributeTags = ['bold', 'italic', 'span'];
const supportedXmlNodeNames = ['paragraph', 'link', 'url', ...attributeTags];

const isXmlNodeSupported = node => {
  if (path(['type'], node) === 'text') {
    return true;
  }

  return supportedXmlNodeNames.includes(path(['name'], node));
};

const getTextFromChildBlocks = childBlocks => {
  if (!is(Array, childBlocks)) return '';

  return childBlocks.map(({ model }) => pathOr('', ['text'], model)).join('');
};

const createUrlLink = element => {
  let text;
  let locator;
  let blocks;

  path(['children'], element).forEach(childNode => {
    if (childNode.name === 'caption') {
      text = path(['children', 0, 'text'], childNode);
    }

    if (childNode.name === 'url') {
      locator = path(['attr', 'href'], childNode);
    }

    blocks = [fragment(text)];
  });

  const isInternalRegex = /(\.|\/)bbc\.(in|com|co\.uk)/;
  const isExternal = !isInternalRegex.test(locator);

  return urlLink(text, locator, blocks, isExternal);
};

const handleSupportedNodes = (childNode, attributes, acc) => {
  const block = xmlNodeToBlock(childNode, attributes);
  const blocks = is(Array, block) ? block : [block];
  return [...acc, ...blocks];
};

const convertToBlocks = (node, attributes = []) =>
  pathOr([], ['children'], node).reduce((acc, childNode) => {
    if (isXmlNodeSupported(childNode, attributes)) {
      return handleSupportedNodes(childNode, attributes, acc);
    }

    if (childNode.children && childNode.children.length !== 0) {
      // ignore the unsupported node and try to render it's children
      return convertToBlocks(childNode, attributes);
    }

    return acc;
  }, []);

const xmlNodeToBlock = (node, attributes) => {
  if (!is(Object, node)) return undefined;

  if (node.type === 'text') {
    return fragment(node.text, attributes);
  }

  if (node.name === 'link') {
    return createUrlLink(node);
  }

  if (attributeTags.includes(node.name)) {
    if (!is(Array, attributes)) return undefined;

    const styleAttribute = node.name;
    return convertToBlocks(node, [...attributes, styleAttribute]);
  }

  const childBlocks = convertToBlocks(node);

  return {
    type: node.name,
    model: {
      text: getTextFromChildBlocks(childBlocks),
      blocks: childBlocks,
    },
  };
};

const candyXmlToRichText = xml => {
  try {
    const parsedXml = new xmldoc.XmlDocument(xml);
    const blocks = convertToBlocks(parsedXml);

    return {
      type: 'text',
      model: {
        blocks,
      },
    };
  } catch (e) {
    return null;
  }
};

module.exports = candyXmlToRichText;
