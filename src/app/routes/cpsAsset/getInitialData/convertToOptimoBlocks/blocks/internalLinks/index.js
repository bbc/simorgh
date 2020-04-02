import path from 'ramda/src/path';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';

/*
Problem:
Any block type from CPS can have a "text" block containing an internal link, ie, a link to another CPS asset
These internal links are denoted by "itemMeta" XML within the text, eg:
hello world <itemMeta>afrique/23248423</itemMeta> lorem ipsum
Note there can be multiple internal links within the same blob of text

Any block containing such an <itemMeta> tag has a sibling "meta" array within the same block
That meta array contains a metadata object for each internal link

Example of input data: https://www.test.bbc.com/pidgin/23248703.json
Sample internal links can be seen in blocks[6:7] and blocks[8].items[0:2]
Sample external links can be seen in blocks[8].items[3:5]

Broad strategy here is to find all of the text blocks containing <itemMeta>, and convert them over
to the same schema used for external links

External links then get converted into the optimo format as part of the existing transformer
*/

const getBlocks = path(['content', 'blocks']);

const getUrl = path(['locators', 'href']);

const getLinkText = path(['headlines', 'overtyped']);

const itemIdEndsWith = (string) => ({ id }) => id.endsWith(string);

const getItemMetadata = (id, metadata) => metadata.find(itemIdEndsWith(id));

// Given a block that has text, gather up any <itemMeta> tags within that text
const getItemMetaMatches = (text) =>
  Array.from(text.matchAll(/<itemMeta>(.*?)<\/itemMeta>/g));

const whiteSpaceRegex = /(\r?\n|\r)\s*/g;

// This is the template CPS uses for external links - we already support these
// A later transformer converts them into the optimo format

const getLinkXML = (url, text) =>
  `
<link>
    <caption>${text}</caption>
    <altText>${text}</altText>
    <url href="${url}" platform="highweb"/>
    <url href="${url}" platform="enhancedmobile"/>
</link>
`.replace(whiteSpaceRegex, '');

const replaceChevrons = (text) =>
  text
    .replace('<', '&lt;')
    .replace('>', '&gt;')
    .replace(/&(?!amp|gt|lt)/, '&amp;');

const transformBlockText = (blockText, blockMeta) => {
  const itemMetaMatches = getItemMetaMatches(blockText);

  // Iterate over every <itemMeta> tag and replace it
  return itemMetaMatches.reduce((accumulator, [match, id]) => {
    const itemMetadata = getItemMetadata(id, blockMeta);
    if (!itemMetadata) {
      return accumulator;
    }
    const url = getUrl(itemMetadata);
    const linkText = replaceChevrons(getLinkText(itemMetadata));

    return accumulator.replace(match, getLinkXML(url, linkText));
  }, blockText);
};

// Recursively iterate through blocks - if a block has a "text" property we should process it
const transformBlock = ({ text, items, ...block }) => ({
  ...block,
  ...(text && {
    text: transformBlockText(text, block.meta),
  }),
  ...(items && {
    items: items.map(transformBlock),
  }),
});

export default (inputData) => {
  const blocks = getBlocks(inputData);

  if (blocks && blocks.length) {
    const transformedBlocks = blocks.map(transformBlock);
    const mergeTransformedContentBlocks = mergeDeepLeft({
      content: {
        blocks: transformedBlocks,
      },
    });

    return mergeTransformedContentBlocks(inputData);
  }

  return inputData;
};
