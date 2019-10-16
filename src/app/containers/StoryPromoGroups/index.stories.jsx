import React from 'react';
import { storiesOf } from '@storybook/react';
import newsData from '#data/news/frontpage';
import igboData from '#data/igbo/frontpage';
import pidginData from '#data/pidgin/frontpage';
import thaiData from '#data/thai/frontpage';
import yorubaData from '#data/yoruba/frontpage';
import punjabiData from '#data/punjabi/frontpage';
import StoryPromoGroups from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

const serviceDataSets = {
  news: newsData,
  igbo: igboData,
  yoruba: yorubaData,
  pidgin: pidginData,
  thai: thaiData,
  punjabi: punjabiData,
};

const stories = storiesOf('Containers|StoryPromoGroups', module);

Object.keys(serviceDataSets).forEach(service => {
  stories.add(`StoryPromoGroups - ${service}`, () => (
    <ToggleContextProvider>
      <ServiceContextProvider service={service}>
        <StoryPromoGroups groups={serviceDataSets[service].content.groups} />
      </ServiceContextProvider>
    </ToggleContextProvider>
  ));

  stories.add(`StoryPromoGroups - ${service} - with title`, () => (
    <ToggleContextProvider>
      <ServiceContextProvider service={service}>
        <StoryPromoGroups
          groups={serviceDataSets[service].content.groups}
          title="Title of Index"
        />
      </ServiceContextProvider>
    </ToggleContextProvider>
  ));
});
