import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import { MemoryRouter } from 'react-router';

import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';

import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import fixture from '#data/mundo/topics/c1en6xwmpkvt.json';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import Page from './TopicPage';
import ThemeProvider from '../../components/ThemeProvider';

const TopicPage = withPageWrapper(Page);

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ToggleContextProvider
        toggles={{
          eventTracking: { enabled: true },
        }}
      >
        <ServiceContextProvider service={service} variant={variant}>
          <RequestContextProvider
            isAmp={false}
            pageType={TOPIC_PAGE}
            service="mundo"
            pathname=""
          >
            <UserContextProvider>
              <MemoryRouter>
                <TopicPage
                  status={200}
                  pageData={{
                    title: fixture.data.title,
                    description: fixture.data.description,
                    imageData: fixture.data.imageData,
                    images: fixture.data.images,
                    curations: fixture.data.curations,
                    activePage: null,
                    pageCount: null,
                  }}
                />
              </MemoryRouter>
            </UserContextProvider>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'Topic/Page',
  Component,
  decorators: [withKnobs, withServicesKnob({ defaultService: 'mundo' })],
  parameters: { chromatic: { disable: true }, layout: 'fullscreen' },
};

export const Example = Component;
