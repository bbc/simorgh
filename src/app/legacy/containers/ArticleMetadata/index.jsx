import React, { useContext } from 'react';
import getBrandedImage from '#lib/utilities/getBrandedImage';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Metadata from '../../../components/Metadata';

const ArticleMetadata = ({
  articleId = '',
  title,
  author,
  twitterHandle = null,
  firstPublished,
  lastPublished,
  section = '',
  aboutTags = [],
  mentionsTags = [],
  lang,
  description,
  imageLocator = '',
  imageAltText = '',
  hasAmpPage = true,
}) => {
  const { service } = useContext(ServiceContext);
  const brandedImage = imageLocator
    ? getBrandedImage(imageLocator, service)
    : null;

  return (
    articleId && (
      <Metadata
        title={title}
        lang={lang}
        twitterHandle={twitterHandle}
        description={description}
        openGraphType="article"
        aboutTags={aboutTags}
        mentionsTags={mentionsTags}
        image={brandedImage}
        imageAltText={imageAltText}
        hasAmpPage={hasAmpPage}
      >
        <meta name="article:author" content={author} />
        <meta name="article:modified_time" content={lastPublished} />
        <meta name="article:published_time" content={firstPublished} />
        {section && <meta name="article:section" content={section} />}
      </Metadata>
    )
  );
};

export default ArticleMetadata;
