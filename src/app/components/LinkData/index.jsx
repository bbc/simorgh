import React from 'react';
import Helmet from 'react-helmet';
import { string } from 'prop-types';

const LinkData = ({
  type,
  seoHeadline,
  firstPublished,
  lastUpdated,
  optimoId,
  service,
}) => {
  const imgObject = 'ImageObject';
  const newsMediaOrg = 'NewsMediaOrganization';
  const url =
    'https://www.bbc.com/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1';

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

  // const linkMetadata = {
  //   '@context': 'http://schema.org',
  //   '@type': type,
  //   url: `https://www.bbc.com/${service}/articles/${optimoId}`,
  //   publisher,
  //   datePublished: firstPublished,
  //   dateModified: lastUpdated,
  //   headline: seoHeadline,
  //   image,
  //   thumbnailUrl: url,
  //   author,
  // };

  return (
    <Helmet>
      <script type="application/ld+json">{`
        {
          "@context": "http://schema.org",
          '@type': ${type},
          url: ${`https://www.bbc.com/${service}/articles/${optimoId}`},
          publisher: ${publisher},
          datePublished: ${firstPublished},
          dateModified: ${lastUpdated},
          headline: ${seoHeadline},
          image: ${image},
          thumbnailUrl: ${url},
          author: ${author},
        }
    `}</script>
    </Helmet>
  );
};

LinkData.propTypes = {
  type: string.isRequired,
  seoHeadline: string.isRequired,
  firstPublished: string.isRequired,
  lastUpdated: string.isRequired,
  optimoId: string.isRequired,
  service: string.isRequired,
};

export default LinkData;
