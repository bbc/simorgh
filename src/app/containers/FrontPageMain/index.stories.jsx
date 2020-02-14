import React from 'react';
import { storiesOf } from '@storybook/react';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import newsData from '#data/news/frontpage';
import igboData from '#data/igbo/frontpage';
import pidginData from '#data/pidgin/frontpage';
import thaiData from '#data/thai/frontpage';
import yorubaData from '#data/yoruba/frontpage';
import punjabiData from '#data/punjabi/frontpage';
import serbianCyrData from '#data/serbian/frontpage/cyr';
import serbianLatData from '#data/serbian/frontpage/lat';
import FrontPageMain from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';

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

const stories = storiesOf('Main|Front Page', module).addDecorator(story => (
  <WithTimeMachine>{story()}</WithTimeMachine>
));

Object.keys(serviceDataSets).forEach(service => {
  Object.keys(serviceDataSets[service]).forEach(variant => {
    stories.add(`${service} ${variant === 'default' ? '' : variant}`, () => (
      <ToggleContextProvider>
        <ServiceContextProvider service={service}>
          <RequestContextProvider
            isAmp={false}
            pageType="frontPage"
            service={service}
            variant={variant}
          >
            <UserContextProvider>
              <FrontPageMain
                frontPageData={serviceDataSets[service][variant]}
              />
            </UserContextProvider>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    ));
  });
});
