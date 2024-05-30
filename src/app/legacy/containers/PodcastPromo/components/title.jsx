import React from 'react';
import styled from '@emotion/styled';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';
import { getGreatPrimer } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';

const Heading = styled.h2`
  ${({ script }) => getGreatPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  display: inline;
  color: ${props => props.theme.palette.EBON};

  > svg {
    margin-left: 0;
    width: 1.375rem;
    height: 1.375rem;
    fill: currentColor;
    position: relative;
    bottom: 0.3125rem;
    ${({ dir }) => (dir === 'ltr' ? `right: 0.1875rem;` : `left: 0.1875rem;`)}
    @media screen and (forced-colors: active) {
      fill: canvasText;
    }
  }
`;

const Wrapper = styled.div`
  margin: 0 0 ${GEL_SPACING_DBL};
`;

const Title = ({ children, ...props }) => (
  <Wrapper>
    <Heading {...props}>
      {mediaIcons.podcast}
      {children}
    </Heading>
  </Wrapper>
);

export default Title;
