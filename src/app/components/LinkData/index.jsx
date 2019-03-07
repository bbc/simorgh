import React, { Fragment } from 'react';
import { string } from 'prop-types';

const LinkData = ({ type, seoHeadline }) => {
  const linkMetadata = {};

  linkMetadata['@context'] = 'http://schema.org';
  linkMetadata['@type'] = type;
  linkMetadata.headline = seoHeadline;

  return (
    <Fragment>
      {/* eslint-disable react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: linkMetadata }}
      />
    </Fragment>
  );
};

LinkData.propTypes = {
  type: string.isRequired,
  seoHeadline: string.isRequired,
};

export default LinkData;
