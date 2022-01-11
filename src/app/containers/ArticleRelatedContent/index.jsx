import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import tail from 'ramda/src/tail';
import identity from 'ramda/src/identity';
import path from 'ramda/src/path';
import pick from 'ramda/src/pick';
import pathOr from 'ramda/src/pathOr';
import pathEq from 'ramda/src/pathEq';
import { C_GREY_2 } from '@bbc/psammead-styles/colours';
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
        id: item.id,
        headlines: {
          headline: contentBlock.text,
        },
        locators: {
          assetUri: path(['blocks', 0, 'model', 'locator'], contentBlock),
        },
        indexImage: {
          ...pick(['width', 'height', 'copyrightHolder'], imageDataBlock),
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
