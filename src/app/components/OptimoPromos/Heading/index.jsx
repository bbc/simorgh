import React from 'react';
import { node, string } from 'prop-types';
import H3 from './index.styles';

const Heading = ({ children, service, className, headingTagOverride }) => {
  return (
    <H3 as={headingTagOverride} className={className} service={service}>
      {children}
    </H3>
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
