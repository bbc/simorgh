import React from 'react';
import { node, string, shape } from 'prop-types';
import { scriptPropType } from '#legacy/gel-foundations/src/prop-types';
import H3 from './index.styles';

const Heading = ({
  children,
  script,
  service,
  className,
  headingTagOverride,
}) => {
  return (
    <H3
      as={headingTagOverride}
      className={className}
      script={script}
      service={service}
    >
      {children}
    </H3>
  );
};

Heading.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  className: string,
  headingTagOverride: string,
};

Heading.defaultProps = { className: '', headingTagOverride: 'h3' };

export default Heading;
