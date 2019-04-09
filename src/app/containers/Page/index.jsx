import React, { Fragment } from 'react';
import { bool, string, shape } from 'prop-types';
import Helmet from 'react-helmet';
import HeaderContainer from '../Header';
import FooterContainer from '../Footer';
import articlePropTypes from '../../models/propTypes/article';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import GlobalStyle from '../../lib/globalStyles';
import ErrorMain from '../ErrorMain';
import nodeLogger from '../../helpers/logger.node';
import ConsentBanner from '../ConsentBanner';

const logger = nodeLogger(__filename);

/*
  [1] This handles async data fetching, and a 'loading state', which we should look to handle more intelligently.
*/
const Page = ({ loading, error, data, bbcOrigin, children }) => {
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
              children({ articleData })
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

Page.propTypes = {
  loading: bool,
  error: string,
  data: shape(articlePropTypes),
  bbcOrigin: string,
};

Page.defaultProps = {
  loading: false,
  error: null,
  data: null,
  bbcOrigin: null,
};

export default Page;
