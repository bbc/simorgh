import React from 'react';
import Article from '../../components/Article';
import articlePropTypes from '../../models/propTypes/article';

const ArticleContainer = ({ data }) => {
  const { content, metadata, promo } = data;
  const { id: aresArticleId } = metadata;

  const id = aresArticleId.split(':').pop();
  return (
    <Article
      id={id}
      lang={metadata.passport.language}
      title={promo.headlines.seoHeadline}
      {...content.model}
    />
  );
};

ArticleContainer.propTypes = articlePropTypes;

export default ArticleContainer;
