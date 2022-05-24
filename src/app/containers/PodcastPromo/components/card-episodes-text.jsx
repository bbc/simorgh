import React from 'react';
import { node } from 'prop-types';
import styled from '@emotion/styled';
import { mediaIcons } from '#legacy/psammead-assets/src/svgs';
import { getPica } from '#legacy/gel-foundations/src/typography';
import { getSansRegular } from '#legacy/psammead-styles/src/font-styles';
import { GEL_SPACING_DBL } from '#legacy/gel-foundations/src/spacings';
import { C_METAL } from '#legacy/psammead-styles/src/colours';

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
    @media screen and (forced-colors: active) {
      fill: canvasText;
    }
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
