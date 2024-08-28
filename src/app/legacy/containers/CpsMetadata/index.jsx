import React, { useContext } from 'react';
import getBrandedImage from '#lib/utilities/getBrandedImage';
import { ServiceContext } from '#contexts/ServiceContext';
import Metadata from '../../../components/Metadata';

const CpsMetadata = ({
  title,
  shortHeadline,
  language,
  description,
  firstPublished,
  lastPublished,
  imageLocator = null,
  imageAltText = null,
  aboutTags = [],
  hasAppleItunesAppBanner = false,
  hasAmpPage = true,
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

export default CpsMetadata;
