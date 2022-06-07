import React from 'react';
import { withServicesKnob } from '#legacy/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import { MemoryRouter } from 'react-router';

import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';

import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import Page from './TopicPage';

const TopicPage = withPageWrapper(Page);

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  return (
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
                  promos: fixture.data.summaries,
                  activePage: 1,
                  pageCount: 99,
                }}
              />
            </MemoryRouter>
          </UserContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
};

export default {
  title: 'Topic/Page',
  Component,
  decorators: [withKnobs, withServicesKnob({ defaultService: 'mundo' })],
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
