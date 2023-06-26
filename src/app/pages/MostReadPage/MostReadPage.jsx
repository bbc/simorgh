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
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import Grid, { GelPageGrid } from '#components/Grid';
import IndexPageContainer from '#components/PageLayout/IndexPageContainer';
import IndexHeading from '#containers/IndexHeading';
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

const MostReadPage = ({ pageData, mostReadEndpointOverride }) => {
  const {
    brandName,
    lang,
    mostRead: { header },
  } = useContext(ServiceContext);

  return (
    <>
      <ATIAnalytics data={pageData} />
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
          <MostReadContainer
            mostReadEndpointOverride={mostReadEndpointOverride}
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
