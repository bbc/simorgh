import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import urduData from '#data/urdu/frontpage';
import newsData from '#data/news/frontpage';
import serbianCyrData from '#data/serbian/frontpage/cyr';
import serbianLatData from '#data/serbian/frontpage/lat';
import { service as urduConfig } from '../../lib/config/services/urdu';
import { service as newsConfig } from '../../lib/config/services/news';
import { service as serbianConfig } from '../../lib/config/services/serbian';
import { getLocalMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import ThemeProvider from '../../components/ThemeProvider';
import FrontPage from '.';

const serviceDataSets = {
  urdu: { default: urduData },
  news: { default: newsData },
  serbian: {
    cyr: serbianCyrData,
    lat: serbianLatData,
  },
};

const serviceConfigs = {
  urdu: urduConfig,
  news: newsConfig,
  serbian: serbianConfig,
};

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant } = {}) => (
  <ThemeProvider service={service}>
    <BrowserRouter>
      <FrontPage
        isAmp={false}
        pageType={FRONT_PAGE}
        status={200}
        pathname={
          serviceConfigs[service][variant || 'default'].navigation[0].url
        }
        service={service}
        variant={variant}
        pageData={serviceDataSets[service][variant || 'default']}
        mostReadEndpointOverride={getLocalMostReadEndpoint({
          service,
          variant,
        })}
      />
    </BrowserRouter>
  </ThemeProvider>
);

export default {
  Component,
  title: 'Pages/Front Page',
  decorators: [story => <WithTimeMachine>{story()}</WithTimeMachine>],
};

export const Urdu = () => <Component service="urdu" />;
export const News = () => <Component service="news" />;
export const SerbianCyrillic = () => (
  <Component service="serbian" variant="cyr" />
);
export const SerbianLatin = () => <Component service="serbian" variant="lat" />;
