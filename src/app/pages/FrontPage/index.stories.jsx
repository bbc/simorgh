import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import arabicData from '#data/arabic/frontpage';
import igboData from '#data/igbo/frontpage';
import serbianCyrData from '#data/serbian/frontpage/cyr';
import serbianLatData from '#data/serbian/frontpage/lat';
import { service as arabicConfig } from '#lib/config/services/arabic';
import { service as igboConfig } from '#lib/config/services/igbo';
import { service as serbianConfig } from '#lib/config/services/serbian';
import { getLocalMostReadEndpoint } from '#lib/utilities/getMostReadUrls';
import { FrontPage } from '..';

const serviceDataSets = {
  arabic: { default: arabicData },
  igbo: { default: igboData },
  serbian: {
    cyr: serbianCyrData,
    lat: serbianLatData,
  },
};

const serviceConfigs = {
  arabic: arabicConfig,
  igbo: igboConfig,
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
          mostReadEndpointOverride={getLocalMostReadEndpoint({
            service,
            variant,
          })}
        />
      </BrowserRouter>
    ));
  });
});
