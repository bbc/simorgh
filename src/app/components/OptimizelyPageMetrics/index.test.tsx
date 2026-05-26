import { act, type PropsWithChildren } from 'react';

import { screen, waitFor } from '@testing-library/react';

import { RequestContextProvider } from '#app/contexts/RequestContext';
import {
  notifyDecision,
  resetDecisionStore,
} from '#app/lib/optimizelyDecisionStore';
import type { PageTypes, Services } from '#app/models/types/global';
import { ARTICLE_PAGE, HOME_PAGE } from '#app/routes/utils/pageTypes';
import { render } from '../react-testing-library-with-providers';
import OptimizelyPageMetrics from '.';
import experimentsForPageMetrics from './experimentsForPageMetrics';

jest.mock('./PageCompleteTracking', () => () => (
  <div data-testid="page-complete-tracking" />
));
jest.mock('./ScrollDepthTracking', () => () => (
  <div data-testid="scroll-depth-tracking" />
));
// capture the trackVisit prop so tests can assert pass-through behaviour
jest.mock(
  './PageViewTracking',
  () =>
    ({ trackVisit }: { trackVisit?: boolean }) => (
      <div
        data-testid="page-view-tracking"
        data-track-visit={trackVisit ? 'true' : 'false'}
      />
    ),
);

jest.mock('./experimentsForPageMetrics', () => ({
  __esModule: true,
  default: [],
}));

interface Props {
  pageType: PageTypes;
  service: Services;
  isAmp?: boolean;
}

const ContextWrap = ({
  pageType,
  children,
  service,
  isAmp,
}: PropsWithChildren<Props>) => (
  <RequestContextProvider
    isAmp={isAmp}
    pageType={pageType}
    service={service}
    pathname="/pathname"
  >
    {children}
  </RequestContextProvider>
);

