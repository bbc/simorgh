import React, { useContext } from 'react';
import styled from 'styled-components';
import { string, node } from 'prop-types';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUIN,
} from '@bbc/gel-foundations/spacings';
import { C_METAL } from '@bbc/psammead-styles/colours';
import { getParagon } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { ServiceContext } from '#contexts/ServiceContext';
import MostReadContainer from '#containers/MostRead';
import mostReadShape from '#containers/MostRead/utilities/mostReadShape';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import MetadataContainer from '#containers/Metadata';
import Grid, { GelPageGrid } from '#app/components/Grid';

const StyledMain = styled.main.attrs({ role: 'main' })`
  flex-grow: 1;
  margin: 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin: 0 ${GEL_SPACING_DBL};
  }
`;

const ConstrainedWrapper = styled.div`
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin-bottom: ${GEL_SPACING_QUIN};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    width: 100%; /* Needed for IE11 */
    margin: 0 auto ${GEL_SPACING_QUIN};
    max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  }
`;

const HeadingOne = styled.h1.attrs({
  id: 'content',
  tabIndex: '-1',
})`
  color: ${C_METAL};
  ${({ script }) => script && getParagon(script)};
  ${({ service }) => getSansRegular(service)};
  margin: 0;
  padding: ${GEL_SPACING_TRPL} 0 ${GEL_SPACING};
`;

const StyledGelPageGrid = styled(GelPageGrid)`
  flex-grow: 1;
`;

const MostReadPage = ({ pageData, mostReadEndpointOverride }) => {
  const {
    service,
    script,
    dir,
    lang,
    mostRead: { header },
  } = useContext(ServiceContext);

  const MostReadWrapper = ({ children }) => (
    <ConstrainedWrapper>
      <HeadingOne script={script} service={service}>
        {header}
      </HeadingOne>

      <StyledGelPageGrid
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
            group5: 3,
          }}
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: 6,
            group5: 12,
          }}
        >
          {children}
        </Grid>
      </StyledGelPageGrid>
    </ConstrainedWrapper>
  );

  MostReadWrapper.propTypes = {
    children: node.isRequired,
  };

  return (
    <>
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <MetadataContainer
        title={header}
        lang={lang}
        description="mostread"
        openGraphType="website"
      />

      <StyledMain>
        <MostReadContainer
          mostReadEndpointOverride={mostReadEndpointOverride}
          wrapper={MostReadWrapper}
          columnLayout="oneColumn"
          initialData={pageData}
        />
      </StyledMain>
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
