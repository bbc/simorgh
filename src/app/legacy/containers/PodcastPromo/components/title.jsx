import React from 'react';
import styled from '@emotion/styled';
import { node } from 'prop-types';
import { mediaIcons } from '#legacy/psammead-assets/src/svgs';
import { GEL_SPACING_DBL } from '#legacy/gel-foundations/src/spacings';
import { getGreatPrimer } from '#legacy/gel-foundations/src/typography';
import { getSansRegular } from '#legacy/psammead-styles/src/font-styles';
import { C_EBON } from '#legacy/psammead-styles/src/colours';

const Heading = styled.h2`
  ${({ script }) => getGreatPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  display: inline;
  color: ${C_EBON};

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

Title.propTypes = {
  children: node.isRequired,
};

export default Title;
