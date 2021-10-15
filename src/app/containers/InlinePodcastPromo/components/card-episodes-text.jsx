import React from 'react';
import { node } from 'prop-types';
import styled from '@emotion/styled';
import { mediaIcons } from '@bbc/psammead-assets/svgs';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import {
  GEL_SPACING,
  GEL_SPACING_HLF_TRPL,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/spacings';
import { C_METAL } from '@bbc/psammead-styles/colours';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_B_MIN_WIDTH,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

const EpisodesText = styled.p`
  display: inline;
  ${({ script }) => getPica(script)}
  ${({ service }) => getSansRegular(service)}
  color: ${C_METAL};
  > svg {
    fill: currentColor;
    color: unset;
    width: ${GEL_SPACING_DBL};
    height: ${GEL_SPACING_DBL};
    position: relative;
    bottom: 0.125rem;
    ${({ dir }) => (dir === 'ltr' ? `right: 0.1875rem;` : `left: 0.1875rem;`)}
  }

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_SPACING_HLF_TRPL};
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    margin: 0 ${GEL_SPACING};
  }

  @media (min-width: calc(${GEL_GROUP_1_SCREEN_WIDTH_MIN} + 1.25rem)) {
    margin: 0 ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_B_MIN_WIDTH}rem) {
    margin: 0 ${GEL_SPACING_HLF_TRPL};
  }

  @media (min-width: calc(${GEL_GROUP_B_MIN_WIDTH}rem + 2.5rem)) {
    margin: 0 ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0 ${GEL_SPACING_HLF_TRPL};
  }
`;

const CardEpisodesText = ({ children, ...props }) => (
  <>
    <EpisodesText {...props}>
      {mediaIcons.seriesstack}
      {children}
    </EpisodesText>
  </>
);

CardEpisodesText.propTypes = {
  children: node.isRequired,
};

export default CardEpisodesText;
