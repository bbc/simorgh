import React, { useContext } from 'react';
import { string, arrayOf, shape, bool } from 'prop-types';
import getBrandedImage from '#lib/utilities/getBrandedImage';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Metadata from '../Metadata';

const CpsMetadata = ({
  title,
  shortHeadline,
  language,
  description,
  firstPublished,
  lastPublished,
  imageLocator,
  imageAltText,
  aboutTags,
  hasAppleItunesAppBanner,
  hasAmpPage,
}) => {
  const { service, articleAuthor } = useContext(ServiceContext);
  const brandedImage = imageLocator
    ? getBrandedImage(imageLocator, service)
    : null;
  return (
    <Metadata
      title={title}
      socialHeadline={shortHeadline}
      lang={language}
      description={description}
      openGraphType="article"
      image={brandedImage}
      imageAltText={imageAltText}
      aboutTags={aboutTags}
      hasAppleItunesAppBanner={hasAppleItunesAppBanner}
      hasAmpPage={hasAmpPage}
    >
      <meta name="article:author" content={articleAuthor} />
      <meta name="article:published_time" content={firstPublished} />
      <meta name="article:modified_time" content={lastPublished} />
    </Metadata>
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

CpsMetadata.propTypes = {
  title: string.isRequired,
  shortHeadline: string.isRequired,
  language: string.isRequired,
  description: string.isRequired,
  firstPublished: string.isRequired,
  lastPublished: string.isRequired,
  imageLocator: string,
  imageAltText: string,
  aboutTags: arrayOf(tagPropTypes),
  hasAppleItunesAppBanner: bool,
  hasAmpPage: bool,
};

CpsMetadata.defaultProps = {
  imageLocator: null,
  imageAltText: null,
  aboutTags: [],
  hasAppleItunesAppBanner: false,
  hasAmpPage: true,
};

export default CpsMetadata;
