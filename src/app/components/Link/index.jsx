import React from 'react';
import styled from 'styled-components';
import { string, boolean } from 'prop-types';
import { C_WHITE, GEL_SPACING } from '../../lib/constants/styles';

const getInline = props => {
  const { inline } = props;
  return inline;
};

const StyledLink = styled.a`
  color: ${C_WHITE};
  font-weight: 700; /* Used instead of Reith Sans Bold since it is not worth the performance cost in this case. */
  text-decoration: none;
  padding: ${GEL_SPACING}px 0;
  display: ${props => (getInline(props) === true ? 'inline' : 'block')};
  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const Link = ({ text, href, inline }) => (
  <StyledLink inline={inline} href={href}>
    {text}
  </StyledLink>
);

Link.defaultProps = {
  inline: false,
};

Link.propTypes = {
  href: string.isRequired,
  text: string.isRequired,
  inline: boolean,
};

export default Link;
