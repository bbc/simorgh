import React from 'react';
import path from 'ramda/src/path';
import { Link } from 'react-router-dom';
import { Grid, GridItemConstrainedMedium } from '#lib/styledGrid';
import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import ATIAnalytics from '../ATIAnalytics';
import cpsAssetPagePropTypes from '../../models/propTypes/cpsAssetPage';

const CpsAssetPageMain = ({ pageData }) => {
  const title = path(['promo', 'headlines', 'headline'], pageData);
  const summary = path(['promo', 'summary'], pageData);
  const metadata = path(['metadata'], pageData);

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
      <Grid as="main" role="main">
        <GridItemConstrainedMedium>
          <h1 id="content" tabIndex="-1">
            Placeholder content for MAP page skeleton
          </h1>
          <Link to="/pidgin/23248703" data-e2e="cpsAssetDummyLink">
            Test MAP to MAP inline link
          </Link>
        </GridItemConstrainedMedium>
      </Grid>
    </>
  );
};

CpsAssetPageMain.propTypes = cpsAssetPagePropTypes;

export default CpsAssetPageMain;
