import React from 'react';
import Helmet from 'react-helmet';
import { arrayOf, string, shape } from 'prop-types';
import propTypeCheck from '../Metadata/propTypesCheck';

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
    image,
    thumbnailUrl: logoUrl,
    mainEntityOfPage,
  };

  if (type === 'Article') {
    const articleSpecificSchema = {
      headline: seoHeadline,
      datePublished: firstPublished,
      dateModified: lastUpdated,
      author,
      about,
    };

    Object.assign(linkMetadata, articleSpecificSchema);
  }

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
  firstPublished: (props, propName) =>
    propTypeCheck(props, propName, 'LinkedData', string.isRequired),
  lastUpdated: (props, propName) =>
    propTypeCheck(props, propName, 'LinkedData', string.isRequired),
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

  // custom propType checks used
  // eslint doesn't recognise that props are required
  firstPublished: undefined,
  lastUpdated: undefined,
};

export default LinkedData;
