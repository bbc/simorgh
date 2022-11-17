import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { string, shape, arrayOf, bool, object } from 'prop-types';
import { RequestContext } from '#contexts/RequestContext';
import serialiseForScript from '#lib/utilities/serialiseForScript';
import getBrandedImage from '#lib/utilities/getBrandedImage';
import { ServiceContext } from '../../../contexts/ServiceContext';
import getAboutTagsContent from './getAboutTagsContent';

const LinkedData = ({
  showAuthor,
  type,
  seoTitle,
  headline,
  description,
  datePublished,
  dateModified,
  aboutTags,
  entities,
  imageLocator,
}) => {
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

  const thumbnailUrl = brandedIndexImage || defaultImage;

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
    inLanguage,
    ...(aboutTags && { about: getAboutTagsContent(aboutTags) }),
    ...(showAuthor && {
      author: {
        '@type': ORG_TYPE,
        name: AUTHOR_PUBLISHER_NAME,
        logo: {
          '@type': 'ImageObject',
          width: 1024,
          height: 576,
          url: defaultImage,
        },
        ...(isTrustProjectParticipant && { noBylinesPolicy }),
      },
    }),
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

LinkedData.propTypes = {
  showAuthor: bool,
  type: string.isRequired,
  seoTitle: string.isRequired,
  headline: string,
  description: string,
  datePublished: string,
  dateModified: string,
  aboutTags: arrayOf(
    shape({
      '@type': string,
      name: string,
      sameAs: arrayOf(string),
    }),
  ),
  // eslint-disable-next-line react/forbid-prop-types
  entities: arrayOf(object),
  imageLocator: string,
};

LinkedData.defaultProps = {
  showAuthor: false,
  headline: undefined,
  description: undefined,
  datePublished: undefined,
  dateModified: undefined,
  aboutTags: undefined,
  entities: [],
  imageLocator: undefined,
};

export default LinkedData;
