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

const Container = ({ children, service }) => (
  <Fragment>
    <GlobalStyle />
    <ServiceContextProvider service={service}>
      <Helmet>
        <link rel="manifest" href={`/${service}/articles/manifest.json`} />
      </Helmet>
      <ConsentBanner />
      <HeaderContainer />
      {children}
    </ServiceContextProvider>
  </Fragment>
);

Container.propTypes = {
  children: node.isRequired,
  service: string.isRequired,
};

const ArticleContainer = ({ loading, error, data, bbcOrigin }) => {
  /*
    This handles async data fetching, and a 'loading state', which we should look to handle more intelligently.
  */

  if (loading)
    return (
      <Container service="news">
        <main role="main">
          <GhostWrapper>
            <GridItemConstrainedMedium />
          </GhostWrapper>
        </main>
      </Container>
    );

  if (error) {
    logger.error(error);
    return (
      <Container service="news">
        <ErrorMain status={500} />
        <FooterContainer />
      </Container>
    );
  }

  if (data) {
    const { isAmp, data: articleData, service, status } = data;

    return (
      <Fragment>
        <GlobalStyle />
        <ServiceContextProvider service={service}>
          <RequestContextProvider
            platform={isAmp ? 'amp' : 'canonical'}
            bbcOrigin={bbcOrigin}
          >
            <Helmet>
              <link
                rel="manifest"
                href={`/${service}/articles/manifest.json`}
              />
            </Helmet>
            <ConsentBanner />
            <HeaderContainer />
            {status === 200 ? (
              <ArticleMain articleData={articleData} />
            ) : (
              <ErrorMain status={status} />
            )}
            <FooterContainer />
          </RequestContextProvider>
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
  bbcOrigin: string,
};

ArticleContainer.defaultProps = {
  loading: false,
  error: null,
  data: null,
  bbcOrigin: null,
};

export default ArticleContainer;
