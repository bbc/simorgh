import React from 'react';
import styled from '@emotion/styled';
import { node } from 'prop-types';
import { mediaIcons } from '@bbc/psammead-assets/svgs';
import { getGreatPrimer } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { C_EBON } from '@bbc/psammead-styles/colours';

const Heading = styled.strong`
  ${({ script }) => getGreatPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  display: block;
  color: ${C_EBON};

  > svg {
    margin-left: 0;
    width: 1.375rem;
    height: 1.375rem;
    fill: currentColor;
    position: relative;
    bottom: 0.3125rem;
    ${({ dir }) => (dir === 'ltr' ? `right: 0.1875rem;` : `left: 0.1875rem;`)}
  }
`;

const Title = ({ children, ...props }) => (
  <Heading {...props}>
    {mediaIcons.podcast}
    {children}
  </Heading>
);

Title.propTypes = {
  children: node.isRequired,
};

export default Title;
