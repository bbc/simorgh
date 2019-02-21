import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import { articleDataPropTypes } from '../../models/propTypes/article';
import MetadataContainer from '../Metadata';
import headings from '../Headings';
import caption from '../Caption';
import text from '../Text';
import Blocks from '../Blocks';
import Timestamp from '../Timestamp';
import { GhostWrapper, GridItemConstrained } from '../../lib/styledGrid';

const componentsToRenderHeadline = {
  headline: headings,
};

const componentsToRenderMain = {
  subheadline: headings,
  text,
  caption,
};

const splitBlocksByHeadline = ({ model }) => {
  const { blocks } = model;

  const headlineIndexPlusOne =
    blocks.findIndex(({ type }) => type === 'headline') + 1;

  const headlineBlocks = blocks.slice(0, headlineIndexPlusOne);
  const mainBlocks = blocks.slice(headlineIndexPlusOne, blocks.length);

  return { headlineBlocks, mainBlocks };
};

const ArticleMain = ({ articleData }) => {
  const { content, metadata, promo } = articleData;
  const { headlineBlocks, mainBlocks } = splitBlocksByHeadline(content);

  /*
   * headlineBlocks length check is temporary
   * Simorgh will respond with 400 to lack of headline block in issue
   * https://github.com/bbc/simorgh/issues/836
   */
  if (headlineBlocks.length > 0) {
    return (
      <Fragment>
        <MetadataContainer metadata={metadata} promo={promo} />
        <main role="main">
          <GhostWrapper>
            <GridItemConstrained>
              <Blocks
                blocks={headlineBlocks}
                componentsToRender={componentsToRenderHeadline}
              />
              <Timestamp timestamp={metadata.lastPublished} />
              <Blocks
                blocks={mainBlocks}
                componentsToRender={componentsToRenderMain}
              />
            </GridItemConstrained>
          </GhostWrapper>
        </main>
      </Fragment>
    );
  }

  return null;
};

ArticleMain.propTypes = {
  articleData: shape(articleDataPropTypes).isRequired,
};

export default ArticleMain;
