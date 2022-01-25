import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import tail from 'ramda/src/tail';
import identity from 'ramda/src/identity';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import { C_GREY_2 } from '@bbc/psammead-styles/colours';
import styled from '@emotion/styled';
import Image from '@bbc/psammead-image';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import CpsRelatedContent from '#containers/CpsRelatedContent';
import { gridColumnsPrimary } from '../../pages/ArticlePage/ArticlePageGrid';

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

const StyledImage = styled(Image)`
  object-fit: cover;
  height: auto;
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    height: 12rem;
  }
`;

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

      return {
        // By default, the heading will be an h3 within the story promo component
        // Because optimo promos will have no content below the heading, it should be a div instead
        // TODO: when ARES add support for timestamps and summaries, this will need to be dynamically
        // set to an h3 if the item has any content below the heading (eg, either a timestamp or a summary)
        headingTag: 'div',
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
      imageComponent={StyledImage}
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
