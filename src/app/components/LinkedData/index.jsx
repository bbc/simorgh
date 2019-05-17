import React from 'react';
import Helmet from 'react-helmet';
import { arrayOf, string, shape } from 'prop-types';

const LinkedData = ({
  brandName,
  type,
  seoHeadline,
  firstPublished,
  lastUpdated,
  logoUrl,
  publishingPrinciples,
  noBylinesPolicy,
  about,
  canonicalLink,
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

  const author = {
    '@type': newsMediaOrg,
    name: brandName,
    logo,
    noBylinesPolicy,
  };

  const mainEntityOfPage = {
    '@type': webPageType,
    '@id': canonicalLink,
    name: seoHeadline,
  };

  const linkMetadata = {
    '@context': 'http://schema.org',
    '@type': type,
    url: canonicalLink,
    publisher,
    datePublished: firstPublished,
    dateModified: lastUpdated,
    headline: seoHeadline,
    image,
    thumbnailUrl: logoUrl,
    author,
    about,
    mainEntityOfPage,
  };

  return (
    <Helmet>
      {/* eslint-disable react/no-danger */}
      <script type="application/ld+json">{JSON.stringify(linkMetadata)}</script>
    </Helmet>
  );
};

LinkedData.propTypes = {
  brandName: string.isRequired,
  canonicalLink: string.isRequired,
  type: string.isRequired,
  seoHeadline: string.isRequired,
  firstPublished: string.isRequired,
  lastUpdated: string.isRequired,
  publishingPrinciples: string.isRequired,
  noBylinesPolicy: string.isRequired,
  logoUrl: string.isRequired,
  about: arrayOf(
    shape({
      '@type': string.isRequired,
      alternateName: string,
      name: string.isRequired,
      sameAs: arrayOf(string.isRequired),
    }),
  ),
};

LinkedData.defaultProps = {
  about: undefined,
};

export default LinkedData;
