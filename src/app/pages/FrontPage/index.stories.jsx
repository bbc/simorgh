import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { data as urduData } from '#data/urdu/frontpage';
import { data as hausaData } from '#data/hausa/frontpage';
import { data as newsData } from '#data/news/frontpage';
import { data as serbianCyrData } from '#data/serbian/frontpage/cyr';
import { data as serbianLatData } from '#data/serbian/frontpage/lat';
import { service as urduConfig } from '../../lib/config/services/urdu';
import { service as newsConfig } from '../../lib/config/services/news';
import { service as serbianConfig } from '../../lib/config/services/serbian';
import { service as hausaConfig } from '../../lib/config/services/hausa';
import hausaRadioSchedule from '#data/hausa/bbc_hausa_radio/schedule.json'

import { getLocalMostReadEndpoint } from '#lib/utilities/getUrlHelpers/getMostReadUrls';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import ThemeProvider from '../../components/ThemeProvider';
import FrontPage from '.';

const serviceDataSets = {
  urdu: {
    default: { ...urduData.article, mostRead: urduData.secondaryData.mostRead },
  },
  news: {
    default: { ...newsData.article, mostRead: newsData.secondaryData.mostRead },
  },
  hausa: {
    default: {
      ...hausaData.article,
      mostRead: hausaData.secondaryData.mostRead,
      radioScheduleData: [
        {
          id: 'p0gf9fnr',
          state: 'next',
          startTime: 1698069570000,
          link: '/hausa/bbc_hausa_radio/w3ct52ql',
          brandTitle: 'Shirin Rana',
          summary:
            'Shiri ne na minti 30 wanda ya kunshi labaru da rahotanni daga sassa daban na duniya.',
          duration: 'PT30M',
        },
        {
          id: 'p0gf6s69',
          state: 'onDemand',
          startTime: 1698042600000,
          link: '/hausa/bbc_hausa_radio/w172z4k62ygtxfq',
          brandTitle: 'Shirin Hantsi',
          summary:
            'Shiri ne na minti 30 wanda ya kunshi labaru da rahotanni daga sassa daban na duniya.',
          duration: 'PT29M30S',
        },
        {
          id: 'p0gf6s67',
          state: 'onDemand',
          startTime: 1698038970000,
          link: '/hausa/bbc_hausa_radio/w3ct52x7',
          brandTitle: 'Shirin Safe',
          summary:
            'Shiri ne na minti 30 wanda ya kunshi labaru da rahotanni daga sassa daban na duniya.',
          duration: 'PT30M',
        },
        {
          id: 'p0gf5c8c',
          state: 'onDemand',
          startTime: 1698002970000,
          link: '/hausa/bbc_hausa_radio/w3ct5367',
          brandTitle: 'Shirin Yamma',
          summary:
            'Shiri ne na minti 30 wanda ya kunshi labaru da rahotanni daga sassa daban na duniya.',
          duration: 'PT30M',
        },
      ],
      radioSchedulePosition: 'Verticals',
    },
  },
  serbian: {
    cyr: {
      ...serbianCyrData.article,
      mostRead: serbianCyrData.secondaryData.mostRead,
    },
    lat: {
      ...serbianLatData.article,
      mostRead: serbianLatData.secondaryData.mostRead,
    },
  },
};

const serviceConfigs = {
  urdu: urduConfig,
  news: newsConfig,
  hausa: hausaConfig,
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
export const Hausa = () => <Component service="hausa" />;
