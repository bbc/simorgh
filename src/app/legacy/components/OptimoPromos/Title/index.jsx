import React, { use } from 'react';
import StyledTitle from './index.styles';
import PromoContext from '../PromoContext';

const Title = ({ children, className = '', as = '' }) => {
  const { service } = use(PromoContext);
  return (
    <StyledTitle
      as={as}
      service={service}
      {...(className ? { className } : undefined)}
    >
      {children}
    </StyledTitle>
  );
};

export default Title;
