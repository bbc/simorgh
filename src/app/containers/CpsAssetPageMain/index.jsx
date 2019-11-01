import React from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { Link } from 'react-router-dom';
import { GhostGrid, GridItemConstrainedMedium } from '#lib/styledGrid';
import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import headings from '../Headings';
import timestamp from '../ArticleTimestamp';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import ATIAnalytics from '../ATIAnalytics';
import cpsAssetPagePropTypes from '../../models/propTypes/cpsAssetPage';

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
  image,
  timestamp,
};

const CpsAssetPageMain = ({ pageData }) => {
  const title = path(['promo', 'headlines', 'headline'], pageData);
  const summary = path(['promo', 'summary'], pageData);
  const metadata = path(['metadata'], pageData);
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);

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
        <GridItemConstrainedMedium>
          <Link to="/pidgin/23248703" data-e2e="cpsAssetDummyLink">
            Test MAP to MAP inline link
          </Link>
        </GridItemConstrainedMedium>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </GhostGrid>
    </>
  );
};

CpsAssetPageMain.propTypes = cpsAssetPagePropTypes;

export default CpsAssetPageMain;
