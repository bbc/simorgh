import React from 'react';
import { PageTypes, Services } from '#app/models/types/global';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import MediaLoaderComponent from '.';
import ThemeProvider from '../ThemeProvider';
import md from './README.md';
import { aresMediaBlocks } from './fixture';
import { MediaBlock } from './types';

type Props = {
  pageType: PageTypes;
  service: Services;
};

const Component = ({ service, pageType }: Props) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      id="testID"
      isAmp={false}
      isApp={false}
      pageType={pageType}
      pathname=""
      service={service}
      counterName="testCounterName"
    >
      <ThemeProvider service={service}>
        <MediaLoaderComponent blocks={aresMediaBlocks as MediaBlock[]} />
      </ThemeProvider>
    </RequestContextProvider>
  </ServiceContextProvider>
);

export default {
  title: 'Components/MediaLoader',
  Component,
  parameters: {
    docs: {
      component: {
        title: 'MediaLoader',
      },
      page: md,
    },
  },
};

export const ArticleMediaLoader = () => (
  <Component service="pidgin" pageType="article" />
);
