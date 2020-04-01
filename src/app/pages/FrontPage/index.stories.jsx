import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import newsData from '#data/news/frontpage';
import igboData from '#data/igbo/frontpage';
import pidginData from '#data/pidgin/frontpage';
import thaiData from '#data/thai/frontpage';
import yorubaData from '#data/yoruba/frontpage';
import punjabiData from '#data/punjabi/frontpage';
import serbianCyrData from '#data/serbian/frontpage/cyr';
import serbianLatData from '#data/serbian/frontpage/lat';
import { service as newsConfig } from '#lib/config/services/news';
import { service as igboConfig } from '#lib/config/services/igbo';
import { service as pidginConfig } from '#lib/config/services/pidgin';
import { service as thaiConfig } from '#lib/config/services/thai';
import { service as yorubaConfig } from '#lib/config/services/yoruba';
import { service as punjabiConfig } from '#lib/config/services/punjabi';
import { service as serbianConfig } from '#lib/config/services/serbian';
import { FrontPage } from '..';

const serviceDataSets = {
  news: { default: newsData },
  igbo: { default: igboData },
  yoruba: { default: yorubaData },
  pidgin: { default: pidginData },
  thai: { default: thaiData },
  punjabi: { default: punjabiData },
  serbian: {
    cyr: serbianCyrData,
    lat: serbianLatData,
  },
};

const serviceConfigs = {
  news: newsConfig,
  igbo: igboConfig,
  pidgin: pidginConfig,
  thai: thaiConfig,
  yoruba: yorubaConfig,
  punjabi: punjabiConfig,
  serbian: serbianConfig,
};

const stories = storiesOf('Pages|Front Page', module).addDecorator((story) => (
  <WithTimeMachine>{story()}</WithTimeMachine>
));

Object.keys(serviceDataSets).forEach((service) => {
  Object.keys(serviceDataSets[service]).forEach((variant) => {
    stories.add(`${service} ${variant === 'default' ? '' : variant}`, () => (
      <BrowserRouter>
        <FrontPage
          isAmp={false}
          pageType="frontPage"
          status={200}
          pathname={serviceConfigs[service][variant].navigation[0].url}
          service={service}
          variant={variant}
          pageData={serviceDataSets[service][variant]}
          mostReadEndpointOverride={`./data/${service}/mostRead/${
            variant === 'default' ? 'index' : variant
          }.json`}
        />
      </BrowserRouter>
    ));
  });
});
