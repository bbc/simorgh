import React from 'react';
import { arrayOf, string } from 'prop-types';

const ResourceHints = ({ assetOrigins }) => (
  <>
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
  </>
);

ResourceHints.propTypes = {
  assetOrigins: arrayOf(string).isRequired,
};

export default ResourceHints;
