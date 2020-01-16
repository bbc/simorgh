import cloneDeep from 'ramda/src/clone';
import path from 'ramda/src/path';

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

// This is the template CPS uses for external links - we already support these
// A later transformer converts them into the optimo format
const buildUrlString = ({ url, linkText }) => {
  // simorgh#5078 - The psammead-rich-text-transforms package does not like chevrons
  const parsedLinkText = linkText
    .replace('<', '&lt;')
    .replace('>', '&gt;')
    .replace(/&(?!amp|gt|lt)/, '&amp;');

  return `
        <link>
            <caption>${parsedLinkText}</caption>
            <altText>${parsedLinkText}</altText>
            <url href="${url}" platform="highweb"/>
            <url href="${url}" platform="enhancedmobile"/>
        </link>
    `.replace(/(\r?\n|\r)\s*/g, '');
};

// Given a block, an <itemMeta> match, and the corresponding metadata,
// replace the match with the full link XML
const provideLinkXML = ({ block, match, metadata }) => {
  if (!metadata) return;

  const url = path(['locators', 'href'], metadata);
  const linkText = path(['headlines', 'overtyped'], metadata);

  if (!url || !linkText) return;

  // eslint-disable-next-line no-param-reassign
  block.text = block.text.replace(
    match,
    buildUrlString({
      url,
      linkText,
    }),
  );
};

// Given an array of metadata and the id stored within the <itemMeta> tag,
// find the corresponding metadata object from that array
const findMetadata = (metadata, id) => {
  return metadata.find(item => {
    return item.id.endsWith(id);
  });
};

// Given a block that has text, gather up any <itemMeta> tags within that text
const parseText = block => {
  const matches = Array.from(
    block.text.matchAll(/<itemMeta>(.*?)<\/itemMeta>/g),
  );
  if (!matches.length) return;

  // Iterate over every <itemMeta> tag, and pass it off to be replaced
  matches.forEach(([match, id]) => {
    provideLinkXML({
      block,
      match,
      metadata: findMetadata(block.meta, id),
    });
  });
};

// Recursively iterate through all blocks - if a block has a "text" property, send it off for processing
const findAndEnrichTextValues = blocks => {
  if (!Array.isArray(blocks)) return;
  blocks.forEach(block => {
    if (block.text) {
      parseText(block);
    }
    if (block.items) {
      findAndEnrichTextValues(block.items);
    }
  });
};

// Validate input & deep clone to prevent mutation
const main = inputData => {
  if (!inputData || !inputData.content || !inputData.content.blocks)
    return inputData;
  const enrichedData = cloneDeep(inputData);
  findAndEnrichTextValues(enrichedData.content.blocks);
  return enrichedData;
};

export default main;
