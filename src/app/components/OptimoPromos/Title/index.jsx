import React from 'react';
import { node, string } from 'prop-types';
import StyledTitle from './index.styles';

const Title = ({ children, service, className, as }) => {
  return (
    <StyledTitle as={as} className={className} service={service}>
      {children}
    </StyledTitle>
  );
};

Title.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
  className: string,
  as: string,
};

Title.defaultProps = { className: '', as: '' };

export default Title;
