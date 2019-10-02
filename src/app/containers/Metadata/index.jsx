import React, { useContext } from 'react';
import { string, shape, node, objectOf, any, arrayOf } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import Metadata from '../../components/Metadata';
import LinkedData from '../../components/LinkedData';
import aboutTagsContent from './linkedDataAbout';

const ENGLISH_SERVICES = ['news'];

const pageTypeMetadata = {
  article: {
    schemaOrg: 'Article',
    openGraph: 'article',
  },
  frontPage: {
    schemaOrg: 'WebPage',
    openGraph: 'website',
  },
  media: {
    schemaOrg: 'RadioChannel',
    openGraph: 'website',
  },
};

const getAppleTouchUrl = service => {
  const assetsPath = process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH || '/';
  const separatorSlash = assetsPath[assetsPath.length - 1] !== '/' ? '/' : '';

  return [
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
    assetsPath,
    separatorSlash,
    service,
    '/images/icons/icon-192x192.png',
  ].join('');
};

const MetadataContainer = ({
  title,
  aboutTags,
  lang,
  seoHeadline,
  description,
  pageSpecificLinkedData,
  children,
}) => {
  const {
    pageType,
    platform,
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
    publishingPrinciples,
    noBylinesPolicy,
  } = useContext(ServiceContext);
  const appleTouchIcon = getAppleTouchUrl(service);
  const isAmp = platform === 'amp';

  let alternateLinks = [];

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

  if (ENGLISH_SERVICES.includes(service)) {
    alternateLinks = alternateLinksEnglishSites;
  } else if (isoLang) {
    alternateLinks = alternateLinksWsSites;
  }

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

  return (
    <>
      <LinkedData
        brandName={brandName}
        canonicalLink={canonicalNonUkLink}
        logoUrl={defaultImage}
        noBylinesPolicy={noBylinesPolicy}
        publishingPrinciples={publishingPrinciples}
        seoHeadline={seoHeadline}
        type={pathOr(null, [pageType, 'schemaOrg'], pageTypeMetadata)}
        about={aboutTagsContent(aboutTags)}
        pageSpecific={pageSpecificLinkedData}
      />
      <Metadata
        isAmp={isAmp}
        alternateLinks={alternateLinks}
        ampLink={ampLink}
        appleTouchIcon={appleTouchIcon}
        brandName={brandName}
        canonicalLink={canonicalNonUkLink}
        defaultImage={defaultImage}
        defaultImageAltText={defaultImageAltText}
        description={description}
        dir={dir}
        facebookAdmin={100004154058350}
        facebookAppID={1609039196070050}
        lang={lang}
        locale={locale}
        themeColor={themeColor}
        title={title}
        twitterCreator={twitterCreator}
        twitterSite={twitterSite}
        type={pathOr(null, [pageType, 'openGraph'], pageTypeMetadata)}
        service={service}
        iconSizes={iconSizes}
      />
      {children}
    </>
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
  aboutTags: arrayOf(tagPropTypes),
  lang: string.isRequired,
  seoHeadline: string.isRequired,
  description: string.isRequired,
  pageSpecificLinkedData: objectOf(any),
  children: node,
};

MetadataContainer.defaultProps = {
  pageSpecificLinkedData: {},
  aboutTags: [],
  children: null,
};

export default MetadataContainer;
