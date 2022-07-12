import React from 'react';
import { node, string } from 'prop-types';
import { TitleWithPadding, TitleNoPadding } from './index.styles';

const Heading = ({ children, service, className, headingTagOverride }) => {
  const TitleWrapper =
    headingTagOverride === 'div' ? TitleNoPadding : TitleWithPadding;
  return (
    <TitleWrapper
      as={headingTagOverride}
      className={className}
      service={service}
    >
      {children}
    </TitleWrapper>
  );
};

Heading.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
  className: string,
  headingTagOverride: string,
};

Heading.defaultProps = { className: '', headingTagOverride: 'h3' };

export default Heading;
