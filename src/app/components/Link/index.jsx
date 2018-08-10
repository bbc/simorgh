import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import { C_WHITE, GEL_SPACING } from '../../lib/constants/styles';

const StyledLink = styled.a`
  color: ${C_WHITE};
  font-weight: 700; /* Used instead of Reith Sans Bold since it is not worth the performance cost in this case. */
  text-decoration: none;
  padding: ${GEL_SPACING}px 0;
  display: block;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const InlineBlockLink = styled(StyledLink)`
  display: inline;
  padding: ${GEL_SPACING}px 0;
`;

const Link = ({ text, href }) => (
  <InlineBlockLink href={href}>{text}</InlineBlockLink>
);

Link.propTypes = {
  href: string.isRequired,
  text: string.isRequired,
};

export default Link;
