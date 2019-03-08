import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import Helmet from 'react-helmet';
import { articleDataPropTypes } from '../../models/propTypes/article';
import MetadataContainer from '../Metadata';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import Timestamp from '../Timestamp';
import { GhostWrapper, GridItemConstrainedMedium } from '../../lib/styledGrid';
import LinkData from '../../components/LinkData';

const componentsToRenderHeadline = {
  headline: headings,
};

const componentsToRenderMain = {
  subheadline: headings,
  text,
  image,
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
        <Helmet>
          <LinkData
            type={metadata.type}
            seoHeadline={promo.headlines.seoHeadline}
            firstPublished={metadata.firstPublished}
            lastUpdated={metadata.lastPublished}
            optimoUrn={metadata.locators.optimoUrn}
            service={metadata.createdBy}
          />
        </Helmet>
        <MetadataContainer metadata={metadata} promo={promo} />
        <main role="main">
          <GhostWrapper>
            <Blocks
              blocks={headlineBlocks}
              componentsToRender={componentsToRenderHeadline}
            />
            <GridItemConstrainedMedium>
              <Timestamp timestamp={metadata.lastPublished} />
            </GridItemConstrainedMedium>
            <Blocks
              blocks={mainBlocks}
              componentsToRender={componentsToRenderMain}
            />
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
