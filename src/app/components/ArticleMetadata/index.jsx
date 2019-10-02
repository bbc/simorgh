import React from 'react';
import { string, shape, arrayOf, objectOf, any } from 'prop-types';
import Metadata from '../../containers/Metadata';

const renderTags = tags =>
  tags.map(({ thingLabel: content }) => (
    <meta name="article:tag" content={content} key={content} />
  ));

const ArticleMetadata = ({
  title,
  author,
  firstPublished,
  lastPublished,
  section,
  aboutTags,
  mentionsTags,
  linkedData,
  lang,
  seoHeadline,
  description,
}) => (
  <Metadata
    title={title}
    lang={lang}
    seoHeadline={seoHeadline}
    description={description}
    aboutTags={aboutTags}
    pageSpecificLinkedData={linkedData}
  >
    <meta name="article:author" content={author} />
    <meta name="article:modified_time" content={lastPublished} />
    <meta name="article:published_time" content={firstPublished} />
    {section && <meta name="article:section" content={section} />}
    {Boolean(aboutTags && aboutTags.length) && renderTags(aboutTags)}
    {Boolean(mentionsTags && mentionsTags.length) && renderTags(mentionsTags)}
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
  title: string.isRequired,
  author: string.isRequired,
  firstPublished: string.isRequired,
  lastPublished: string.isRequired,
  section: string,
  aboutTags: arrayOf(tagPropTypes),
  mentionsTags: arrayOf(tagPropTypes),
  lang: string.isRequired,
  seoHeadline: string.isRequired,
  description: string.isRequired,
  linkedData: objectOf(any),
};

ArticleMetadata.defaultProps = {
  section: '',
  aboutTags: [],
  mentionsTags: [],
  linkedData: {},
};

export default ArticleMetadata;
