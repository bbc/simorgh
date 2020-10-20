import React from 'react';
import { node } from 'prop-types';

const MostReadSection = ({ children }) => (
  // eslint-disable-next-line jsx-a11y/no-redundant-roles
  <section role="region" aria-labelledby="Most-Read" data-e2e="most-read">
    {children}
  </section>
);

MostReadSection.propTypes = {
  children: node.isRequired,
};

export default MostReadSection;
