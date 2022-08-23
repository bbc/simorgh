import React, { useContext } from 'react';
import { node, string } from 'prop-types';
import StyledTitle from './index.styles';
import PromoContext from '../PromoContext';

const Title = ({ children, className, as }) => {
  const { service } = useContext(PromoContext);
  return (
    <StyledTitle as={as} className={className} service={service}>
      {children}
    </StyledTitle>
  );
};

Title.propTypes = {
  children: node.isRequired,
  as: string,
  className: string,
};

Title.defaultProps = { className: '', as: '' };

export default Title;
