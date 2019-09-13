import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import convert from 'xml-js';
import uuid from 'uuid';

const listCandy = jsonRaw => {
  const blocks = path(['content', 'blocks'], jsonRaw);

  if (!blocks) return jsonRaw;

  const processedBlocks = blocks.map(block => {
    const { type, items } = block;

    if (type !== 'list' || !items || !items.length) return block;

    const processedItems = items.map(item => {
      const { text, markupType } = item;

      if (markupType === 'plain_text') {
        return {
          ...item,
          text: [
            {
              text,
              attributes: [],
              id: uuid(),
            },
          ],
        };
      }

      if (markupType === 'candy_xml') {
        const jsonXml = JSON.parse(convert.xml2json(text));

        return {
          ...item,
          text: [
            {
              text: pathOr(
                'UNABLE TO FIND TEXT',
                ['elements', 0, 'elements', 0, 'elements', 0, 'text'],
                jsonXml,
              ),
              attributes: [],
              href: pathOr(
                'UNABLE TO FIND URL',
                ['elements', 0, 'elements', 1, 'elements', 0, 'href'],
                jsonXml,
              ),
              id: uuid(),
            },
          ],
        };
      }

      return null;
    });

    return {
      ...block,
      items: processedItems.filter(Boolean),
    };
  });

  return {
    ...jsonRaw,
    content: {
      ...path(['content'], jsonRaw),
      blocks: processedBlocks,
    },
  };
};

export default listCandy;
