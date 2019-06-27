import React from 'react';
import Helmet from 'react-helmet';
import { arrayOf, bool, oneOf, shape, string, number } from 'prop-types';

const renderAmpHtml = (ampLink, isAmp) => {
  if (isAmp) {
    return null;
  }
  return <link rel="amphtml" href={ampLink} />;
};

const getAuthor = (articleAuthor, showArticleTags) => {
  return showArticleTags ? (
    <meta name="article:author" content={articleAuthor} />
  ) : null;
};

const getModifiedTime = (timeLastPublished, showArticleTags) => {
  return showArticleTags ? (
    <meta name="article:modified_time" content={timeLastPublished} />
  ) : null;
};

const getPublishedTime = (timeFirstPublished, showArticleTags) => {
  return showArticleTags ? (
    <meta name="article:published_time" content={timeFirstPublished} />
  ) : null;
};

const getArticleSection = (articleSection, showArticleTags) => {
  return articleSection && showArticleTags ? (
    <meta name="article:section" content={articleSection} />
  ) : null;
};

const getMetaTags = (metaTags, showArticleTags) => {
  if (!showArticleTags) {
    return null;
  }

  return metaTags.map(tag => (
    <meta name="article:tag" content={tag} key={tag} />
  ));
};

const iconAssetUrl = (service, size) =>
  `https://news.files.bbci.co.uk/include/articles/public/${service}/images/icons/icon-${size}.png`;

const getIconSizes = iconType => {
  const appleTouchIconSizes = [
    '72x72',
    '96x96',
    '128x128',
    '144x144',
    '152x152',
    '192x192',
    '384x384',
    '512x512',
  ];
  const iconSizes = ['72x72', '96x96', '192x192'];

  return iconType === 'apple-touch-icon' ? appleTouchIconSizes : iconSizes;
};

const getIconLinks = (service, iconType) => {
  const availableIconSizes = getIconSizes(iconType);
  if (iconType === 'apple-touch-icon') {
    return availableIconSizes.map(size => (
      <link
        rel="apple-touch-icon"
        sizes={size}
        href={iconAssetUrl(service, size)}
      />
    ));
  }
  return availableIconSizes.map(size => (
    <link
      rel="icon"
      type="image/png"
      href={iconAssetUrl(service, size)}
      sizes={size}
    />
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
  dir,
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
  service,
  showArticleTags,
}) => {
  const htmlAttributes = { dir, lang };

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
      {getAuthor(articleAuthor, showArticleTags)}
      {getModifiedTime(timeLastPublished, showArticleTags)}
      {getPublishedTime(timeFirstPublished, showArticleTags)}
      {getArticleSection(articleSection, showArticleTags)}
      {getMetaTags(metaTags, showArticleTags)}
      <meta name="apple-mobile-web-app-title" content={brandName} />
      <meta name="application-name" content={brandName} />
      <meta name="description" content={description} />
      <meta name="fb:admins" content={facebookAdmin} />
      <meta name="fb:app_id" content={facebookAppID} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta
        name="msapplication-TileImage"
        content={iconAssetUrl(service, '144x144')}
      />
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
      <link rel="apple-touch-icon" href={appleTouchIcon} />
      {getIconLinks(service, 'apple-touch-icon')}
      {getIconLinks(service, 'icon')}
      <link
        rel="apple-touch-startup-image"
        href={iconAssetUrl(service, '512x512')}
      />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
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
  dir: oneOf(['ltr', 'rtl']).isRequired,
  facebookAdmin: number.isRequired,
  facebookAppID: number.isRequired,
  lang: string.isRequired,
  locale: string.isRequired,
  metaTags: arrayOf(string),
  themeColor: string.isRequired,
  timeFirstPublished: string,
  timeLastPublished: string,
  title: string.isRequired,
  twitterCreator: string.isRequired,
  twitterSite: string.isRequired,
  type: string.isRequired,
  service: string.isRequired,
  showArticleTags: bool.isRequired,
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
