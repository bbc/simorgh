import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';

import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import defaultTopic from '#data/mundo/topics/c1en6xwmpkvt.json';
import kyrgyzTopicWithMessageBanners from '#data/kyrgyz/topics/cvpv9djp9qqt.json';
import persianTopicWithMessageBanners from '#data/persian/topics/cyy2zqnqn67t.json';
import arabicTopicWithMessageBanners from '#data/arabic/topics/cng9qem66p5t.json';
import tamilTopicWithMessageBanners from '#data/tamil/topics/c03dm2xmzzpt.json';
import mundoTopicWithMessageBannerVariations from '#data/mundo/topics/cw90edn9kw4t.json';
import persianAfghanistan from '#data/persian/topics/crezq2dg9zwt.json';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import Page from './TopicPage';
import ThemeProvider from '../../components/ThemeProvider';

const TopicPage = withPageWrapper(Page);

const Component = ({
  service,
  variant = 'default',
  fixture = defaultTopic,
}) => {
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
            service={service}
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
  title: 'Pages/Topic Page',
  Component,
  parameters: { chromatic: { disable: true }, layout: 'fullscreen' },
};

export const Example = (_, { service, variant }) => (
  <Component service={service} variant={variant} />
);


export const PersianAfghanistan = () => (
  <Component service="persian" fixture={persianAfghanistan} />
);
