import React from 'react';
import { node, string } from 'prop-types';
import { TitleOnly, TitleWithContent } from './index.styles';

const Title = ({ children, service, className, as }) => {
  const TitleWrapper = as === 'div' ? TitleOnly : TitleWithContent;
  return (
    <TitleWrapper as={as} className={className} service={service}>
      {children}
    </TitleWrapper>
  );
};

Title.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
  className: string,
  as: string,
};

Title.defaultProps = { className: '', as: 'div' };

export default Title;
