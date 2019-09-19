import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { string, number, shape, arrayOf } from 'prop-types';
import { ServiceContext } from '../../contexts/ServiceContext';

const renderTags = tags =>
  tags.map(({ thingLabel: tag }) => (
    <meta name="article:tag" content={tag} key={tag} />
  ));

const getISOStringDate = date => new Date(date).toISOString();

const ArticleMetadata = ({
  firstPublished,
  lastPublished,
  articleSection,
  aboutTags,
  mentionsTags,
}) => {
  const { articleAuthor } = useContext(ServiceContext); // TODO

  return (
    <Helmet>
      <meta name="article:author" content={articleAuthor} />
      {Boolean(lastPublished) && (
        <meta
          name="article:modified_time"
          content={getISOStringDate(lastPublished)}
        />
      )}
      {Boolean(firstPublished) && (
        <meta
          name="article:published_time"
          content={getISOStringDate(firstPublished)}
        />
      )}
      {articleSection && (
        <meta name="article:section" content={articleSection} />
      )}
      {Boolean(aboutTags.length) && renderTags(aboutTags)}
      {Boolean(mentionsTags.length) && renderTags(mentionsTags)}
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
  firstPublished: number,
  lastPublished: number,
  articleSection: string,
  aboutTags: arrayOf(tagPropTypes),
  mentionsTags: arrayOf(tagPropTypes),
};

ArticleMetadata.defaultProps = {
  firstPublished: 0,
  lastPublished: 0,
  articleSection: '',
  aboutTags: [],
  mentionsTags: [],
};

export default ArticleMetadata;
