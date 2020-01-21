import React, { useContext } from 'react';
import { string } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import Metadata from '../Metadata';
import { getBrandedImage } from './utils';

const CpsMetadata = ({
  title,
  language,
  description,
  firstPublished,
  lastPublished,
  indexImage,
  indexImageAltText,
}) => {
  const { service } = useContext(ServiceContext);
  const brandedImage = indexImage ? getBrandedImage(indexImage, service) : null;
  return (
    <Metadata
      title={title}
      lang={language}
      description={description}
      openGraphType="article"
      openGraphImage={brandedImage}
      openGraphImageAltText={indexImageAltText}
    >
      <meta name="article:author" content="https://www.facebook.com/bbcnews" />
      <meta name="article:published_time" content={firstPublished} />
      <meta name="article:modified_time" content={lastPublished} />
    </Metadata>
  );
};

CpsMetadata.propTypes = {
  title: string.isRequired,
  language: string.isRequired,
  description: string.isRequired,
  firstPublished: string.isRequired,
  lastPublished: string.isRequired,
  indexImage: string,
  indexImageAltText: string,
};

CpsMetadata.defaultProps = {
  indexImage: null,
  indexImageAltText: null,
};

export default CpsMetadata;
