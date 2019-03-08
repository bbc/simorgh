import React, { Fragment } from 'react';
import { string, number } from 'prop-types';

const LinkData = ({
  type,
  seoHeadline,
  firstPublished,
  lastUpdated,
  optimoUrn,
  service,
}) => {
  const linkMetadata = {};

  const imgObject = 'ImageObject';
  const newsMediaOrg = 'NewsMediaOrganization';
  const url =
    'https://www.bbc.com/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1';

  const optimoId = optimoUrn.split(':').pop();

  const logo = {
    '@type': imgObject,
    width: 1024,
    height: 576,
    url,
  };

  const image = {
    '@type': imgObject,
    width: 1024,
    height: 576,
    url,
  };

  const publisher = {
    '@type': newsMediaOrg,
    name: service,
    publishingPrinciples: 'http://www.bbc.com/news/help-41670342',
    logo,
  };

  const author = {
    '@type': newsMediaOrg,
    name: service,
    logo,
    noBylinesPolicy: 'http://www.bbc.com/news/help-41670342#authorexpertise',
  };

  linkMetadata['@context'] = 'http://schema.org';
  linkMetadata['@type'] = type;
  linkMetadata.url = `https://www.bbc.com/${service}/articles/${optimoId}`;
  linkMetadata.publisher = publisher;
  linkMetadata.datePublished = new Date(firstPublished).toISOString();
  linkMetadata.dateModified = new Date(lastUpdated).toISOString();
  linkMetadata.headline = seoHeadline;
  linkMetadata.image = image;
  linkMetadata.thumbnailUrl = url;
  linkMetadata.author = author;

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
  firstPublished: number.isRequired,
  lastUpdated: number.isRequired,
  optimoUrn: string.isRequired,
  service: string.isRequired,
};

export default LinkData;
