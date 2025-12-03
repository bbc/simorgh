import React from 'react';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import featuresRtl from './fixturesRtl.json';
import features from './fixtures.json';
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import FeaturesAnalysis from '.';
import ThemeProvider from '../../../components/ThemeProvider';

const Component = ({
  isAmp = false,
  service = 'news',
  dir = 'ltr',
  data = features,
}) => (
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
              frostedPromo: { enabled: true, value: 1 },
            }}
          >
            <FeaturesAnalysis content={data} />
          </ToggleContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ThemeProvider>
  </div>
);

export default {
  Component,
  title: 'Containers/CPS Features & Analysis',
  parameters: { chromatic: { disable: true } },
};

// Canonical
export const News = () => <Component data={features} />;
export const Arabic = () => (
  <Component data={featuresRtl} service="arabic" dir="rtl" />
);
export const NewsWithOneItem = () => <Component data={[features[0]]} />;
export const ArabicWithOneItem = () => (
  <Component data={[featuresRtl[0]]} service="arabic" dir="rtl" />
);

// Amp
export const NewsAmp = () => <Component isAmp data={features} />;
NewsAmp.decorators = [AmpDecorator];

export const ArabicAmp = () => (
  <Component isAmp data={featuresRtl} service="arabic" dir="rtl" />
);
ArabicAmp.decorators = [AmpDecorator];

export const NewsWithOneItemAmp = () => (
  <Component isAmp data={[features[0]]} />
);
NewsWithOneItemAmp.decorators = [AmpDecorator];

export const ArabicWithOneItemAmp = () => (
  <Component isAmp data={[featuresRtl[0]]} service="arabic" dir="rtl" />
);
ArabicWithOneItemAmp.decorators = [AmpDecorator];
