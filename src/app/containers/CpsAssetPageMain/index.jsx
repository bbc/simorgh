import React from 'react';
import path from 'ramda/src/path';
import { Link } from 'react-router-dom';
import { GhostGrid } from '#lib/styledGrid';
import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import text from '../Text';
import Blocks from '../Blocks';
import ATIAnalytics from '../ATIAnalytics';
import cpsAssetPagePropTypes from '../../models/propTypes/cpsAssetPage';

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
      <ATIAnalytics data={pageData} />
      <GhostGrid as="main" role="main">
        <Link to="/pidgin/test-12345678" data-e2e="cpsAssetDummyLink">
          Test MAP to MAP inline link
        </Link>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </GhostGrid>
    </>
  );
};

CpsAssetPageMain.propTypes = cpsAssetPagePropTypes;

export default CpsAssetPageMain;
