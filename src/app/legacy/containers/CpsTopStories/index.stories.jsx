import React from 'react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import newsTopStories from '#pages/StoryPage/newsTopStories.json';
import topStoriesRtl from '#pages/StoryPage/topStoriesRtl.json';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#routes/utils/pageTypes';
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import TopStories from '.';
import ThemeProvider from '../../../components/ThemeProvider';

const Component = ({ isAmp = false, service, dir = 'ltr', data }) => (
  <div dir={dir}>
    {/* The above simulates dir being added at the page level */}
    <ThemeProvider service={service}>
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.com"
          isAmp={isAmp}
          pageType={STORY_PAGE}
          pathname="/"
          service={service}
        >
          <ToggleContextProvider
            toggles={{
              eventTracking: { enabled: false },
            }}
          >
            <TopStories content={data} />
          </ToggleContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ThemeProvider>
  </div>
);

export default {
  title: 'Containers/CPS Top Stories',
  parameters: {
    chromatic: {
      disable: true,
    },
  },
  Component,
};

// Canonical
export const News = () => <Component service="news" data={newsTopStories} />;
export const Arabic = () => (
  <Component service="arabic" dir="rtl" data={topStoriesRtl} />
);
export const NewsWithOneItem = () => (
  <Component service="news" data={[newsTopStories[0]]} />
);
export const ArabicWithOneItem = () => (
  <Component service="arabic" dir="rtl" data={[topStoriesRtl[0]]} />
);

// Amp
export const NewsAmp = () => (
  <Component isAmp service="news" data={newsTopStories} />
);
NewsAmp.decorators = [AmpDecorator];

export const ArabicAmp = () => (
  <Component isAmp service="arabic" dir="rtl" data={topStoriesRtl} />
);
ArabicAmp.decorators = [AmpDecorator];

export const NewsWithOneItemAmp = () => (
  <Component isAmp service="news" data={[newsTopStories[0]]} />
);
NewsWithOneItemAmp.decorators = [AmpDecorator];

export const ArabicWithOneItemAmp = () => (
  <Component isAmp service="arabic" dir="rtl" data={[topStoriesRtl[0]]} />
);
ArabicWithOneItemAmp.decorators = [AmpDecorator];
