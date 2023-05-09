import React from 'react';
import { node, string } from 'prop-types';

const MostReadSection = ({ children, className }) => (
  <section
    className={className}
    role="region"
    aria-labelledby="Most-Read"
    data-e2e="most-read"
  >
    {children}
  </section>
);

MostReadSection.propTypes = {
  children: node.isRequired,
  className: string,
};

MostReadSection.defaultProps = {
  className: '',
};

export default MostReadSection;
