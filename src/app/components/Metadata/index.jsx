import React from 'react';
import Helmet from 'react-helmet';
import { arrayOf, bool, oneOf, shape, string, number } from 'prop-types';
import { getIconLinks, getIconAssetUrl } from './helpers/iconLinks';

const renderAmpHtml = (ampLink, isAmp) => {
  if (isAmp) {
    return null;
  }
  return <link rel="amphtml" href={ampLink} />;
};

const Metadata = ({
  isAmp,
  alternateLinks,
  ampLink,
  appleTouchIcon,
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
  themeColor,
  title,
  twitterCreator,
  twitterSite,
  type,
  service,
  iconSizes,
}) => {
  const htmlAttributes = { dir, lang };
  const pageTitle = `${title} - ${brandName}`;

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
      <title>{pageTitle}</title>
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
      <meta name="apple-mobile-web-app-title" content={brandName} />
      <meta name="application-name" content={brandName} />
      <meta name="description" content={description} />
      <meta name="fb:admins" content={facebookAdmin} />
      <meta name="fb:app_id" content={facebookAppID} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta
        name="msapplication-TileImage"
        content={getIconAssetUrl(service, '144x144')}
      />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={defaultImage} />
      <meta name="og:image:alt" content={defaultImageAltText} />
      <meta name="og:locale" content={locale} />
      <meta name="og:site_name" content={brandName} />
      <meta name="og:title" content={pageTitle} />
      <meta name="og:type" content={type} />
      <meta name="og:url" content={canonicalLink} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:alt" content={defaultImageAltText} />
      <meta name="twitter:image:src" content={defaultImage} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={pageTitle} />
      <link rel="apple-touch-icon" href={appleTouchIcon} />
      {getIconLinks(service, iconSizes)}
      <link
        rel="apple-touch-startup-image"
        href={getIconAssetUrl(service, '512x512')}
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
  themeColor: string.isRequired,
  title: string.isRequired,
  twitterCreator: string.isRequired,
  twitterSite: string.isRequired,
  type: string.isRequired,
  service: string.isRequired,
  iconSizes: shape({
    'apple-touch-icon-sizes': arrayOf(string),
    icon: arrayOf(string),
  }),
};

Metadata.defaultProps = {
  alternateLinks: [],
  iconSizes: null,
};

export default Metadata;
