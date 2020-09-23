import React, { useContext } from 'react';
import path from 'ramda/src/path';
import styled from 'styled-components';
import { arrayOf, shape, node } from 'prop-types';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_QUAD,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/spacings';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import Grid, { GelPageGrid } from '#app/components/Grid';
import IndexMain from '#app/components/PageLayout/IndexMain';
import IndexPageContainer from '#app/components/PageLayout/IndexPageContainer';
import IndexHeading from '#containers/IndexHeading';
import MostWatchedContainer from '#containers/MostWatched';
import MetadataContainer from '#containers/Metadata';
import LinkedData from '#containers/LinkedData';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import ATIAnalytics from '#containers/ATIAnalytics';

const StyledIndexHeading = styled(IndexHeading)`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-bottom: ${GEL_SPACING};
    padding-top: ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_QUAD};
  }
`;

const MostWatchedPage = ({ pageData }) => {
  const {
    dir,
    brandName,
    lang,
    mostWatched: { header },
  } = useContext(ServiceContext);

  const mostWatchedData = path(['mostWatched'], pageData);

  const MostWatchedWrapper = ({ children }) => (
    <GelPageGrid
      dir={dir}
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 20,
      }}
      enableGelGutters
    >
      <Grid
        item
        dir={dir}
        startOffset={{
          group0: 1,
          group1: 1,
          group2: 1,
          group3: 1,
          group4: 1,
          group5: 1,
        }}
        columns={{
          group0: 6,
          group1: 6,
          group2: 6,
          group3: 6,
          group4: 6,
          group5: 11,
        }}
      >
        {children}
      </Grid>
    </GelPageGrid>
  );

  MostWatchedWrapper.propTypes = {
    children: node.isRequired,
  };

  return (
    <>
      <MetadataContainer
        title={header}
        lang={lang}
        description={`${header} - ${brandName}`}
        openGraphType="website"
      />
      <ATIAnalytics data={pageData} />
      <LinkedData type="WebPage" seoTitle={header} />
      <ChartbeatAnalytics data={pageData} />
      <IndexMain data-e2e="most-watched">
        <IndexPageContainer>
          <MostWatchedWrapper>
            <StyledIndexHeading id="content">{header}</StyledIndexHeading>
            <MostWatchedContainer data={mostWatchedData} isMostWatchedPage />
          </MostWatchedWrapper>
        </IndexPageContainer>
      </IndexMain>
    </>
  );
};

MostWatchedPage.propTypes = {
  pageData: shape({
    mostWatched: arrayOf(shape(storyItem)),
  }),
};

MostWatchedPage.defaultProps = {
  pageData: null,
};

export default MostWatchedPage;
