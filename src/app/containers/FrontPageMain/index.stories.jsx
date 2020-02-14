import React from 'react';
import { storiesOf } from '@storybook/react';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import newsData from '#data/news/frontpage';
import igboData from '#data/igbo/frontpage';
import pidginData from '#data/pidgin/frontpage';
import thaiData from '#data/thai/frontpage';
import yorubaData from '#data/yoruba/frontpage';
import punjabiData from '#data/punjabi/frontpage';
import zhongwenSimpData from '#data/zhongwen/frontpage/simp';
import FrontPageMain from '.';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';

const serviceSets = {
  news: { data: newsData, variant: null },
  igbo: { data: igboData, variant: null },
  yoruba: { data: yorubaData, variant: null },
  pidgin: { data: pidginData, variant: null },
  thai: { data: thaiData, variant: null },
  punjabi: { data: punjabiData, variant: null },
  zhongwen: { data: zhongwenSimpData, variant: 'simp' },
};

const stories = storiesOf('Main|Front Page', module).addDecorator(story => (
  <WithTimeMachine>{story()}</WithTimeMachine>
));

Object.keys(serviceSets).forEach(service => {
  stories.add(`Front Page - ${service}`, () => (
    <ToggleContextProvider>
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          isAmp={false}
          pageType="frontPage"
          service={service}
        >
          <UserContextProvider>
            <FrontPageMain
              frontPageData={serviceSets[service].data}
              mostReadEndpointOverride={`./data/${service}/mostRead/${
                serviceSets[service].variant ? 'variant' : 'index'
              }.json`}
              forceMostRead
            />
          </UserContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  ));
});
