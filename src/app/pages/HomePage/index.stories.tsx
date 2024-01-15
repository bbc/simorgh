import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import { data as kyrgyzHomePageData } from '#data/kyrgyz/homePage/index.json';
import { data as hindiHomePageData } from '#data/hindi/homePage/index.json';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../../components/ThemeProvider';
import { StoryProps } from '../../models/types/storybook';
import HomePage from '.';

interface Props extends StoryProps {
  pageData?: object;
}

const Component = ({
  service,
  variant,
  pageData = kyrgyzHomePageData,
}: Props) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <HomePage
          service={service}
          variant={variant}
          pageType={HOME_PAGE}
          status={200}
          isAmp={false}
          pathname="/kyrgyz"
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

export const Kyrgyz = ({ variant }: StoryProps) => (
  <Component service="kyrgyz" variant={variant} />
);

export const Hindi = ({ variant }: StoryProps) => (
  <Component service="hindi" variant={variant} pageData={hindiHomePageData} />
);
