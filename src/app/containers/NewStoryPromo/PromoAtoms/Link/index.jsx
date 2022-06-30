import React from 'react';
import { node, string } from 'prop-types';
import StyledLink from './index.styles';

const Link = ({ className, children, to, id }) => {
  return (
    <StyledLink className={className} href={to} aria-labelledby={id}>
      {children}
    </StyledLink>
  );
};

Link.propTypes = {
  className: string.isRequired,
  children: node.isRequired,
  to: string.isRequired,
  id: string.isRequired,
};

export default Link;
