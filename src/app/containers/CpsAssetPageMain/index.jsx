import React from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { Link } from 'react-router-dom';
import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import headings from '../Headings';
import timestamp from '../ArticleTimestamp';
import text from '../Text';
import image from '../Image';
import MediaPlayer from '../CpsAssetMediaPlayer';
import Blocks from '../Blocks';
import ATIAnalytics from '../ATIAnalytics';
import cpsAssetPagePropTypes from '../../models/propTypes/cpsAssetPage';
import Grid, { GelPageGrid } from '#app/components/Grid';
import fauxHeadline from '../FauxHeadline';
import visuallyHiddenHeadline from '../VisuallyHiddenHeadline';

const CpsAssetPageMain = ({ pageData }) => {
  const title = path(['promo', 'headlines', 'headline'], pageData);
  const summary = path(['promo', 'summary'], pageData);
  const metadata = path(['metadata'], pageData);
  const allowDateStamp = path(['options', 'allowDateStamp'], metadata);
  const assetUri = path(['locators', 'assetUri'], metadata);
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);

  const componentsToRender = {
    fauxHeadline,
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    text,
    image,
    timestamp: allowDateStamp ? timestamp : undefined,
    video: props => <MediaPlayer {...props} assetUri={assetUri} />,
  };

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
      <GelPageGrid
        forwardedAs="main"
        role="main"
        columns={{
          group0: 6,
          group1: 6,
          group2: 6,
          group3: 6,
          group4: 8,
          group5: 20,
        }}
        enableGelGutters
        enableGelMargins
      >
        <Grid
          item
          startOffset={{
            group0: 1,
            group1: 1,
            group2: 1,
            group3: 1,
            group4: 2,
            group5: 5,
          }}
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 5,
            group4: 5,
            group5: 10,
          }}
        >
          <Link to="/pidgin/23248703" data-e2e="cpsAssetDummyLink">
            Test MAP to MAP inline link
          </Link>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </Grid>
      </GelPageGrid>
    </>
  );
};

CpsAssetPageMain.propTypes = cpsAssetPagePropTypes;

export default CpsAssetPageMain;
