import React from 'react';
import { string, shape, object, arrayOf } from 'prop-types';
import path from 'ramda/src/path';
import { Link } from 'react-router-dom';
import { GhostGrid } from '#lib/styledGrid';
import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import text from '../Text';
import Blocks from '../Blocks';

const componentsToRender = {
  text,
};

const CpsAssetPageMain = ({ pageData }) => {
  const title = path(['promo', 'headlines', 'headline'], pageData);
  const summary = path(['promo', 'summary'], pageData);
  const metadata = path(['metadata'], pageData);
  const blocks = path(['content', 'model', 'blocks'], pageData);

  return (
    <>
      <MetadataContainer
        title={title}
        lang={metadata.language}
        description={summary}
        openGraphType="website"
      />
      <LinkedData type="Article" seoTitle={title} />
      <GhostGrid as="main" role="main">
        <Link to="/pidgin/test-12345678" data-e2e="cpsAssetDummyLink">
          Test MAP to MAP inline link
        </Link>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </GhostGrid>
    </>
  );
};

CpsAssetPageMain.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  pageData: shape({
    metadata: shape({
      id: string,
      tags: object,
      type: string,
    }),
    promo: shape({
      id: string,
      type: string,
    }),
    content: shape({
      blocks: arrayOf(
        shape({
          uuid: string,
          id: string,
          text: string,
          type: string,
        }),
      ),
    }),
  }).isRequired,
};

export default CpsAssetPageMain;
