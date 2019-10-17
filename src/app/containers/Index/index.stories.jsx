import React from 'react';
import { storiesOf } from '@storybook/react';
import newsData from '#data/news/frontpage';
import igboData from '#data/igbo/frontpage';
import pidginData from '#data/pidgin/frontpage';
import thaiData from '#data/thai/frontpage';
import yorubaData from '#data/yoruba/frontpage';
import punjabiData from '#data/punjabi/frontpage';
import Index from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const serviceDataSets = {
  news: newsData,
  igbo: igboData,
  yoruba: yorubaData,
  pidgin: pidginData,
  thai: thaiData,
  punjabi: punjabiData,
};

const stories = storiesOf('Containers|Index', module);

Object.keys(serviceDataSets).forEach(service => {
  stories.add(`Index - ${service} - with visually hidden title`, () => (
    <ServiceContextProvider service={service}>
      <Index
        groups={serviceDataSets[service].content.groups}
        title="Title of Index"
        hideTitle
      />
    </ServiceContextProvider>
  ));

  stories.add(`Index - ${service} - with visible title`, () => (
    <ServiceContextProvider service={service}>
      <Index
        groups={serviceDataSets[service].content.groups}
        title="Title of Index"
      />
    </ServiceContextProvider>
  ));
});
