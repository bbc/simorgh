import React, { Fragment } from 'react';
import { arrayOf, string } from 'prop-types';

const ResourceHints = ({ assetOrigins }) => (
  <Fragment>
    {assetOrigins.map(origin => (
      <link rel="preconnect" href={origin} crossOrigin="anonymous" />
    ))}
    {assetOrigins.map(origin => (
      <link rel="dns-prefetch" href={origin} />
    ))}
  </Fragment>
);

ResourceHints.propTypes = {
  assetOrigins: arrayOf(string).isRequired,
};

export default ResourceHints;
