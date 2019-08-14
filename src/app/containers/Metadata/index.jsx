import React, { Fragment, useContext } from 'react';
import { shape, oneOfType } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import Metadata from '../../components/Metadata';
import LinkedData from '../../components/LinkedData';
import {
  optimoMetadataPropTypes,
  cpsMetadataPropTypes,
} from '../../models/propTypes/metadata';
import {
  optimoPromoPropTypes,
  cpsPromoPropTypes,
} from '../../models/propTypes/promo';
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
};

/* An array of each thingLabel from tags.about & tags.mention */
const allTags = tags => {
  const { about, mentions } = tags;
  const aboutTags = about ? about.map(thing => thing.thingLabel) : [];
  const mentionTags = mentions ? mentions.map(thing => thing.thingLabel) : [];
  return aboutTags.concat(mentionTags);
};

const getTitle = promo =>
  promo.subType === 'IDX'
    ? pathOr(null, ['name'], promo)
    : pathOr(null, ['headlines', 'seoHeadline'], promo);

const getDescription = (metadata, promo) =>
  pathOr(null, ['summary'], promo) ||
  pathOr(null, ['headlines', 'seoHeadline'], promo) ||
  pathOr(null, ['summary'], metadata);

const getLink = (origin, service, id, pageType, linkType = '') => {
  // according to https://github.com/bbc/simorgh/pull/1945, canonical links should use .com
  const linkOrigin = linkType === 'canonical' ? 'https://www.bbc.com' : origin;

  let link =
    pageType === 'article'
      ? `${linkOrigin}/${service}/articles/${id}`
      : `${linkOrigin}/${service}`;

  if (linkType === 'amp') {
    link = `${link}.amp`;
  }

  return link;
};

const getTimeTags = (timeTag, pageType) => {
  if (pageType !== 'article') {
    return null;
  }

  return new Date(timeTag).toISOString();
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

const MetadataContainer = ({ metadata, promo }) => {
  const { origin, pageType, platform } = useContext(RequestContext);
  const {
    service,
    brandName,
    articleAuthor,
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
  const { id: aresArticleId } = metadata;

  if (!aresArticleId) {
    return null;
  }

  const id = aresArticleId.split(':').pop();

  const timeFirstPublished = getTimeTags(metadata.firstPublished, pageType);
  const timeLastPublished = getTimeTags(metadata.lastPublished, pageType);

  const canonicalLink = getLink(origin, service, id, pageType, 'canonical');
  const canonicalLinkUK = `https://www.bbc.co.uk/${service}/articles/${id}`;
  const canonicalLinkNonUK = `https://www.bbc.com/${service}/articles/${id}`;
  const ampLink = getLink(origin, service, id, pageType, 'amp');
  const ampLinkUK = `https://www.bbc.co.uk/${service}/articles/${id}.amp`;
  const ampLinkNonUK = `https://www.bbc.com/${service}/articles/${id}.amp`;
  const appleTouchIcon = getAppleTouchUrl(service);
  const isAmp = platform === 'amp';

  let alternateLinks = [];

  const alternateLinksEnglishSites = [
    {
      href: isAmp ? ampLinkNonUK : canonicalLinkNonUK,
      hrefLang: 'x-default',
    },
    {
      href: isAmp ? ampLinkNonUK : canonicalLinkNonUK,
      hrefLang: 'en',
    },
    {
      href: isAmp ? ampLinkUK : canonicalLinkUK,
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
    <Fragment>
      <LinkedData
        brandName={brandName}
        canonicalLink={canonicalLink}
        firstPublished={timeFirstPublished}
        lastUpdated={timeLastPublished}
        logoUrl={defaultImage}
        noBylinesPolicy={noBylinesPolicy}
        publishingPrinciples={publishingPrinciples}
        seoHeadline={getTitle(promo)}
        type={pathOr(null, [pageType, 'schemaOrg'], pageTypeMetadata)}
        about={aboutTagsContent(pathOr(null, ['tags', 'about'], metadata))}
      />
      <Metadata
        isAmp={isAmp}
        alternateLinks={alternateLinks}
        ampLink={ampLink}
        appleTouchIcon={appleTouchIcon}
        articleAuthor={articleAuthor}
        articleSection={pathOr(null, ['passport', 'genre'], metadata)}
        brandName={brandName}
        canonicalLink={canonicalLink}
        defaultImage={defaultImage}
        defaultImageAltText={defaultImageAltText}
        description={getDescription(metadata, promo)}
        dir={dir}
        facebookAdmin={100004154058350}
        facebookAppID={1609039196070050}
        lang={
          pathOr(null, ['passport', 'language'], metadata) ||
          pathOr(null, ['language'], metadata)
        }
        locale={locale}
        metaTags={allTags(metadata.tags)}
        themeColor={themeColor}
        timeFirstPublished={timeFirstPublished}
        timeLastPublished={timeLastPublished}
        title={getTitle(promo)}
        twitterCreator={twitterCreator}
        twitterSite={twitterSite}
        type={pathOr(null, [pageType, 'openGraph'], pageTypeMetadata)}
        service={service}
        showArticleTags={pageType === 'article'}
        iconSizes={iconSizes}
      />
    </Fragment>
  );
};

MetadataContainer.propTypes = {
  metadata: oneOfType([
    shape(cpsMetadataPropTypes),
    shape(optimoMetadataPropTypes),
  ]).isRequired,
  promo: oneOfType([shape(cpsPromoPropTypes), shape(optimoPromoPropTypes)])
    .isRequired,
};

export default MetadataContainer;
