import React, { Fragment } from 'react';
import { bool, string, shape } from 'prop-types';
import nanoid from 'nanoid';
import HeaderContainer from '../Header';
import FooterContainer from '../Footer';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import GlobalStyle from '../../lib/globalStyles';
import nodeLogger from '../../helpers/logger.node';
import ConsentBanner from '../ConsentBanner';

const logger = nodeLogger(__filename);

/*
  [1] This handles async data fetching, and a 'loading state', which we should look to handle more intelligently.
*/
const HomePageContainer = ({ loading, error, data, bbcOrigin }) => {
  if (loading) return 'Loading...'; /* [1] */
  if (error) {
    logger.error(error);
    return 'Something went wrong :(';
  }

  if (data) {
    const { homepageData, service } = data;

    const topStoriesGroup = homepageData.content.groups[0].items;

    return (
      <Fragment>
        <GlobalStyle />
        <ServiceContextProvider service={service}>
          <RequestContextProvider platform="canonical" bbcOrigin={bbcOrigin}>
            <ConsentBanner />
            <HeaderContainer />
            <h1>Service Homepage Beta</h1>
            {topStoriesGroup &&
              topStoriesGroup.map(item => (
                <h3 key={nanoid()}>{item.headlines.headline}</h3>
              ))}
            <FooterContainer />
          </RequestContextProvider>
        </ServiceContextProvider>
      </Fragment>
    );
  }

  return null;
};

HomePageContainer.propTypes = {
  loading: bool,
  error: string,
  data: shape(),
  bbcOrigin: string,
};

HomePageContainer.defaultProps = {
  loading: false,
  error: null,
  data: null,
  bbcOrigin: null,
};

export default HomePageContainer;
