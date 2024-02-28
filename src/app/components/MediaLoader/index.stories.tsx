/* eslint-disable import/order */
import React from 'react';
import { PageTypes, Services } from '#app/models/types/global';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import MediaLoaderComponent from '.';
import ThemeProvider from '../ThemeProvider';
import md from './README.md';
import sample from './fixture';
import { RequestContextProvider } from '#app/contexts/RequestContext';

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
        <MediaLoaderComponent className="MediaLoader" blocks={sample} />
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
