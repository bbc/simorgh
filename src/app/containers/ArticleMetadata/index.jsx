import React from 'react';
import { string, objectOf, any } from 'prop-types';
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

ArticleMetadata.propTypes = {
  title: string.isRequired,
  author: string.isRequired,
  firstPublished: string.isRequired,
  lastPublished: string.isRequired,
  section: string,
  lang: string.isRequired,
  description: string.isRequired,
  linkedData: objectOf(any),
};

ArticleMetadata.defaultProps = {
  section: '',
  linkedData: {},
};

export default ArticleMetadata;
