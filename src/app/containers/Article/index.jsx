import React, { Fragment } from 'react';
import { bool, string, shape } from 'prop-types';
import HeaderContainer from '../Header';
import FooterContainer from '../Footer';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { PlatformContextProvider } from '../../contexts/PlatformContext';
import GlobalStyle from '../../lib/globalStyles';
import ArticleMain from '../ArticleMain';
import ErrorMain from '../ErrorMain';
import nodeLogger from '../../helpers/logger.node';

const logger = nodeLogger(__filename);

/*
  [1] This handles async data fetching, and a 'loading state', which we should look to handle more intelligently.
*/
const ArticleContainer = ({ loading, error, data }) => {
  if (loading) return 'Loading...'; /* [1] */
  if (error) {
    logger.error(error);
    return 'Something went wrong :(';
  }
  if (data) {
    const { isAmp, data: articleData, service, status } = data;

    return (
      <Fragment>
        <GlobalStyle />
        <ServiceContextProvider service={service}>
          <PlatformContextProvider platform={isAmp ? 'amp' : 'canonical'}>
            <HeaderContainer />
            {status === 200 ? (
              <ArticleMain service={service} articleData={articleData} />
            ) : (
              <ErrorMain status={status} />
            )}
            <FooterContainer />
          </PlatformContextProvider>
        </ServiceContextProvider>
      </Fragment>
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
