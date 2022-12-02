import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import tail from 'ramda/src/tail';
import identity from 'ramda/src/identity';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import { C_GREY_2 } from '#psammead/psammead-styles/src/colours';
import CpsRelatedContent from '#containers/CpsRelatedContent';
import filterForBlockType from '#lib/utilities/blockHandlers';
import { gridColumnsPrimary } from '#pages/ArticlePage/ArticlePageGrid';

export const getCustomTitle = path([
  'model',
  'blocks',
  0,
  'model',
  'blocks',
  0,
  'model',
  'blocks',
  0,
  'model',
  'text',
]);

// Optimo allows editorial to provide promo images of any aspect ratio
// For rendering, we need images with a consistent aspect ratio
// This function ensures the image element has a width:height of 16:9
// We then crop using object-fit: cover on the element's css
const getImageSize = ({ height }) => {
  const targetRatio = 0.5625;

  return { width: Math.round(height / targetRatio), height };
};

export const buildStoryPromos = optimoRelatedContent => {
  return optimoRelatedContent
    .map(item => {
      const imageBlock = path(['model', 'blocks', 0], item);
      const imageDataBlock = path(['model', 'blocks', 1, 'model'], imageBlock);
      const contentBlock = path(
        ['model', 'blocks', 1, 'model', 'blocks', 0, 'model'],
        item,
      );
      if (!(imageBlock && contentBlock && imageDataBlock)) return null;

      const aresLinkBlock = filterForBlockType(
        pathOr({}, ['model', 'blocks'], item),
        'aresLink',
      );
      const timestamp = path(
        ['model', 'blocks', '0', 'model', 'timestamp'],
        aresLinkBlock,
      );

      const headingTag = timestamp ? 'h3' : 'div';

      return {
        // The 'headingTag' is set to an h3 if the item has any content below the heading (eg, either a timestamp or a summary)
        // or to a div if no content is below the heading
        headingTag,
        id: item.id,
        headlines: {
          headline: contentBlock.text,
        },
        locators: {
          assetUri: path(['blocks', 0, 'model', 'locator'], contentBlock),
        },
        indexImage: {
          ...getImageSize(imageDataBlock),
          copyrightHolder: imageDataBlock.copyrightHolder,
          path: `/${imageDataBlock.originCode}/${imageDataBlock.locator}`,
          altText: path(
            [
              'model',
              'blocks',
              0,
              'model',
              'blocks',
              0,
              'model',
              'blocks',
              0,
              'model',
              'text',
            ],
            imageBlock,
          ),
        },
        timestamp,
      };
    })
    .filter(Boolean);
};

const ArticleRelatedContent = ({ content }) => {
  if (!pathEq(['type'], 'relatedContent', content)) return null;
  const items = pathOr([], ['model', 'blocks'], content);

  // Editorial can optionally provide a custom title for the related content
  // If they do, that title block will be the first item in the content array
  const customTitle =
    pathEq([0, 'type'], 'title', items) && getCustomTitle(content);
  const storyPromoItems = buildStoryPromos(
    (customTitle ? tail : identity)(items),
  );

  if (!storyPromoItems.length) return null;

  return (
    <CpsRelatedContent
      {...(customTitle && { title: customTitle })}
      parentColumns={gridColumnsPrimary}
      content={storyPromoItems}
      sectionLabelBackground={C_GREY_2}
    />
  );
};

ArticleRelatedContent.propTypes = {
  content: shape({
    type: string,
    model: shape({
      blocks: arrayOf(
        shape({
          type: string,
        }),
      ),
    }),
  }).isRequired,
};

export default ArticleRelatedContent;
