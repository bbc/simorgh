import React, { Fragment } from 'react';
import { arrayOf, string } from 'prop-types';

const prefix = 'https://';

const ResourceHints = ({ assetDomains }) => (
  <Fragment>
    {assetDomains.map(domain => (
      <link rel="preconnect" href={prefix + domain} crossOrigin="anonymous" />
    ))}
    {assetDomains.map(domain => (
      <link rel="dns-prefetch" href={prefix + domain} />
    ))}
  </Fragment>
);

ResourceHints.propTypes = {
  assetDomains: arrayOf(string).isRequired,
};

export default ResourceHints;
