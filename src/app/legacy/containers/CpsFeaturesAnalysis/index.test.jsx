import React from 'react';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import {
  render,
  act,
  waitFor,
} from '../../../components/react-testing-library-with-providers';
import features from './fixtures.json';
import FeaturesAnalysis from '.';

const renderFeaturesAnalysis = ({
  content = features,
  bbcOrigin = 'https://www.test.bbc.co.uk',
  isAmp = false,
} = {}) => {
  return render(
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        isAmp={isAmp}
        pageType={STORY_PAGE}
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <ToggleContextProvider>
          <FeaturesAnalysis content={content} enableGridWrapper />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

const renderFeaturesAnalysisNull = ({
  bbcOrigin = 'https://www.test.bbc.co.uk',
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
        <ToggleContextProvider>
          <FeaturesAnalysis content={[]} enableGridWrapper />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

const renderFeaturesAnalysisNoTitle = ({
  content = features,
  bbcOrigin = 'https://www.test.bbc.co.uk',
} = {}) => {
  return render(
    <ServiceContextProvider service="ws">
      <RequestContextProvider
        bbcOrigin={bbcOrigin}
        isAmp={false}
        pageType={STORY_PAGE}
        pathname="/pidgin/tori-49450859"
        service="pidgin"
        statusCode={200}
      >
        <ToggleContextProvider>
          <FeaturesAnalysis content={content} enableGridWrapper />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

jest.mock('#lib/utilities/isLive', () => jest.fn());

describe('CpsFeaturesAnalysis', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('tests use a fixture that has multiple features', () => {
    expect(features.length).toBeGreaterThan(1);
  });

  it('should render Story Promo component without a list when given a single item in the collection', async () => {
    const topFeaturesOneItem = [features[0]];

    let queryByRole;
    await act(async () => {
      ({ queryByRole } = renderFeaturesAnalysis({
        content: topFeaturesOneItem,
      }));
    });
    expect(queryByRole('list')).toBe(null);
  });

  it('should render Story Promo component with a list when given multiple items in the collection', async () => {
    let queryByRole;

    await act(async () => {
      ({ queryByRole } = renderFeaturesAnalysis());
    });
    expect(queryByRole('list')).toBeTruthy();
  });

  it('should have a section with a "region" role (a11y) and [aria-labelledby="features-analysis-heading"]', async () => {
    let queryByRole;

    await act(async () => {
      ({ queryByRole } = renderFeaturesAnalysis());
    });
    const region = queryByRole('region');

    expect(region).toBeTruthy();
    expect(region.getAttribute('aria-labelledby')).toBe(
      'features-analysis-heading',
    );
  });

  it('should not render Features and Analysis components if no data is passed', () => {
    const { queryAllByRole } = renderFeaturesAnalysisNull();

    expect(queryAllByRole('listitem').length).toBe(0);
  });

  it('should render a default title if translations are not available', async () => {
    let queryByText;
    await act(async () => {
      ({ queryByText } = renderFeaturesAnalysisNoTitle());
    });

    expect(queryByText('Features & Analysis')).toBeTruthy();
  });
});

describe('CpsFeaturesAnalysis - Event Tracking', () => {
  it('should implement 2 BLOCK level click trackers(1 for each promo item) and 2 link level click trackers', async () => {
    const expected = {
      componentName: 'features',
      url: expect.any(String),
    };
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

    renderFeaturesAnalysis();

    await waitFor(() => {
      const [
        [blockLevelTrackingItem1],
        [linkLevelTrackingItem1],

        [blockLevelTrackingItem2],
        [linkLevelTrackingItem2],
      ] = clickTrackerSpy.mock.calls;

      expect(blockLevelTrackingItem1).toEqual(expected);
      expect(linkLevelTrackingItem1).toEqual(expected);

      expect(blockLevelTrackingItem2).toEqual(expected);
      expect(linkLevelTrackingItem2).toEqual(expected);
    });
  });

  it('should implement 1 BLOCK level view tracker', async () => {
    const expected = {
      componentName: 'features',
    };
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    await act(async () => renderFeaturesAnalysis());

    const [[blockLevelTracking]] = viewTrackerSpy.mock.calls;

    expect(blockLevelTracking).toEqual(expected);
  });
});

const countFrostedPromos = container =>
  container.querySelectorAll('[data-testid^=frosted-promo]').length;

describe('CpsFeaturesAnalysis - Frosted Promos', () => {
  it('should render with all high impact promos', async () => {
    let container;
    await act(async () => {
      ({ container } = renderFeaturesAnalysis());
    });

    expect(countFrostedPromos(container)).toBe(4);
  });

  it('should render with all high impact promos, when on amp', async () => {
    let container;
    await act(async () => {
      ({ container } = renderFeaturesAnalysis({ isAmp: true }));
    });

    expect(countFrostedPromos(container)).toBe(4);
  });
});
