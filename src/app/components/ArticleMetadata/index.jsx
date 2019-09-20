import React from 'react';
import Helmet from 'react-helmet';
import { string, shape, arrayOf } from 'prop-types';

const renderTags = tags =>
  tags.map(({ thingLabel: content }) => (
    <meta name="article:tag" content={content} key={content} />
  ));

const ArticleMetadata = ({
  author,
  firstPublished,
  lastPublished,
  section,
  aboutTags,
  mentionsTags,
}) => {
  return (
    <Helmet>
      <meta name="article:author" content={author} />
      <meta name="article:modified_time" content={lastPublished} />
      <meta name="article:published_time" content={firstPublished} />
      {section && <meta name="article:section" content={section} />}
      {Boolean(aboutTags && aboutTags.length) && renderTags(aboutTags)}
      {Boolean(mentionsTags && mentionsTags.length) && renderTags(mentionsTags)}
    </Helmet>
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
  author: string.isRequired,
  firstPublished: string.isRequired,
  lastPublished: string.isRequired,
  section: string,
  aboutTags: arrayOf(tagPropTypes),
  mentionsTags: arrayOf(tagPropTypes),
};

ArticleMetadata.defaultProps = {
  section: '',
  aboutTags: [],
  mentionsTags: [],
};

export default ArticleMetadata;
