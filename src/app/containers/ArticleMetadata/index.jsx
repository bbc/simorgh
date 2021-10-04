import React, { useContext } from 'react';
import { string, shape, arrayOf } from 'prop-types';
import Metadata from '../Metadata';
import getBrandedImage from '#lib/utilities/getBrandedImage';
import { ServiceContext } from '#contexts/ServiceContext';

const ArticleMetadata = ({
  articleId,
  title,
  author,
  firstPublished,
  lastPublished,
  section,
  lang,
  description,
  imageLocator,
  imageAltText,
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
        description={description}
        openGraphType="article"
        image={brandedImage}
        imageAltText={imageAltText}
      >
        <meta name="article:author" content={author} />
        <meta name="article:modified_time" content={lastPublished} />
        <meta name="article:published_time" content={firstPublished} />
        {section && <meta name="article:section" content={section} />}
      </Metadata>
    )
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

ArticleMetadata.propTypes = {
  articleId: string,
  title: string.isRequired,
  author: string.isRequired,
  firstPublished: string.isRequired,
  lastPublished: string.isRequired,
  section: string,
  lang: string.isRequired,
  description: string.isRequired,
  imageLocator: string,
  imageAltText: string,
};

ArticleMetadata.defaultProps = {
  articleId: '',
  section: '',
  imageLocator: null,
  imageAltText: null,
};

export default ArticleMetadata;
