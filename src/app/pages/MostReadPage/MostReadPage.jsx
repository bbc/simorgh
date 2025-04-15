import React, { useContext } from 'react';
import styled from '@emotion/styled';
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
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import Grid, { GelPageGrid } from '#components/Grid';
import IndexHeading from '#containers/IndexHeading';
import IndexPageContainer from '#components/PageLayout/IndexPageContainer';
import MostRead from '../../components/MostRead/Canonical';
import ATIAnalytics from '../../components/ATIAnalytics';
import ChartbeatAnalytics from '../../components/ChartbeatAnalytics';
import MetadataContainer from '../../components/Metadata';
import { ServiceContext } from '../../contexts/ServiceContext';
import LinkedData from '../../components/LinkedData';

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

const MostReadWrapper = ({ children, header }) => (
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

const MostReadPage = ({ pageData }) => {
  const {
    brandName,
    lang,
    mostRead: { header },
  } = useContext(ServiceContext);

  const {
    metadata: { atiAnalytics },
  } = pageData;

  const atiData = { ...atiAnalytics, pageTitle: `${header} - ${brandName}` };

  return (
    <>
      <ATIAnalytics atiData={atiData} />
      <ChartbeatAnalytics title={header} />
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
          <MostReadWrapper header={header}>
            <MostRead data={pageData} columnLayout="oneColumn" size="default" />
          </MostReadWrapper>
        </IndexPageContainer>
      </main>
    </>
  );
};

export default MostReadPage;
