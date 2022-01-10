import React from 'react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import topStories from '#pages/StoryPage/topStories.json';
import topStoriesRtl from '#pages/StoryPage/topStoriesRtl.json';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import TopStories from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ isAmp = false, service, dir = 'ltr', data }) => (
  <div dir={dir}>
    {/* The above simulates dir being added at the page level */}
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
export const Igbo = () => <Component service="igbo" data={topStories} />;
export const Arabic = () => (
  <Component service="arabic" dir="rtl" data={topStoriesRtl} />
);
export const IgboWithOneItem = () => (
  <Component service="igbo" data={[topStories[0]]} />
);
export const ArabicWithOneItem = () => (
  <Component service="arabic" dir="rtl" data={[topStoriesRtl[0]]} />
);

// Amp
export const IgboAmp = () => (
  <Component isAmp service="igbo" data={topStories} />
);
IgboAmp.decorators = [AmpDecorator];

export const ArabicAmp = () => (
  <Component isAmp service="arabic" dir="rtl" data={topStoriesRtl} />
);
ArabicAmp.decorators = [AmpDecorator];

export const IgboWithOneItemAmp = () => (
  <Component isAmp service="igbo" data={[topStories[0]]} />
);
IgboWithOneItemAmp.decorators = [AmpDecorator];

export const ArabicWithOneItemAmp = () => (
  <Component isAmp service="arabic" dir="rtl" data={[topStoriesRtl[0]]} />
);
ArabicWithOneItemAmp.decorators = [AmpDecorator];
