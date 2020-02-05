import React from 'react';
import { string, shape, arrayOf } from 'prop-types';
import Metadata from '../Metadata';

const ArticleMetadata = ({
  articleId,
  title,
  author,
  firstPublished,
  lastPublished,
  section,
  aboutTags,
  mentionsTags,
  lang,
  description,
}) =>
  articleId && (
    <Metadata
      title={title}
      lang={lang}
      description={description}
      openGraphType="article"
      aboutTags={aboutTags}
      mentionsTags={mentionsTags}
    >
      <meta name="article:author" content={author} />
      <meta name="article:modified_time" content={lastPublished} />
      <meta name="article:published_time" content={firstPublished} />
      {section && <meta name="article:section" content={section} />}
    </Metadata>
  );

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
  aboutTags: arrayOf(tagPropTypes),
  mentionsTags: arrayOf(tagPropTypes),
  lang: string.isRequired,
  description: string.isRequired,
};

ArticleMetadata.defaultProps = {
  articleId: '',
  section: '',
  aboutTags: [],
  mentionsTags: [],
};

export default ArticleMetadata;
