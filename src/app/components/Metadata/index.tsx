/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '../../contexts/ServiceContext';
import {
  getIconAssetUrl,
  getIconLinks,
  getAppleTouchUrl,
  renderAlternateLinks,
  renderAppleItunesApp,
} from './utils';
import { IconSizes, MetadataProps, Tag } from './types';

const ENGLISH_SERVICES = ['news', 'sport'];
const FACEBOOK_APP_ID = '1609039196070050';
const iconSizes: IconSizes = {
  'apple-touch-icon': [
    '72x72',
    '96x96',
    '128x128',
    '144x144',
    '152x152',
    '180x180',
    '192x192',
    '384x384',
    '512x512',
  ],
  icon: ['72x72', '96x96', '192x192'],
};

const renderTags = (tags?: Tag[]) =>
  tags?.map(({ thingLabel: content }) => (
    <meta name="article:tag" content={content} key={content} />
  ));

const MetadataContainer = ({
  title,
  socialHeadline,
  lang,
  twitterHandle,
  description,
  openGraphType,
  aboutTags,
  mentionsTags,
  image,
  imageAltText,
  imageWidth,
  imageHeight,
  children,
  hasAppleItunesAppBanner = false,
  hasAmpPage = true,
}: MetadataProps) => {
  const {
    isAmp,
    canonicalLink,
    ampLink,
    canonicalUkLink,
    ampUkLink,
    canonicalNonUkLink,
    ampNonUkLink,
    pathname,
  } = useContext(RequestContext);

  const {
    service,
    brandName,
    defaultImage,
    defaultImageAltText,
    dir,
    locale,
    isoLang,
    twitterCreator,
    twitterSite,
    iTunesAppId,
  } = useContext(ServiceContext);
  const {
    palette: { BRAND_BACKGROUND },
  } = useTheme();
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
  const socialTitle = `${socialHeadline || title} - ${brandName}`;

  const metaTwitterHandle = twitterHandle || twitterCreator;

  const metaImage = image || defaultImage;
  const metaImageAltText = imageAltText || defaultImageAltText;
  const linkToAmpPage = hasAmpPage && !isAmp;

  return (
    <Helmet htmlAttributes={htmlAttributes}>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet="utf-8" />
      <meta name="robots" content="noodp, noydir, max-image-preview:large" />
      <meta name="theme-color" content={BRAND_BACKGROUND} />
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
      {linkToAmpPage && <link rel="amphtml" href={ampLink} />}
      {renderAppleItunesApp({
        iTunesAppId,
        canonicalLink,
        isAmp,
        hasAppleItunesAppBanner,
      })}
      <meta name="apple-mobile-web-app-title" content={brandName} />
      <meta name="application-name" content={brandName} />
      <meta name="description" content={description} />
      <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content={BRAND_BACKGROUND} />
      <meta
        name="msapplication-TileImage"
        content={getIconAssetUrl(service, '144x144')}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={metaImageAltText} />
      {imageWidth && (
        <meta property="og:image:width" content={String(imageWidth)} />
      )}
      {imageHeight && (
        <meta property="og:image:height" content={String(imageHeight)} />
      )}
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={brandName} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:type" content={openGraphType} />
      <meta property="og:url" content={canonicalNonUkLink} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={metaTwitterHandle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:alt" content={metaImageAltText} />
      <meta name="twitter:image:src" content={metaImage} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={socialTitle} />
      {!isAmp && (
        <meta
          httpEquiv="onion-location"
          content={`https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion${pathname}`}
        />
      )}
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

export default MetadataContainer;
