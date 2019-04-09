import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import { articleDataPropTypes } from '../../models/propTypes/article';
import MetadataContainer from '../Metadata';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../Timestamp';
import { GhostWrapper } from '../../lib/styledGrid';
import Page from '../Page';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
  image,
  timestamp,
};

const Article = props => (
  <Page {...props}>
    {({ articleData }) => {
      const { content, metadata, promo } = articleData;
      const { blocks } = content.model;

      return (
        <Fragment>
          <MetadataContainer metadata={metadata} promo={promo} />
          <main role="main">
            <GhostWrapper>
              <Blocks blocks={blocks} componentsToRender={componentsToRender} />
            </GhostWrapper>
          </main>
        </Fragment>
      );
    }}
  </Page>
);

Article.propTypes = {
  articleData: shape(articleDataPropTypes).isRequired,
};

export default Article;
