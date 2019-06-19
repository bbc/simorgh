import React, { Fragment, useContext } from 'react';
import { shape } from 'prop-types';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '../../contexts/RequestContext';
import Metadata from '../../components/Metadata';
import LinkedData from '../../components/LinkedData';
import metadataPropTypes from '../../models/propTypes/metadata';
import promoPropTypes from '../../models/propTypes/promo';
import deepGet from '../../lib/utilities/deepGet';
import aboutTagsContent from './linkedDataAbout';

const ENGLISH_SERVICES = ['news'];

/* An array of each thingLabel from tags.about & tags.mention */
const allTags = tags => {
  const { about, mentions } = tags;
  const aboutTags = about ? about.map(thing => thing.thingLabel) : [];
  const mentionTags = mentions ? mentions.map(thing => thing.thingLabel) : [];
  return aboutTags.concat(mentionTags);
};

const getTitle = promo =>
  promo.subType === 'IDX'
    ? deepGet(['name'], promo)
    : deepGet(['headlines', 'seoHeadline'], promo);

const getDescription = (metadata, promo) =>
  deepGet(['summary'], promo) ||
  deepGet(['headlines', 'seoHeadline'], promo) ||
  deepGet(['summary'], metadata);

const getCanonicalLink = (origin, service, id, assetType) => {
  const canonicalLink =
    assetType === 'article'
      ? `${origin}/${service}/articles/${id}`
      : `${origin}/${service}`;

  return canonicalLink;
};

const getTimeTags = (timeTag, assetType) => {
  if (assetType !== 'article') {
    return null;
  }

  return new Date(timeTag).toISOString();
};

const MetadataContainer = ({ metadata, promo }) => {
  const { origin, platform } = useContext(RequestContext);
  const {
    service,
    brandName,
    articleAuthor,
    defaultImage,
    defaultImageAltText,
    locale,
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
  const assetType = metadata.type;

  const timeFirstPublished = getTimeTags(metadata.firstPublished, assetType);
  const timeLastPublished = getTimeTags(metadata.lastPublished, assetType);

  const canonicalLink = getCanonicalLink(origin, service, id, assetType);
  const canonicalLinkUK = `https://www.bbc.co.uk/${service}/articles/${id}`;
  const canonicalLinkNonUK = `https://www.bbc.com/${service}/articles/${id}`;
  const ampLink = `${origin}/${service}/articles/${id}.amp`;
  const ampLinkUK = `https://www.bbc.co.uk/${service}/articles/${id}.amp`;
  const ampLinkNonUK = `https://www.bbc.com/${service}/articles/${id}.amp`;
  const appleTouchIcon = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}/${service}/images/icons/icon-192x192.png`;

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

  if (ENGLISH_SERVICES.includes(service)) {
    alternateLinks = alternateLinksEnglishSites;
  }

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
        type={assetType}
        about={aboutTagsContent(deepGet(['tags', 'about'], metadata))}
      />
      <Metadata
        isAmp={isAmp}
        alternateLinks={alternateLinks}
        ampLink={ampLink}
        appleTouchIcon={appleTouchIcon}
        articleAuthor={articleAuthor}
        articleSection={deepGet(['passport', 'genre'], metadata)}
        brandName={brandName}
        canonicalLink={canonicalLink}
        defaultImage={defaultImage}
        defaultImageAltText={defaultImageAltText}
        description={getDescription(metadata, promo)}
        facebookAdmin={100004154058350}
        facebookAppID={1609039196070050}
        lang={
          deepGet(['passport', 'language'], metadata) ||
          deepGet(['language'], metadata)
        }
        locale={locale}
        metaTags={allTags(metadata.tags)}
        themeColor={themeColor}
        timeFirstPublished={timeFirstPublished}
        timeLastPublished={timeLastPublished}
        title={getTitle(promo)}
        twitterCreator={twitterCreator}
        twitterSite={twitterSite}
        type={assetType}
        showArticleTags={assetType === 'article'}
      />
    </Fragment>
  );
};

MetadataContainer.propTypes = {
  metadata: shape(metadataPropTypes).isRequired,
  promo: shape(promoPropTypes).isRequired,
};

export default MetadataContainer;
