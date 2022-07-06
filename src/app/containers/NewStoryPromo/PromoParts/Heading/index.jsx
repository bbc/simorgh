import React from 'react';
import { node, string, shape } from 'prop-types';
import { scriptPropType } from '#legacy/gel-foundations/src/prop-types';
import H3 from './index.styles';

const Heading = ({ children, script, service, className }) => {
  return (
    <H3 className={className} script={script} service={service}>
      {children}
    </H3>
  );
};

Heading.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  className: string,
};

Heading.defaultProps = { className: '' };

export default Heading;
