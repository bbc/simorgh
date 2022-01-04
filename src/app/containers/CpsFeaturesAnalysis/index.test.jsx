import React from 'react';
import { render, screen } from '@testing-library/react';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import FeaturesAnalysis from '.';
import features from '#pages/StoryPage/featuresAnalysis.json';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import isLive from '#lib/utilities/isLive';

const toggleFixture = ({ frostedPromoCount = 0 } = {}) => ({
  eventTracking: { enabled: true },
  frostedPromo: { enabled: true, value: frostedPromoCount },
});

// eslint-disable-next-line react/prop-types
const renderFeaturesAnalysis = ({
  content = features,
  bbcOrigin = 'https://www.test.bbc.co.uk',
  frostedPromoCount = 0,
} = {}) => {
  return render(
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        isAmp={false}
        pageType={STORY_PAGE}
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <ToggleContextProvider toggles={toggleFixture({ frostedPromoCount })}>
          <FeaturesAnalysis content={content} enableGridWrapper />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

const renderFeaturesAnalysisNull = ({
  bbcOrigin = 'https://www.test.bbc.co.uk',
  frostedPromoCount = 0,
} = {}) => {
  return render(
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        isAmp={false}
        pageType={STORY_PAGE}
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <ToggleContextProvider toggles={toggleFixture({ frostedPromoCount })}>
          <FeaturesAnalysis content={[]} enableGridWrapper />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

const renderFeaturesAnalysisNoTitle = ({
  content = features,
  bbcOrigin = 'https://www.test.bbc.co.uk',
  frostedPromoCount = 0,
} = {}) => {
  return render(
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        isAmp={false}
        pageType={STORY_PAGE}
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <ToggleContextProvider toggles={toggleFixture({ frostedPromoCount })}>
          <FeaturesAnalysis content={content} enableGridWrapper />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

jest.mock('#lib/utilities/isLive', () => jest.fn());

describe('CpsFeaturesAnalysis', () => {
  it('tests use a fixture that has multiple features', () => {
    expect(features.length).toBeGreaterThan(1);
  });

  it('should render Story Feature components when given appropriate data', () => {
    isLive.mockImplementationOnce(() => true);

    const { asFragment } = renderFeaturesAnalysis();

    expect(document.querySelectorAll(`li[class*='StoryPromoLi']`).length).toBe(
      features.length,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Story Promo components without <ul> when given single item in collection', () => {
    isLive.mockImplementationOnce(() => true);

    const topFeaturesOneItem = [features[0]];

    expect(features[0]).toBeTruthy();

    const { asFragment } = renderFeaturesAnalysis({
      content: topFeaturesOneItem,
    });

    expect(document.querySelector(`li[class*='StoryPromoLi']`)).toBeNull();

    expect(document.querySelector(`ul`)).toBeNull();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should have a section with a "region" role (a11y) and [aria-labelledby="features-analysis-heading"]', () => {
    renderFeaturesAnalysis();
    expect(
      document.querySelectorAll(
        `section[role='region'][aria-labelledby="features-analysis-heading"]`,
      ).length,
    ).toBe(1);
  });

  it('should have an [id] #features-analysis-heading', () => {
    renderFeaturesAnalysis();
    expect(document.querySelector(`#features-analysis-heading`)).toBeTruthy();
  });

  it('should not render Features and Analysis components if no data is passed', () => {
    renderFeaturesAnalysisNull();
    expect(document.querySelectorAll(`li[class*='StoryPromoLi']`).length).toBe(
      0,
    );
  });
  it('should render a default title if translations are not available', () => {
    renderFeaturesAnalysisNoTitle();
    expect(screen.getByText(`Features & Analysis`)).toBeTruthy();
  });
});

describe('CpsFeaturesAnalysis - Event Tracking', () => {
  it('should implement 2 BLOCK level click trackers(1 for each promo item) and 0 link level click trackers', () => {
    isLive.mockImplementationOnce(() => true);
    const expected = {
      componentName: 'features',
      preventNavigation: true,
    };
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

    renderFeaturesAnalysis();

    const [
      [blockLevelTrackingItem1],
      [linkLevelTrackingItem1],

      [blockLevelTrackingItem2],
      [linkLevelTrackingItem2],
    ] = clickTrackerSpy.mock.calls;

    expect(blockLevelTrackingItem1).toEqual(expected);
    expect(linkLevelTrackingItem1).toEqual({});

    expect(blockLevelTrackingItem2).toEqual(expected);
    expect(linkLevelTrackingItem2).toEqual({});
  });

  it('should implement 1 BLOCK level view tracker', () => {
    const expected = {
      componentName: 'features',
    };
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    renderFeaturesAnalysis();

    const [[blockLevelTracking]] = viewTrackerSpy.mock.calls;

    expect(blockLevelTracking).toEqual(expected);
  });
});

const countFrostedPromos = container =>
  container.querySelectorAll('[data-testid^=frosted-promo]').length;

describe('CpsFeaturesAnalysis - Frosted Promos', () => {
  it('should not render frosted promos by default', async () => {
    const { container } = renderFeaturesAnalysis({
      frostedPromoCount: null,
    });

    expect(countFrostedPromos(container)).toBe(0);
  });

  it('can render a single frosted promo', async () => {
    const { container } = renderFeaturesAnalysis({
      frostedPromoCount: 1,
    });

    expect(countFrostedPromos(container)).toBe(1);
  });

  it('can render multiple frosted promos', async () => {
    const { container } = renderFeaturesAnalysis({
      frostedPromoCount: features.length,
    });

    expect(countFrostedPromos(container)).toBe(features.length);
  });
});
