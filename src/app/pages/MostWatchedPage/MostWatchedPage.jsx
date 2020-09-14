import React, { useContext } from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import { ServiceContext } from '#contexts/ServiceContext';
import Grid, { GelPageGrid } from '#app/components/Grid';
import IndexMain from '#app/components/PageLayout/IndexMain';
import IndexPageContainer from '#app/components/PageLayout/IndexPageContainer';
import IndexHeading from '#containers/IndexHeading';

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

const MostWatchedPage = () => {
  const {
    dir,
    mostWatched: { header },
  } = useContext(ServiceContext);

  const MostWatchedWrapper = ({ children }) => (
    <>
      <IndexHeading id="content">{header}</IndexHeading>
      <MarginWrapper>
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

  MostWatchedWrapper.propTypes = {
    children: node.isRequired,
  };

  return (
    <>
      <IndexMain data-e2e="most-watched">
        <IndexPageContainer>
          <MostWatchedWrapper>
            <div style={{ display: 'none' }}>
              To be replaced with most watched content
            </div>
          </MostWatchedWrapper>
        </IndexPageContainer>
      </IndexMain>
    </>
  );
};

export default MostWatchedPage;
