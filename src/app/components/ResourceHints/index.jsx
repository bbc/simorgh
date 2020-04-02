import React, { Fragment } from 'react';
import { arrayOf, string } from 'prop-types';

const ResourceHints = ({ assetOrigins }) => (
  <>
    {assetOrigins.map((origin) => (
      <Fragment key={origin}>
        <link rel="preconnect" href={origin} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={origin} />
      </Fragment>
    ))}
  </>
);

ResourceHints.propTypes = {
  assetOrigins: arrayOf(string).isRequired,
};

export default ResourceHints;
