import React, { Fragment } from 'react';
import { bool, node, string, shape } from 'prop-types';
import Helmet from 'react-helmet';
import HeaderContainer from '../Header';
import FooterContainer from '../Footer';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import GlobalStyle from '../../lib/globalStyles';
import ArticleMain from '../ArticleMain';
import ErrorMain from '../ErrorMain';
import nodeLogger from '../../helpers/logger.node';
import ConsentBanner from '../ConsentBanner';
import { GhostWrapper, GridItemConstrainedMedium } from '../../lib/styledGrid';

const logger = nodeLogger(__filename);

const ArticleWrapper = ({ bbcOrigin, children, isAmp, service }) => (
  <Fragment>
    <GlobalStyle />
    <RequestContextProvider
      platform={isAmp ? 'amp' : 'canonical'}
      bbcOrigin={bbcOrigin}
    >
      <ServiceContextProvider service={service}>
        <Helmet>
          <link rel="manifest" href={`/${service}/articles/manifest.json`} />
        </Helmet>
        <ConsentBanner />
        <HeaderContainer />
        {children}
      </ServiceContextProvider>
    </RequestContextProvider>
  </Fragment>
);

ArticleWrapper.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  isAmp: bool.isRequired,
  service: string.isRequired,
};

ArticleWrapper.defaultProps = {
  bbcOrigin: null,
};

const ArticleContainer = ({ loading, error, data, bbcOrigin }) => {
  if (data) {
    const { isAmp, service } = data;

    if (loading) {
      return (
        <ArticleWrapper isAmp={isAmp} bbcOrigin={bbcOrigin} service={service}>
          <main role="main">
            <GhostWrapper>
              <GridItemConstrainedMedium />
            </GhostWrapper>
          </main>
        </ArticleWrapper>
      );
    }

    if (error) {
      logger.error(error);
      return (
        <ArticleWrapper isAmp={isAmp} bbcOrigin={bbcOrigin} service={service}>
          <ErrorMain status={500} />
          <FooterContainer />
        </ArticleWrapper>
      );
    }

    const { data: articleData, status } = data;

    return (
      <ArticleWrapper isAmp={isAmp} bbcOrigin={bbcOrigin} service={service}>
        {status === 200 && articleData ? (
          <ArticleMain articleData={articleData} />
        ) : (
          <ErrorMain status={status} />
        )}
        <FooterContainer />
      </ArticleWrapper>
    );
  }
  return null;
};

ArticleContainer.propTypes = {
  loading: bool,
  error: string,
  data: shape(articlePropTypes),
  bbcOrigin: string,
};

ArticleContainer.defaultProps = {
  loading: false,
  error: null,
  data: null,
  bbcOrigin: null,
};

export default ArticleContainer;
