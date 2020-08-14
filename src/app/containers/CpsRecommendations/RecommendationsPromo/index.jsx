import React, { useContext } from 'react';
import { C_GHOST } from '@bbc/psammead-styles/colours';
import { GEL_SPACING_HLF } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import styled from 'styled-components';
import Grid from '../../../components/Grid';
import StoryPromo from '../../StoryPromo';

import { ServiceContext } from '#contexts/ServiceContext';

const StyledStoryPromoWrapper = styled.div`
  > div {
    display: grid;
    margin: ${GEL_SPACING_HLF} 0;
    background-color: ${C_GHOST};
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      margin: ${GEL_SPACING_HLF} 0;
    }
  }
`;

const RecommendationsPromo = item => {
  const { dir } = useContext(ServiceContext); // TODO pass in?
  return (
    <Grid
      columns={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 1,
        group5: 1,
      }}
      enableGelGutters
      dir={dir}
    >
      <StyledStoryPromoWrapper>
        <StoryPromo
          item={item}
          dir={dir}
          isRecommendation
          displaySummary={false}
        />
      </StyledStoryPromoWrapper>
    </Grid>
  );
};

export default RecommendationsPromo;