describe('OptimizelyPageMetrics', () => {
  beforeEach(() => {
    experimentsForPageMetrics.splice(0, experimentsForPageMetrics.length);
    resetDecisionStore();
  });

  it('should not include tracking when isAmp is true', () => {
    experimentsForPageMetrics.push({
      pageType: ARTICLE_PAGE,
      activeExperiments: ['mockExperiment1', 'mockExperiment2'],
    });
    notifyDecision('mockExperiment1');
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp>
        <OptimizelyPageMetrics
          trackPageView
          trackPageDepth
          trackPageComplete
          trackVisit
        />
      </ContextWrap>,
    );
    expect(
      screen.queryByTestId('page-complete-tracking'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('scroll-depth-tracking'),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('page-view-tracking')).not.toBeInTheDocument();
  });

  it('should render no tracking components by default when all tracking flags are false', () => {
    experimentsForPageMetrics.push({
      pageType: ARTICLE_PAGE,
      activeExperiments: ['mockExperiment1', 'mockExperiment2'],
    });
    notifyDecision('mockExperiment1');
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics />
      </ContextWrap>,
    );
    expect(
      screen.queryByTestId('page-complete-tracking'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('scroll-depth-tracking'),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('page-view-tracking')).not.toBeInTheDocument();
  });

  it('should render PageCompleteTracking when trackPageComplete is true', () => {
    experimentsForPageMetrics.push({
      pageType: ARTICLE_PAGE,
      activeExperiments: ['mockExperiment1', 'mockExperiment2'],
    });
    notifyDecision('mockExperiment1');
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageComplete />
      </ContextWrap>,
    );
    expect(screen.getByTestId('page-complete-tracking')).toBeInTheDocument();
  });

  it('should render ScrollDepthTracking when trackPageDepth is true', () => {
    experimentsForPageMetrics.push({
      pageType: ARTICLE_PAGE,
      activeExperiments: ['mockExperiment1', 'mockExperiment2'],
    });
    notifyDecision('mockExperiment1');
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageDepth />
      </ContextWrap>,
    );
    expect(screen.getByTestId('scroll-depth-tracking')).toBeInTheDocument();
  });

  it('should render PageViewTracking when trackPageView is true', () => {
    experimentsForPageMetrics.push({
      pageType: ARTICLE_PAGE,
      activeExperiments: ['mockExperiment1', 'mockExperiment2'],
    });
    notifyDecision('mockExperiment1');
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageView />
      </ContextWrap>,
    );
    expect(screen.getByTestId('page-view-tracking')).toBeInTheDocument();
  });

  it('should render all tracking components when all flags are true', () => {
    experimentsForPageMetrics.push({
      pageType: ARTICLE_PAGE,
      activeExperiments: ['mockExperiment1', 'mockExperiment2'],
    });
    notifyDecision('mockExperiment1');
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics
          trackPageComplete
          trackPageDepth
          trackPageView
          trackVisit
        />
      </ContextWrap>,
    );
    expect(screen.getByTestId('page-complete-tracking')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-depth-tracking')).toBeInTheDocument();
    expect(screen.getByTestId('page-view-tracking')).toBeInTheDocument();
    expect(screen.getByTestId('page-view-tracking')).toHaveAttribute(
      'data-track-visit',
      'true',
    );
  });

  it('should not include tracking when there are no experiments running', () => {
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageComplete />
      </ContextWrap>,
    );
    expect(
      screen.queryByTestId('page-complete-tracking'),
    ).not.toBeInTheDocument();
  });

  it('should not include tracking when a user is not activated in any experiment', () => {
    experimentsForPageMetrics.push({
      pageType: ARTICLE_PAGE,
      activeExperiments: ['mockExperiment1'],
    });
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageComplete />
      </ContextWrap>,
    );
    expect(
      screen.queryByTestId('page-complete-tracking'),
    ).not.toBeInTheDocument();
  });

  it('should not include tracking when pageType does not match', () => {
    experimentsForPageMetrics.push({
      pageType: HOME_PAGE,
      activeExperiments: ['mockExperiment1', 'mockExperiment2'],
    });
    notifyDecision('mockExperiment1');
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageComplete trackPageDepth trackPageView />
      </ContextWrap>,
    );
    expect(
      screen.queryByTestId('page-complete-tracking'),
    ).not.toBeInTheDocument();
  });

  it('should not include tracking when experiment names do not match activated experiments', () => {
    experimentsForPageMetrics.push({
      pageType: ARTICLE_PAGE,
      activeExperiments: ['invalidExperiment'],
    });
    notifyDecision('someOtherExperiment');
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics
          trackPageComplete
          trackPageDepth
          trackPageView
          trackVisit
        />
      </ContextWrap>,
    );
    expect(
      screen.queryByTestId('page-complete-tracking'),
    ).not.toBeInTheDocument();
  });

  describe('Multiple experiments on different page types', () => {
    it('should render correctly when a user is in an experiment on the current page type', () => {
      experimentsForPageMetrics.push(
        {
          pageType: ARTICLE_PAGE,
          activeExperiments: ['mockExperiment1'],
        },
        {
          pageType: HOME_PAGE,
          activeExperiments: ['mockExperiment2'],
        },
      );
      notifyDecision('mockExperiment1');
      render(
        <ContextWrap pageType={ARTICLE_PAGE} service="news">
          <OptimizelyPageMetrics
            trackPageComplete
            trackPageDepth
            trackPageView
            trackVisit
          />
        </ContextWrap>,
      );
      expect(screen.getByTestId('page-complete-tracking')).toBeInTheDocument();
      expect(screen.getByTestId('scroll-depth-tracking')).toBeInTheDocument();
      expect(screen.getByTestId('page-view-tracking')).toBeInTheDocument();
      expect(screen.getByTestId('page-view-tracking')).toHaveAttribute(
        'data-track-visit',
        'true',
      );
    });

    it('should not include tracking when a user is not in an experiment on the current page type', () => {
      experimentsForPageMetrics.push(
        {
          pageType: ARTICLE_PAGE,
          activeExperiments: ['mockExperiment1'],
        },
        {
          pageType: HOME_PAGE,
          activeExperiments: ['mockExperiment2'],
        },
      );
      notifyDecision('mockExperiment2');
      render(
        <ContextWrap pageType={ARTICLE_PAGE} service="news">
          <OptimizelyPageMetrics
            trackPageComplete
            trackPageDepth
            trackPageView
            trackVisit
          />
        </ContextWrap>,
      );
      expect(
        screen.queryByTestId('page-complete-tracking'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('scroll-depth-tracking'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('page-view-tracking'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Decision store updates', () => {
    it('should mount trackers when a decision is notified after initial render', async () => {
      experimentsForPageMetrics.push({
        pageType: ARTICLE_PAGE,
        activeExperiments: ['mockExperiment1'],
      });
      render(
        <ContextWrap pageType={ARTICLE_PAGE} service="news">
          <OptimizelyPageMetrics trackPageView />
        </ContextWrap>,
      );
      expect(
        screen.queryByTestId('page-view-tracking'),
      ).not.toBeInTheDocument();

      act(() => {
        notifyDecision('mockExperiment1');
      });

      await waitFor(() => {
        expect(screen.getByTestId('page-view-tracking')).toBeInTheDocument();
      });
    });

    it('should not mount trackers when an irrelevant decision is notified', async () => {
      experimentsForPageMetrics.push({
        pageType: ARTICLE_PAGE,
        activeExperiments: ['mockExperiment1'],
      });
      render(
        <ContextWrap pageType={ARTICLE_PAGE} service="news">
          <OptimizelyPageMetrics trackPageView />
        </ContextWrap>,
      );

      act(() => {
        notifyDecision('unrelatedExperiment');
      });

      await waitFor(() => {
        expect(
          screen.queryByTestId('page-view-tracking'),
        ).not.toBeInTheDocument();
      });
    });
  });
});
