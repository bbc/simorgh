import React from 'react';
import Helmet from 'react-helmet';
import { arrayOf, bool, string } from 'prop-types';

const Metadata = ({
  amp,
  articleAuthor,
  articleSection,
  canonicalLink,
  defaultImage,
  defaultImageAltText,
  description,
  lang,
  locale,
  metaTags,
  opengraphSiteName,
  timeFirstPublished,
  timeLastUpdated,
  title,
  twitterCreator,
  twitterSite,
  type,
}) => {
  const htmlAttributes = { lang };

  if (amp) {
    htmlAttributes.amp = amp;
  }

  return (
    <Helmet htmlAttributes={htmlAttributes}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <title>{title}</title>
      <link rel="canonical" href={canonicalLink} />
      <meta name="article:author" content={articleAuthor} />
      <meta name="article:modified_time" content={timeLastUpdated} />
      <meta name="article:published_time" content={timeFirstPublished} />
      {articleSection ? (
        <meta name="article:section" content={articleSection} />
      ) : null}
      {metaTags.map(tag => (
        <meta name="article:tag" content={tag} key={tag} />
      ))}
      <meta name="og:description" content={description} />
      <meta name="og:image" content={defaultImage} />
      <meta name="og:image:alt" content={defaultImageAltText} />
      <meta name="og:locale" content={locale} />
      <meta name="og:site_name" content={opengraphSiteName} />
      <meta name="og:title" content={title} />
      <meta name="og:type" content={type} />
      <meta name="og:url" content={canonicalLink} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:alt" content={defaultImageAltText} />
      <meta name="twitter:image:src" content={defaultImage} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={title} />
    </Helmet>
  );
};

Metadata.propTypes = {
  amp: bool.isRequired,
  articleAuthor: string.isRequired,
  articleSection: string,
  canonicalLink: string.isRequired,
  defaultImage: string.isRequired,
  defaultImageAltText: string.isRequired,
  description: string.isRequired,
  lang: string.isRequired,
  locale: string.isRequired,
  metaTags: arrayOf(string).isRequired,
  opengraphSiteName: string.isRequired,
  timeFirstPublished: string.isRequired,
  timeLastUpdated: string.isRequired,
  title: string.isRequired,
  twitterCreator: string.isRequired,
  twitterSite: string.isRequired,
  type: string.isRequired,
};

Metadata.defaultProps = {
  articleSection: null,
};

export default Metadata;
