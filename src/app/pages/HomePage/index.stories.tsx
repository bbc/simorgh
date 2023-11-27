import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { data as kyrgyzHomePageData } from '#data/kyrgyz/homePage/index.json';
import { data as persianAfghanistan } from '#data/persian/afghanistan/tipohome.json';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../../components/ThemeProvider';
import { StoryProps } from '../../models/types/storybook';
import HomePage from '.';

interface HomePageStoryProps extends StoryProps {
  pageData: object;
  pathname?: string;
}

const Component = ({
  service,
  variant,
  pageData,
  pathname,
}: HomePageStoryProps) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <HomePage
          service={service}
          variant={variant}
          pageType={HOME_PAGE}
          status={200}
          isAmp={false}
          pathname={`${service || pathname}`}
          pageData={pageData}
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  Component,
  title: 'Pages/Home Page',
  decorators: [withKnobs, withServicesKnob()],
};

export const Kyrgyz = ({ variant }: HomePageStoryProps) => (
  <Component service="kyrgyz" variant={variant} pageData={kyrgyzHomePageData} />
);

export const PersianAfghanistan = ({ variant }: HomePageStoryProps) => (
  <Component
    service="persian"
    variant={variant}
    pathname="/persian/afghanistan"
    pageData={persianAfghanistan}
  />
);
