import React, { useContext } from 'react';
import { string, arrayOf, shape } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import Metadata from '../Metadata';
import getBrandedImage from './utils/getBrandedImage';

const CpsMetadata = ({
  title,
  language,
  description,
  firstPublished,
  lastPublished,
  imageLocator,
  imageAltText,
  aboutTags,
}) => {
  const { service, articleAuthor } = useContext(ServiceContext);
  const brandedImage = imageLocator
    ? getBrandedImage(imageLocator, service)
    : null;
  return (
    <Metadata
      title={title}
      lang={language}
      description={description}
      openGraphType="article"
      image={brandedImage}
      imageAltText={imageAltText}
      aboutTags={aboutTags}
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
  language: string.isRequired,
  description: string.isRequired,
  firstPublished: string.isRequired,
  lastPublished: string.isRequired,
  imageLocator: string,
  imageAltText: string,
  aboutTags: arrayOf(tagPropTypes),
};

CpsMetadata.defaultProps = {
  imageLocator: null,
  imageAltText: null,
  aboutTags: [],
};

export default CpsMetadata;
