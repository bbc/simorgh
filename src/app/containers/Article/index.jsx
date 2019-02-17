import React, { Fragment } from 'react';
import { bool, shape } from 'prop-types';
import HeaderContainer from '../Header';
import FooterContainer from '../Footer';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { PlatformContextProvider } from '../../contexts/PlatformContext';
import GlobalStyle from '../../lib/globalStyles';
import ArticleMain from '../ArticleMain';
import ErrorMain from '../ErrorMain';

const defaultData = {
  isAmp: false,
  service: 'news',
  status: 500,
};

const ArticleContainer = ({ loading, data = defaultData }) => {
  const { isAmp, data: articleData, service, status } = data;

  const showLoading = loading;
  const showArticle = !showLoading && status === 200 && articleData;
  const showError = !showLoading && !showArticle;

  return (
    <Fragment>
      <GlobalStyle />
      <ServiceContextProvider service={service}>
        <PlatformContextProvider platform={isAmp ? 'amp' : 'canonical'}>
          <HeaderContainer />
          {showLoading && <h1>Loading...</h1>}
          {showArticle && <ArticleMain articleData={articleData} />}
          {showError && <ErrorMain status={status} />}
          <FooterContainer />
        </PlatformContextProvider>
      </ServiceContextProvider>
    </Fragment>
  );
};

ArticleContainer.propTypes = {
  loading: bool,
  data: shape(articlePropTypes),
};

ArticleContainer.defaultProps = {
  loading: false,
  data: null,
};

export default ArticleContainer;
