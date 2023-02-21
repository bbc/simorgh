import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { string, node } from 'prop-types';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '#psammead/gel-foundations/src/spacings';
import MostReadContainer from '#containers/MostRead';
import mostReadShape from '#containers/MostRead/utilities/mostReadShape';
import ATIAnalytics from '#containers/ATIAnalytics';
import LinkedData from '#containers/LinkedData';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import MetadataContainer from '#containers/Metadata';
import Grid, { GelPageGrid } from '#components/Grid';
import IndexPageContainer from '#components/PageLayout/IndexPageContainer';
import IndexHeading from '#containers/IndexHeading';
import { ServiceContext } from '../../contexts/ServiceContext';

const MarginWrapper = styled.div`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-top: ${GEL_SPACING_TRPL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin-top: ${GEL_SPACING_QUAD};
  }

  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_QUAD};
  }
`;

const MostReadPage = ({ pageData, mostReadEndpointOverride }) => {
  const {
    brandName,
    lang,
    mostRead: { header },
  } = useContext(ServiceContext);

  const MostReadWrapper = ({ children }) => (
    <>
      <IndexHeading id="content">{header}</IndexHeading>
      <MarginWrapper>
        <GelPageGrid
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
            startOffset={{
              group0: 1,
              group1: 1,
              group2: 1,
              group3: 1,
              group4: 1,
              group5: 3,
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
      </MarginWrapper>
    </>
  );

  MostReadWrapper.propTypes = {
    children: node.isRequired,
  };

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
      <MetadataContainer
        title={header}
        lang={lang}
        description={`${header} - ${brandName}`}
        openGraphType="website"
      />
      <LinkedData type="WebPage" seoTitle={header} />
      <main role="main" data-e2e="most-read">
        <IndexPageContainer>
          <MostReadContainer
            mostReadEndpointOverride={mostReadEndpointOverride}
            wrapper={MostReadWrapper}
            columnLayout="oneColumn"
            initialData={pageData}
            serverRenderOnAmp
          />
        </IndexPageContainer>
      </main>
    </>
  );
};
MostReadPage.propTypes = {
  pageData: mostReadShape.isRequired,
  mostReadEndpointOverride: string,
};
MostReadPage.defaultProps = {
  mostReadEndpointOverride: null,
};
export default MostReadPage;
