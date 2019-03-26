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
import preprocess from '../../../../data/preprocessor';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
  image,
  timestamp,
};

const ArticleMain = ({ articleData }) => {
  const { metadata, promo } = articleData;
  const { blocks } = preprocess(articleData).content.model;
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
};

ArticleMain.propTypes = {
  articleData: shape(articleDataPropTypes).isRequired,
};

export default ArticleMain;
