import React from 'react';
import { node, string } from 'prop-types';
import { TitleOnly, TitleWithContent } from './index.styles';

const Title = ({ children, service, className, titleTagOverride }) => {
  const TitleWrapper =
    titleTagOverride === 'div' ? TitleOnly : TitleWithContent;
  return (
    <TitleWrapper as={titleTagOverride} className={className} service={service}>
      {children}
    </TitleWrapper>
  );
};

Title.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
  className: string,
  titleTagOverride: string,
};

Title.defaultProps = { className: '', titleTagOverride: 'h3' };

export default Title;
