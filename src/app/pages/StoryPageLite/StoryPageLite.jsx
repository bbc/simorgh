import React, { useContext } from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING,
} from '@bbc/gel-foundations/spacings';
import SectionLabel from '@bbc/psammead-section-label';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';

import Grid, { GelPageGrid } from '#app/components/Grid';
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
import Byline from '#containers/Byline';

import {
  getFirstPublished,
  getLastPublished,
  getAboutTags,
} from '#lib/utilities/parseAssetData';
import Include from '#containers/Include';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import NielsenAnalytics from '#containers/NielsenAnalytics';
import categoryType from './categoryMap/index';
import cpsAssetPagePropTypes from '../../models/propTypes/cpsAssetPage';

const StoryPageLite = ({ pageData }) => {
  const {
    dir,
    mostRead: { header },
    script,
    service,
    serviceLang,
    lang,
  } = useContext(ServiceContext);

  const title = path(['promo', 'headlines', 'headline'], pageData);
  const shortHeadline = path(['promo', 'headlines', 'shortHeadline'], pageData);
  const category = path(
    ['promo', 'passport', 'category', 'categoryName'],
    pageData,
  );
  const summary = path(['promo', 'summary'], pageData);
  const metadata = path(['metadata'], pageData);
  const allowDateStamp = path(['options', 'allowDateStamp'], metadata);
  const assetUri = path(['locators', 'assetUri'], metadata);
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);
  const indexImagePath = path(['promo', 'indexImage', 'path'], pageData);
  const indexImageLocator = indexImagePath
    ? getImageParts(indexImagePath)[1]
    : null;
  const indexImageAltText = path(['promo', 'indexImage', 'altText'], pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);

  const gridColumns = {
    group0: 8,
    group1: 8,
    group2: 8,
    group3: 8,
    group4: 12,
    group5: 12,
  };

  const gridMargins = {
    group0: false,
    group1: false,
    group2: false,
    group3: false,
    group4: true,
    group5: true,
  };

  const gridOffset = {
    group0: 1,
    group1: 1,
    group2: 1,
    group3: 1,
    group4: 1,
    group5: 1,
  };

  const gridColsMain = {
    group0: 8,
    group1: 8,
    group2: 8,
    group3: 8,
    group4: 8,
    group5: 8,
  };

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
    version: props => <MediaPlayer {...props} assetUri={assetUri} />,
    byline: props => <StyledByline {...props} />,
    disclaimer: props => (
      <Disclaimer {...props} increasePaddingOnDesktop={false} />
    ),
  };

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

  const StoryPageGrid = styled(GelPageGrid)`
    width: 100%; /* Needed for IE11 */
    margin: 0 auto;
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
    }
  `;

  // Firefox specific styling to prevent content from overflowing on smaller resolutions
  const GridPrimaryColumn = styled(Grid)`
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      width: 100%;
    }
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      width: 100%;
    }
    padding-bottom: ${GEL_SPACING_QUAD};
  `;

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
      <NielsenAnalytics />
      <StoryPageGrid
        columns={gridColumns}
        enableGelGutters
        margins={gridMargins}
      >
        <GridPrimaryColumn
          item
          columns={gridColsMain}
          startOffset={gridOffset}
          parentColumns={gridColumns}
        >
          <main role="main">
            <Blocks blocks={blocks} componentsToRender={componentsToRender} />
          </main>

        </GridPrimaryColumn>
      </StoryPageGrid>
    </>
  );
};

StoryPageLite.propTypes = cpsAssetPagePropTypes;

export default StoryPageLite;
