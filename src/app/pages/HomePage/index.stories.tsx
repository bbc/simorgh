/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { withKnobs } from '@storybook/addon-knobs';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from '#app/routes/homePage/getInitialData';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../../components/ThemeProvider';
import { StoryProps } from '../../models/types/storybook';
import HomePage from '.';

const Component = ({ service, variant }: StoryProps) => {
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    const loadPageData = async () => {
      const { pageData } = await getInitialData({
        service,
        variant,
        pageType: HOME_PAGE,
        path: `/${service}`,
      });
      // @ts-expect-error suppressing this error as it is required to fetch data client-side
      setPageData(pageData);
    };

    loadPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  if (Object.keys(pageData).length === 0) {
    return <>Unable to render Homepage for {service}</>;
  }

  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <BrowserRouter>
          <HomePage
            service={service}
            variant={variant}
            pageType={HOME_PAGE}
            status={200}
            isAmp={false}
            pathname={`/${service}`}
            pageData={pageData}
          />
        </BrowserRouter>
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
