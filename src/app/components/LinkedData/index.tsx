import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { RequestContext } from '#contexts/RequestContext';
import serialiseForScript from '#lib/utilities/serialiseForScript';
import getBrandedImage from '#lib/utilities/getBrandedImage';
import { ServiceContext } from '../../contexts/ServiceContext';
import getAboutTagsContent from './getAboutTagsContent';
import { LinkedDataProps } from './types';

const LinkedData = ({
  showAuthor = false,
  type,
  seoTitle,
  headline,
  promoImage,
  description,
  datePublished,
  dateModified,
  coverageStartTime,
  coverageEndTime,
  aboutTags,
  entities = [],
  imageLocator,
  bylineLinkedData,
}: LinkedDataProps) => {
  const {
    brandName,
    publishingPrinciples,
    defaultImage,
    noBylinesPolicy,
    isTrustProjectParticipant,
    service,
    languageName,
    lang,
  } = useContext(ServiceContext);
  const { canonicalNonUkLink } = useContext(RequestContext);
  const IMG_TYPE = 'ImageObject';
  const ORG_TYPE = isTrustProjectParticipant
    ? 'NewsMediaOrganization'
    : 'Organization';
  const WEB_PAGE_TYPE = 'WebPage';
  const AUTHOR_PUBLISHER_NAME = isTrustProjectParticipant ? brandName : 'BBC';
  const LANGUAGE_TYPE = 'Language';
  const isNotRadioChannel = type !== 'RadioChannel';

  const brandedIndexImage = imageLocator
    ? getBrandedImage(imageLocator, service)
    : null;

  const logo = {
    '@type': IMG_TYPE,
    width: 1024,
    height: 576,
    url: defaultImage,
  };

  const newsPublisherLogo = {
    '@type': IMG_TYPE,
    width: 103,
    height: 16,
    url: 'https://static.files.bbci.co.uk/ws/simorgh-assets/public/news/images/metadata/publisher-nx16.png',
  };

  const sportPublisherLogo = {
    '@type': IMG_TYPE,
    width: 108,
    height: 16,
    url: 'https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/publisher-nx16.png',
  };

  const choosePublisherLogo = () => {
    switch (service) {
      case 'news':
      case 'ws':
        return newsPublisherLogo;
      case 'sport':
        return sportPublisherLogo;
      default:
        return logo;
    }
  };

  const publisherLogo = choosePublisherLogo();

  const image = {
    '@type': IMG_TYPE,
    width: 1024,
    height: 576,
    url: brandedIndexImage || defaultImage,
  };

  const thumbnailUrl = promoImage || brandedIndexImage || defaultImage;

  const publisher = {
    '@type': ORG_TYPE,
    name: AUTHOR_PUBLISHER_NAME,
    ...(isTrustProjectParticipant && { publishingPrinciples }),
    logo: publisherLogo,
  };
  const mainEntityOfPage = {
    '@type': WEB_PAGE_TYPE,
    '@id': canonicalNonUkLink,
    name: seoTitle,
  };

  const inLanguage = {
    '@type': LANGUAGE_TYPE,
    name: languageName,
    alternateName: lang,
  };

  const hasByline = !!bylineLinkedData;

  const { authorName, authorTopicUrl, twitterLink, authorImage, location } =
    bylineLinkedData || {};

  const sameAs = [authorTopicUrl, twitterLink].filter(Boolean);

  const locationCreated = { '@place': location };

  const orgAuthor = {
    '@type': ORG_TYPE,
    name: AUTHOR_PUBLISHER_NAME,
    logo: {
      '@type': 'ImageObject',
      width: 1024,
      height: 576,
      url: defaultImage,
    },
    ...(isTrustProjectParticipant && { noBylinesPolicy }),
  };

  const bylineAuthor = {
    '@type': 'Person',
    name: authorName,
    ...(sameAs.length && { sameAs }),
    ...(authorImage && { image: authorImage }),
  };

  const author = hasByline ? bylineAuthor : orgAuthor;

  const linkedData = {
    '@type': type,
    url: canonicalNonUkLink,
    ...(isNotRadioChannel && { publisher, thumbnailUrl }),
    image,
    mainEntityOfPage,
    headline,
    description,
    datePublished,
    dateModified,
    coverageStartTime,
    coverageEndTime,
    inLanguage,
    ...(aboutTags && { about: getAboutTagsContent(aboutTags) }),
    ...(showAuthor && {
      author,
    }),
    ...(hasByline && location && { locationCreated }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {serialiseForScript({
          '@context': 'http://schema.org',
          '@graph': [{ ...linkedData }, ...entities],
        })}
      </script>
    </Helmet>
  );
};

export default LinkedData;
