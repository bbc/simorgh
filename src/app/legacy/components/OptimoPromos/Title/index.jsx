import React, { useContext } from 'react';
import StyledTitle from './index.styles';
import PromoContext from '../PromoContext';

const Title = ({ children, className = '', as = '' }) => {
  const { service } = useContext(PromoContext);
  return (
    <StyledTitle as={as} service={service} {...(className && { className })}>
      {children}
    </StyledTitle>
  );
};

export default Title;
