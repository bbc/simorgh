import React from 'react';
import { node } from 'prop-types';
import styled from '@emotion/styled';
import { mediaIcons } from '@bbc/psammead-assets/svgs';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { C_METAL } from '@bbc/psammead-styles/colours';

const EpisodesText = styled.p`
  display: inline;
  ${({ script }) => getPica(script)};
  ${({ service }) => getSansRegular(service)};
  color: ${C_METAL};
  > svg {
    fill: currentColor;
    color: unset;
    width: ${GEL_SPACING_DBL};
    height: ${GEL_SPACING_DBL};
    position: relative;
    bottom: 0.125rem;
    right: 0.1875rem;
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
