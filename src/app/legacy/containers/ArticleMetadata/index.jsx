import React, { useContext } from 'react';
import { string, shape, arrayOf } from 'prop-types';
import getBrandedImage from '#lib/utilities/getBrandedImage';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Metadata from '../Metadata';

const ArticleMetadata = ({
  articleId,
  title,
  author,
  twitterHandle,
  firstPublished,
  lastPublished,
  section,
  aboutTags,
  mentionsTags,
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
        twitterHandle={twitterHandle}
        description={description}
        openGraphType="article"
        aboutTags={aboutTags}
        mentionsTags={mentionsTags}
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
  twitterHandle: string,
  firstPublished: string.isRequired,
  lastPublished: string.isRequired,
  section: string,
  aboutTags: arrayOf(tagPropTypes),
  mentionsTags: arrayOf(tagPropTypes),
  lang: string.isRequired,
  description: string.isRequired,
  imageLocator: string,
  imageAltText: string,
};

ArticleMetadata.defaultProps = {
  articleId: '',
  twitterHandle: null,
  section: '',
  aboutTags: [],
  mentionsTags: [],
  imageLocator: null,
  imageAltText: null,
};

export default ArticleMetadata;
