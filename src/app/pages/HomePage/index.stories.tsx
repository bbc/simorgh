/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import fetchPageData from '#app/routes/utils/fetchPageData';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../../components/ThemeProvider';
import { StoryProps } from '../../models/types/storybook';
import HomePage from '.';

const Component = ({ service, variant }: StoryProps) => {
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    const loadPageData = async () => {
      const {
        json: { data: pageData },
        // @ts-expect-error args required
      } = await fetchPageData({
        path: `/${service}/homePage/index`,
      });
      setPageData(pageData);
    };

    loadPageData();
  }, [service]);

  if (Object.keys(pageData).length === 0) {
    return <>Unable to render Homepage for {service}</>;
  }

  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <HomePage
          service={service}
          variant={variant}
          pageType={HOME_PAGE}
          status={200}
          isAmp={false}
          pathname={`/${service}`}
          pageData={pageData}
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  Component,
  title: 'Pages/Home Page',
  decorators: [withKnobs, withServicesKnob({ defaultService: 'kyrgyz' })],
};

export const Example = ({ service, variant }: StoryProps) => (
  <Component service={service} variant={variant} />
);
