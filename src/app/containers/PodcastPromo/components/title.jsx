import React from 'react';
import styled from '@emotion/styled';
import { node } from 'prop-types';
import { mediaIcons } from '@bbc/psammead-assets/svgs';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { getGreatPrimer } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { C_EBON } from '@bbc/psammead-styles/colours';

const Heading = styled.h2`
  ${({ script }) => getGreatPrimer(script)};
  ${({ service }) => getSansRegular(service)};
  display: inline;
  color: ${C_EBON};

  > svg {
    margin-left: 0;
    width: 1.375rem;
    height: 1.375rem;
    fill: currentColor;
    position: relative;
    bottom: 0.3125rem;
    right: 0.1875rem;
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
