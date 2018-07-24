import React, { Fragment } from 'react';

const ResourceHints = () => (
  <Fragment>
    <link
      rel="preconnect"
      href="https://ichef.bbci.co.uk"
      crossOrigin="anonymous"
    />
    <link
      rel="preconnect"
      href="https://static.bbci.co.uk"
      crossOrigin="anonymous"
    />
    <link
      rel="preconnect"
      href="https://gel.files.bbci.co.uk"
      crossOrigin="anonymous"
    />
    <link rel="dns-prefetch" href="https://ichef.bbci.co.uk" />
    <link rel="dns-prefetch" href="https://static.bbci.co.uk" />
    <link rel="dns-prefetch" href="https://gel.files.bbci.co.uk" />
  </Fragment>
);

export default ResourceHints;
