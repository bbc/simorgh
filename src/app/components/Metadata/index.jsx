import React from 'react';
import Helmet from 'react-helmet';
import { arrayOf, bool, string, number } from 'prop-types';

const Metadata = ({
  isAmp,
  articleAuthor,
  articleSection,
  brandName,
  canonicalLink,
  defaultImage,
  defaultImageAltText,
  description,
  facebookAdmin,
  facebookAppID,
  lang,
  locale,
  metaTags,
  timeFirstPublished,
  timeLastUpdated,
  title,
  twitterCreator,
  twitterSite,
  type,
}) => {
  const htmlAttributes = { lang };

  if (isAmp) {
    htmlAttributes.amp = ''; // empty value as this makes Helmet render 'amp' as per https://www.ampproject.org/docs/fundamentals/spec#ampd
  }

  const injectAmpScript = isAmp ? (
    <script key="amp" async src="https://cdn.ampproject.org/v0.js" />
  ) : null;

  return (
    <Helmet htmlAttributes={htmlAttributes}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <title>
        {title} &#8211; {brandName}
      </title>
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
      <meta name="description" content={description} />
      <meta name="fb:admins" content={facebookAdmin} />
      <meta name="fb:app_id" content={facebookAppID} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={defaultImage} />
      <meta name="og:image:alt" content={defaultImageAltText} />
      <meta name="og:locale" content={locale} />
      <meta name="og:site_name" content={brandName} />
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
      {injectAmpScript}
    </Helmet>
  );
};

Metadata.propTypes = {
  isAmp: bool.isRequired,
  articleAuthor: string.isRequired,
  articleSection: string,
  brandName: string.isRequired,
  canonicalLink: string.isRequired,
  defaultImage: string.isRequired,
  defaultImageAltText: string.isRequired,
  description: string.isRequired,
  facebookAdmin: number.isRequired,
  facebookAppID: number.isRequired,
  lang: string.isRequired,
  locale: string.isRequired,
  metaTags: arrayOf(string).isRequired,
  timeFirstPublished: string.isRequired,
  timeLastUpdated: string.isRequired,
  title: string,
  twitterCreator: string.isRequired,
  twitterSite: string.isRequired,
  type: string.isRequired,
};

Metadata.defaultProps = {
  articleSection: null,
  title: '', // defaulting as an empty string because Optimo cannot produce seoHeadlines at this time
};

export default Metadata;
