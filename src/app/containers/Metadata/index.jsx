import React, { useContext } from 'react';
import { string, node, shape, arrayOf } from 'prop-types';
import Helmet from 'react-helmet';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import {
  getIconAssetUrl,
  getIconLinks,
  renderAmpHtml,
  getAppleTouchUrl,
  renderAlternateLinks,
} from './utils';

const ENGLISH_SERVICES = ['news'];
const FACEBOOK_ADMIN_ID = 100004154058350;
const FACEBOOK_APP_ID = 1609039196070050;
const iconSizes = {
  'apple-touch-icon': [
    '72x72',
    '96x96',
    '128x128',
    '144x144',
    '152x152',
    '192x192',
    '384x384',
    '512x512',
  ],
  icon: ['72x72', '96x96', '192x192'],
};

const renderTags = tags =>
  tags.map(({ thingLabel: content }) => (
    <meta name="article:tag" content={content} key={content} />
  ));

const MetadataContainer = ({
  title,
  lang,
  description,
  openGraphType,
  aboutTags,
  mentionsTags,
  image,
  imageAltText,
  children,
}) => {
  const {
    isAmp,
    canonicalLink,
    ampLink,
    canonicalUkLink,
    ampUkLink,
    canonicalNonUkLink,
    ampNonUkLink,
  } = useContext(RequestContext);

  const {
    service,
    brandName,
    defaultImage,
    defaultImageAltText,
    dir,
    locale,
    isoLang,
    themeColor,
    twitterCreator,
    twitterSite,
  } = useContext(ServiceContext);
  const appleTouchIcon = getAppleTouchUrl(service);
  const isEnglishService = ENGLISH_SERVICES.includes(service);
  const alternateLinksEnglishSites = [
    {
      href: isAmp ? ampNonUkLink : canonicalNonUkLink,
      hrefLang: 'x-default',
    },
    {
      href: isAmp ? ampNonUkLink : canonicalNonUkLink,
      hrefLang: 'en',
    },
    {
      href: isAmp ? ampUkLink : canonicalUkLink,
      hrefLang: 'en-gb',
    },
  ];
  const alternateLinksWsSites = [
    {
      href: canonicalLink,
      hrefLang: isoLang,
    },
  ];

  const htmlAttributes = {
    dir,
    lang,
    ...(isAmp && { amp: '' }), // empty value as this makes Helmet render 'amp' as per https://www.ampproject.org/docs/fundamentals/spec#ampd
  };

  const pageTitle = `${title} - ${brandName}`;

  const metaImage = image || defaultImage;
  const metaImageAltText = imageAltText || defaultImageAltText;

  const contentSecurityPolicyContent =
    'default-src https://toggles.test.api.bbci.co.uk;';
  return (
    <Helmet htmlAttributes={htmlAttributes}>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        httpEquiv="Content-Security-Policy"
        content={contentSecurityPolicyContent}
      />
      <meta charSet="utf-8" />
      <meta name="robots" content="noodp,noydir" />
      <meta name="theme-color" content={themeColor} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <title>{pageTitle}</title>
      <link rel="canonical" href={canonicalNonUkLink} />
      {isEnglishService && alternateLinksEnglishSites.map(renderAlternateLinks)}
      {isoLang &&
        !isEnglishService &&
        alternateLinksWsSites.map(renderAlternateLinks)}
      {renderAmpHtml(ampLink, isAmp)}
      <meta name="apple-mobile-web-app-title" content={brandName} />
      <meta name="application-name" content={brandName} />
      <meta name="description" content={description} />
      <meta property="fb:admins" content={FACEBOOK_ADMIN_ID} />
      <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta
        name="msapplication-TileImage"
        content={getIconAssetUrl(service, '144x144')}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={metaImageAltText} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={brandName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:type" content={openGraphType} />
      <meta property="og:url" content={canonicalNonUkLink} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:alt" content={metaImageAltText} />
      <meta name="twitter:image:src" content={metaImage} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={pageTitle} />
      {Boolean(aboutTags && aboutTags.length) && renderTags(aboutTags)}
      {Boolean(mentionsTags && mentionsTags.length) && renderTags(mentionsTags)}
      <link rel="apple-touch-icon" href={appleTouchIcon} />
      {getIconLinks(service, iconSizes)}
      <link
        rel="apple-touch-startup-image"
        href={getIconAssetUrl(service, '512x512')}
      />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      {children}
    </Helmet>
  );
};

const tagPropTypes = shape({
  thingUri: string,
  topicId: string,
  topicName: string,
  curationType: arrayOf(string),
  thingId: string,
  thingLabel: string,
  thingType: arrayOf(string),
  thingSameAs: arrayOf(string),
});

MetadataContainer.propTypes = {
  title: string.isRequired,
  lang: string.isRequired,
  description: string.isRequired,
  openGraphType: string.isRequired,
  aboutTags: arrayOf(tagPropTypes),
  mentionsTags: arrayOf(tagPropTypes),
  image: string,
  imageAltText: string,
  children: node,
};

MetadataContainer.defaultProps = {
  aboutTags: [],
  mentionsTags: [],
  image: null,
  imageAltText: null,
  children: null,
};

export default MetadataContainer;
