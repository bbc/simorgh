import React, { Fragment } from 'react';
import { arrayOf, string } from 'prop-types';

const ResourceHints = ({ assetOrigins }) => (
  <Fragment>
    {assetOrigins.map(origin => (
      <link
        rel="preconnect"
        key={origin}
        href={origin}
        crossOrigin="anonymous"
      />
    ))}
    {assetOrigins.map(origin => (
      <link rel="dns-prefetch" key={origin} href={origin} />
    ))}
  </Fragment>
);

ResourceHints.propTypes = {
  assetOrigins: arrayOf(string).isRequired,
};

export default ResourceHints;
