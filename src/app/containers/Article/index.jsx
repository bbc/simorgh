import React from 'react';
import { bool, string, shape } from 'prop-types';
import Article from '../../components/Article';
import Metadata from '../../components/Metadata';
import MainContent from '../MainContent';
import articlePropTypes from '../../models/propTypes/article';

const ArticleContainer = ({ loading, error, data }) => {
  if (loading) return 'Loading...';
  if (error) return 'Something went wrong :(';
  if (data) {
    const { amp, data: articleData } = data;

    const { content, metadata, promo } = articleData;
    const { id: aresArticleId } = metadata;

    const id = aresArticleId.split(':').pop();
    const { blocks } = content.model;
    const canonicalLink = `https://www.bbc.com/news/articles/${id}`;

    const metadataProps = {
      amp,
      canonicalLink,
      lang: metadata.passport.language,
      title: promo.headlines.seoHeadline,
    };

    return (
      <Article>
        <Metadata {...metadataProps} />
        <MainContent blocks={blocks} />
      </Article>
    );
  }

  return null;
};

ArticleContainer.propTypes = {
  loading: bool,
  error: string,
  data: shape(articlePropTypes),
};

ArticleContainer.defaultProps = {
  loading: false,
  error: null,
  data: null,
};

export default ArticleContainer;
