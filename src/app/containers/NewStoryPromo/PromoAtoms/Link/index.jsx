import React from 'react';
import { node, string } from 'prop-types';
import StyledLink from './index.styles';

const Link = ({ children, href }) => {
  return (
    <StyledLink href={href}>
      <span>{children}</span>
    </StyledLink>
  );
};

Link.propTypes = {
  children: node.isRequired,
  href: string.isRequired,
};

export default Link;
