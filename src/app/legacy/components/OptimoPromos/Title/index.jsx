import React from 'react';
import StyledTitle from './index.styles';

const Title = ({ children, className = '', as = '' }) => {
  return (
    <StyledTitle as={as} {...(className ? { className } : undefined)}>
      {children}
    </StyledTitle>
  );
};

export default Title;
