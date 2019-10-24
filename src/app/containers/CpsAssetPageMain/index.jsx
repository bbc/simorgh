import React, { useContext } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { Link } from 'react-router-dom';
import { GhostGrid } from '#lib/styledGrid';
import { RequestContext } from '#contexts/RequestContext';

import MetadataContainer from '../Metadata';
import LinkedData from '../LinkedData';
import headings from '../Headings';
import timestamp from '../ArticleTimestamp';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import MediaPlayer from './Blocks/Video';
import ATIAnalytics from '../ATIAnalytics';
import cpsAssetPagePropTypes from '../../models/propTypes/cpsAssetPage';

const CpsAssetPageMain = ({ pageData }) => {
  const { platform } = useContext(RequestContext);
  const title = path(['promo', 'headlines', 'headline'], pageData);
  const summary = path(['promo', 'summary'], pageData);
  const metadata = path(['metadata'], pageData);
  const assetUri = path(['locators', 'assetUri'], metadata);
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);

  const componentsToRender = {
    headline: headings,
    text,
    image,
    timestamp,
    video: props => (
      <MediaPlayer
        {...props}
        assetUri={assetUri.substr(1)}
        showPlaceholder={platform === 'amp'}
      />
    ),
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
      <GhostGrid as="main" role="main">
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        {/* this link is temporarily used in a cypress test */}
        <Link to="/pidgin/23248703" data-e2e="cpsAssetDummyLink">
          _
        </Link>
      </GhostGrid>
    </>
  );
};

CpsAssetPageMain.propTypes = cpsAssetPagePropTypes;

export default CpsAssetPageMain;
