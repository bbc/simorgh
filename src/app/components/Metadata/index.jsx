import React from 'react';
import Helmet from 'react-helmet';
import { arrayOf, bool, shape, string, number } from 'prop-types';

const renderAmpHtml = (ampLink, isAmp) => {
  if (isAmp) {
    return null;
  }
  return <link rel="amphtml" href={ampLink} />;
};

const getAuthor = articleAuthor => (
  <meta name="article:author" content={articleAuthor} />
);

const getModifiedTime = timeLastPublished => (
  <meta name="article:modified_time" content={timeLastPublished} />
);

const getPublishedTime = timeFirstPublished => (
  <meta name="article:published_time" content={timeFirstPublished} />
);

const getArticleSection = articleSection =>
  articleSection ? (
    <meta name="article:section" content={articleSection} />
  ) : null;

const getMetaTags = metaTags => {
  return metaTags.map(tag => (
    <meta name="article:tag" content={tag} key={tag} />
  ));
};

const Metadata = ({
  isAmp,
  alternateLinks,
  ampLink,
  appleTouchIcon,
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
  themeColor,
  timeFirstPublished,
  timeLastPublished,
  title,
  twitterCreator,
  twitterSite,
  type,
}) => {
  const htmlAttributes = { lang };

  if (isAmp) {
    htmlAttributes.amp = ''; // empty value as this makes Helmet render 'amp' as per https://www.ampproject.org/docs/fundamentals/spec#ampd
  }

  return (
    <Helmet htmlAttributes={htmlAttributes}>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet="utf-8" />
      <meta name="robots" content="noodp,noydir" />
      <meta name="theme-color" content={themeColor} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <title>
        {title} - {brandName}
      </title>
      <link rel="canonical" href={canonicalLink} />
      {alternateLinks.map(alternate => (
        <link
          rel="alternate"
          href={alternate.href}
          hrefLang={alternate.hrefLang}
          key={alternate.hrefLang}
        />
      ))}
      {renderAmpHtml(ampLink, isAmp)}
      {type === 'article' ? getAuthor(articleAuthor) : null}
      {type === 'article' ? getModifiedTime(timeLastPublished) : null}
      {type === 'article' ? getPublishedTime(timeFirstPublished) : null}
      {type === 'article' ? getArticleSection(articleSection) : null}
      {type === 'article' ? getMetaTags(metaTags) : null}
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
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href={appleTouchIcon} />
    </Helmet>
  );
};

Metadata.propTypes = {
  isAmp: bool.isRequired,
  alternateLinks: arrayOf(
    shape({
      href: string.isRequired,
      hrefLang: string.isRequired,
    }),
  ),
  ampLink: string.isRequired,
  appleTouchIcon: string.isRequired,
  articleAuthor: string,
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
  metaTags: arrayOf(string),
  themeColor: string.isRequired,
  timeFirstPublished: number,
  timeLastPublished: number,
  title: string.isRequired,
  twitterCreator: string.isRequired,
  twitterSite: string.isRequired,
  type: string.isRequired,
};

Metadata.defaultProps = {
  alternateLinks: [],
  articleSection: null,
  articleAuthor: null,
  metaTags: [],
  timeFirstPublished: null,
  timeLastPublished: null,
};

export default Metadata;
