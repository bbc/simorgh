import React, { useContext } from 'react';
import { string, node } from 'prop-types';
import Helmet from 'react-helmet';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import Metadata from '../../components/Metadata';

const ENGLISH_SERVICES = ['news'];

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
  lang,
  description,
  openGraphType,
  children,
}) => {
  const {
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
        type={openGraphType}
        service={service}
        iconSizes={iconSizes}
      />
      <Helmet>{children}</Helmet>
    </>
  );
};

MetadataContainer.propTypes = {
  title: string.isRequired,
  lang: string.isRequired,
  description: string.isRequired,
  openGraphType: string.isRequired,
  children: node,
};

MetadataContainer.defaultProps = {
  children: null,
};

export default MetadataContainer;
