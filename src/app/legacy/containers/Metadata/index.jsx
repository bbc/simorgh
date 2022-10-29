import React, { useContext } from 'react';
import { string, node, shape, arrayOf, bool, number } from 'prop-types';
import { Helmet } from 'react-helmet';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '../../../contexts/ServiceContext';
import {
  getIconAssetUrl,
  getIconLinks,
  getAppleTouchUrl,
  renderAlternateLinks,
  renderAppleItunesApp,
} from './utils';

const ENGLISH_SERVICES = ['news', 'sport'];
const FACEBOOK_ADMIN_ID = 100004154058350;
const FACEBOOK_APP_ID = 1609039196070050;
const FACEBOOK_PAGES =
  '285361880228,192168680794107,9432520138,347501767628,264572343581678,303522857815,166580710064489,592266607456680,260669183761,160817274042538,236659822607,237647452933504,10150118096995434,113097918700687,143048895744759,81395234664,207150596007088,167959249906191,64040652712,190992343324,103678496456574,367167334474,160894643929209,186742265162,1526071940947174,230299653821,124158667615790,126548377386804,298318986864908,1068750829805728,228458913833525,163571453661989,660673490805047,948946275170651,485274381864409,1633841096923106,654070648098812';
const iconSizes = {
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

const renderTags = tags =>
  tags.map(({ thingLabel: content }) => (
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
  hasAppleItunesAppBanner,
  hasAmpPage,
}) => {
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
    themeColor,
    twitterCreator,
    twitterSite,
    iTunesAppId,
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
  const socialTitle = `${socialHeadline || title} - ${brandName}`;

  const metaImage = image || defaultImage;
  const metaImageAltText = imageAltText || defaultImageAltText;
  const linkToAmpPage = hasAmpPage && !isAmp;

  return (
    <Helmet htmlAttributes={htmlAttributes}>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet="utf-8" />
      <meta name="robots" content="noodp, noydir, max-image-preview:large" />
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
      <meta property="fb:admins" content={FACEBOOK_ADMIN_ID} />
      <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
      <meta property="fb:pages" content={FACEBOOK_PAGES} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta
        name="msapplication-TileImage"
        content={getIconAssetUrl(service, '144x144')}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={metaImageAltText} />
      {imageWidth && <meta property="og:image:width" content={imageWidth} />}
      {imageHeight && <meta property="og:image:height" content={imageHeight} />}
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={brandName} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:type" content={openGraphType} />
      <meta property="og:url" content={canonicalNonUkLink} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle || twitterCreator} />
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
  socialHeadline: string,
  lang: string.isRequired,
  twitterHandle: string,
  description: string.isRequired,
  openGraphType: string.isRequired,
  aboutTags: arrayOf(tagPropTypes),
  mentionsTags: arrayOf(tagPropTypes),
  image: string,
  imageAltText: string,
  imageWidth: number,
  imageHeight: number,
  children: node,
  hasAppleItunesAppBanner: bool,
  hasAmpPage: bool,
};

MetadataContainer.defaultProps = {
  socialHeadline: null,
  aboutTags: [],
  mentionsTags: [],
  image: null,
  imageAltText: null,
  imageWidth: null,
  imageHeight: null,
  children: null,
  hasAppleItunesAppBanner: false,
  hasAmpPage: true,
  twitterHandle: null,
};

export default MetadataContainer;
