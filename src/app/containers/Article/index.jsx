import React from 'react';
import { string, shape } from 'prop-types';
import { compose } from 'recompose';
import FooterContainer from '../Footer';
import articlePropTypes from '../../models/propTypes/article';
import ArticleMain from '../ArticleMain';
import PageWrapper from '../PageWrapper';

import WithError from '../PageWrapper/withError';
import WithLoading from '../PageWrapper/withLoading';

const ArticleContainer = ({ data, bbcOrigin }) => {
  if (data) {
    const { data: articleData, isAmp, service, status } = data;
    try {
      return (
        <PageWrapper isAmp={isAmp} bbcOrigin={bbcOrigin} service={service}>
          {status === 200 && articleData ? (
            <ArticleMain articleData={articleData} />
          ) : (
            <ErrorMain status={status} />
          )}
          <FooterContainer />
        </PageWrapper>
      );
    } catch {
      return (
        <PageWrapper isAmp={isAmp} bbcOrigin={bbcOrigin} service={service}>
          <ErrorMain status={status} />
          <FooterContainer />
        </PageWrapper>
      );
    }
  }

  return null;
};

ArticleContainer.propTypes = {
  data: shape(articlePropTypes),
  bbcOrigin: string,
};

ArticleContainer.defaultProps = {
  data: null,
  bbcOrigin: null,
};

const EnhancedArticleContainer = compose(
  WithError,
  WithLoading,
)(ArticleContainer);

export default EnhancedArticleContainer;
