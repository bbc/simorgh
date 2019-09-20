import React from 'react';
import Helmet from 'react-helmet';
import { string, shape } from 'prop-types';

const LinkedData = ({
  brandName,
  type,
  seoHeadline,
  logoUrl,
  publishingPrinciples,
  canonicalLink,
  pageSpecific,
}) => {
  const imgObject = 'ImageObject';
  const newsMediaOrg = 'NewsMediaOrganization';
  const webPageType = 'WebPage';

  const logo = {
    '@type': imgObject,
    width: 1024,
    height: 576,
    url: logoUrl,
  };

  const image = {
    '@type': imgObject,
    width: 1024,
    height: 576,
    url: logoUrl,
  };

  const publisher = {
    '@type': newsMediaOrg,
    name: brandName,
    publishingPrinciples,
    logo,
  };

  const mainEntityOfPage = {
    '@type': webPageType,
    '@id': canonicalLink,
    name: seoHeadline,
  };

  const linkedMetadata = {
    '@context': 'http://schema.org',
    '@type': type,
    url: canonicalLink,
    publisher,
    image,
    thumbnailUrl: logoUrl,
    mainEntityOfPage,
    ...pageSpecific,
  };

  return (
    <Helmet>
      {/* eslint-disable react/no-danger */}
      <script type="application/ld+json">
        {JSON.stringify(linkedMetadata)}
      </script>
    </Helmet>
  );
};

LinkedData.propTypes = {
  brandName: string.isRequired,
  canonicalLink: string.isRequired,
  type: string.isRequired,
  seoHeadline: string.isRequired,
  publishingPrinciples: string.isRequired,
  logoUrl: string.isRequired,
  pageSpecific: shape({}),
};

LinkedData.defaultProps = {
  pageSpecific: {},
};

export default LinkedData;
