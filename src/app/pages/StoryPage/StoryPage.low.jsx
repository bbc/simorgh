import React, { useContext } from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';

import { getImageParts } from '#app/routes/cpsAsset/getInitialData/convertToOptimoBlocks/blocks/image/helpers';
import CpsMetadata from '#containers/CpsMetadata';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import LinkedData from '#containers/LinkedData';
import headings from '#containers/Headings';
import Disclaimer from '#containers/Disclaimer';
import Timestamp from '#containers/ArticleTimestamp';
import text from '#containers/Text';
import Blocks from '#containers/Blocks';
import ATIAnalytics from '#containers/ATIAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import fauxHeadline from '#containers/FauxHeadline';
import visuallyHiddenHeadline from '#containers/VisuallyHiddenHeadline';
import CpsTable from '#containers/CpsTable';
import Byline from '#containers/Byline';

import {
  getFirstPublished,
  getLastPublished,
  getAboutTags,
} from '#lib/utilities/parseAssetData';
import { ServiceContext } from '#contexts/ServiceContext';
import categoryType from './categoryMap/index';
import cpsAssetPagePropTypes from '../../models/propTypes/cpsAssetPage';

const StyledTimestamp = styled(Timestamp)`
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-bottom: ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_TRPL};
  }
`;

const StyledByline = styled(Byline)`
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-bottom: ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_TRPL};
  }
`;

const StyledMain = styled.main`
  padding: 0;

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_DBL};
  }
`;

const StoryPage = ({ pageData }) => {
  const { lang } = useContext(ServiceContext);

  const title = path(['promo', 'headlines', 'headline'], pageData);
  const shortHeadline = path(['promo', 'headlines', 'shortHeadline'], pageData);
  const category = path(
    ['promo', 'passport', 'category', 'categoryName'],
    pageData,
  );
  const summary = path(['promo', 'summary'], pageData);
  const metadata = path(['metadata'], pageData);
  const allowDateStamp = path(['options', 'allowDateStamp'], metadata);
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);

  const indexImagePath = path(['promo', 'indexImage', 'path'], pageData);
  const indexImageLocator = indexImagePath
    ? getImageParts(indexImagePath)[1]
    : null;
  const indexImageAltText = path(['promo', 'indexImage', 'altText'], pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);

  const componentsToRender = {
    fauxHeadline,
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    text,
    timestamp: props =>
      allowDateStamp ? (
        <StyledTimestamp {...props} popOut={false} minutesTolerance={1} />
      ) : null,
    byline: props => <StyledByline {...props} />,
    table: props => <CpsTable {...props} />,
    disclaimer: props => (
      <Disclaimer {...props} increasePaddingOnDesktop={false} />
    ),
  };

  return (
    <>
      <CpsMetadata
        title={title}
        shortHeadline={shortHeadline}
        language={lang}
        description={summary}
        firstPublished={firstPublished}
        lastPublished={lastPublished}
        imageLocator={indexImageLocator}
        imageAltText={indexImageAltText}
        aboutTags={aboutTags}
        hasAppleItunesAppBanner
      />
      <LinkedData
        type={categoryType(category)}
        seoTitle={title}
        headline={title}
        description={summary}
        showAuthor
        datePublished={firstPublished}
        dateModified={lastPublished}
        aboutTags={aboutTags}
        imageLocator={indexImageLocator}
      />
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
      <StyledMain role="main">
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </StyledMain>
    </>
  );
};

StoryPage.propTypes = cpsAssetPagePropTypes;

export default StoryPage;
