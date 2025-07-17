import { PropsWithChildren } from 'react';
import { screen, waitFor } from '@testing-library/react';
import {
  OptimizelyDecision,
  OptimizelyProvider,
  ReactSDKClient,
} from '@optimizely/react-sdk';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { PageTypes, Services } from '#app/models/types/global';
import { ARTICLE_PAGE, HOME_PAGE } from '#app/routes/utils/pageTypes';
import { render } from '../react-testing-library-with-providers';
import OptimizelyPageMetrics from '.';
import experimentsForPageMetrics from './experimentsForPageMetrics';

const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
  setUser: jest.fn(() => Promise.resolve()),
  decideAll: jest.fn(() => ({
    mockExperiment1: { variationKey: 'variation_1' } as OptimizelyDecision,
    mockExperiment2: { variationKey: 'variation_1' } as OptimizelyDecision,
    mockExperimentOff: { variationKey: 'off' } as OptimizelyDecision,
  })),
} satisfies Partial<ReactSDKClient>;

jest.mock('./PageCompleteTracking', () => () => (
  <div data-testid="page-complete-tracking" />
));
jest.mock('./ScrollDepthTracking', () => () => (
  <div data-testid="scroll-depth-tracking" />
));
jest.mock('./PageViewTracking', () => () => (
  <div data-testid="page-view-tracking" />
));

jest.mock('./experimentsForPageMetrics', () => ({
  __esModule: true,
  default: [],
}));

interface Props {
  pageType: PageTypes;
  service: Services;
  isAmp?: boolean;
  mockOptimizely?: Partial<ReactSDKClient>;
}

const ContextWrap = ({
  pageType,
  children,
  service,
  isAmp,
  mockOptimizely = optimizely,
}: PropsWithChildren<Props>) => (
  <RequestContextProvider
    isAmp={isAmp}
    pageType={pageType}
    service={service}
    pathname="/pathname"
  >
    <OptimizelyProvider
      optimizely={mockOptimizely as ReactSDKClient}
      isServerSide
    >
      {children}
    </OptimizelyProvider>
  </RequestContextProvider>
);

describe('OptimizelyPageMetrics', () => {
  beforeEach(() => {
    experimentsForPageMetrics.splice(0, experimentsForPageMetrics.length);
  });

  it('should return null when isAmp is true', async () => {
    experimentsForPageMetrics.push(
      ...[
        {
          pageType: ARTICLE_PAGE,
          activeExperiments: ['mockExperiment1', 'mockExperiment2'],
        },
      ],
    );
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp>
        <OptimizelyPageMetrics trackPageView trackPageDepth trackPageComplete />
      </ContextWrap>,
    );
    await waitFor(() => {
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

  it('should render no tracking components by default when all tracking flags are false', async () => {
    experimentsForPageMetrics.push(
      ...[
        {
          pageType: ARTICLE_PAGE,
          activeExperiments: ['mockExperiment1', 'mockExperiment2'],
        },
      ],
    );
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics />
      </ContextWrap>,
    );
    await waitFor(() => {
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

  it('should render PageCompleteTracking when trackPageComplete is true', async () => {
    experimentsForPageMetrics.push(
      ...[
        {
          pageType: ARTICLE_PAGE,
          activeExperiments: ['mockExperiment1', 'mockExperiment2'],
        },
      ],
    );
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageComplete />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(screen.getByTestId('page-complete-tracking')).toBeInTheDocument();
    });
  });

  it('should render ScrollDepthTracking when trackPageDepth is true', async () => {
    experimentsForPageMetrics.push(
      ...[
        {
          pageType: ARTICLE_PAGE,
          activeExperiments: ['mockExperiment1', 'mockExperiment2'],
        },
      ],
    );
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageDepth />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(screen.getByTestId('scroll-depth-tracking')).toBeInTheDocument();
    });
  });

  it('should render PageViewTracking when trackPageView is true', async () => {
    experimentsForPageMetrics.push(
      ...[
        {
          pageType: ARTICLE_PAGE,
          activeExperiments: ['mockExperiment1', 'mockExperiment2'],
        },
      ],
    );
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageView />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(screen.getByTestId('page-view-tracking')).toBeInTheDocument();
    });
  });

  it('should render all tracking components when all flags are true', async () => {
    experimentsForPageMetrics.push(
      ...[
        {
          pageType: ARTICLE_PAGE,
          activeExperiments: ['mockExperiment1', 'mockExperiment2'],
        },
      ],
    );
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageComplete trackPageDepth trackPageView />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(screen.getByTestId('page-complete-tracking')).toBeInTheDocument();
      expect(screen.getByTestId('scroll-depth-tracking')).toBeInTheDocument();
      expect(screen.getByTestId('page-view-tracking')).toBeInTheDocument();
    });
  });

  it('should return null when there are no experiments running', async () => {
    experimentsForPageMetrics.push(...[]);
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageComplete />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(
        screen.queryByTestId('page-complete-tracking'),
      ).not.toBeInTheDocument();
    });
  });

  it('should return null when a user is no experiments', async () => {
    experimentsForPageMetrics.push(
      ...[
        {
          pageType: ARTICLE_PAGE,
          activeExperiments: ['mockExperimentOff'],
        },
      ],
    );
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageComplete />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(
        screen.queryByTestId('page-complete-tracking'),
      ).not.toBeInTheDocument();
    });
  });

  it('should return null when pageType does not match', async () => {
    experimentsForPageMetrics.push(
      ...[
        {
          pageType: HOME_PAGE,
          activeExperiments: ['mockExperiment1', 'mockExperiment2'],
        },
      ],
    );
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageComplete trackPageDepth trackPageView />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(
        screen.queryByTestId('page-complete-tracking'),
      ).not.toBeInTheDocument();
    });
  });

  it('should null when experiment names do not match Optimizely', async () => {
    experimentsForPageMetrics.push(
      ...[
        {
          pageType: ARTICLE_PAGE,
          activeExperiments: ['invalidExperiment'],
        },
      ],
    );
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageComplete trackPageDepth trackPageView />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(
        screen.queryByTestId('page-complete-tracking'),
      ).not.toBeInTheDocument();
    });
  });

  it('should call decideAll with argument to disable decision impression activation event', async () => {
    experimentsForPageMetrics.push(
      ...[
        {
          pageType: ARTICLE_PAGE,
          activeExperiments: ['mockExperiment1', 'mockExperiment2'],
        },
      ],
    );
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageComplete trackPageDepth trackPageView />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(optimizely.decideAll).toHaveBeenCalledWith([
        'DISABLE_DECISION_EVENT',
      ]);
    });
  });

  describe('Multiple experiments on different page types', () => {
    it('should render correctly when a user is in an experiment on the current page type', async () => {
      experimentsForPageMetrics.push(
        ...[
          {
            pageType: ARTICLE_PAGE,
            activeExperiments: ['mockExperiment1'],
          },
          {
            pageType: HOME_PAGE,
            activeExperiments: ['mockExperimentOff'],
          },
        ],
      );
      render(
        <ContextWrap pageType={ARTICLE_PAGE} service="news">
          <OptimizelyPageMetrics
            trackPageComplete
            trackPageDepth
            trackPageView
          />
        </ContextWrap>,
      );
      await waitFor(() => {
        expect(
          screen.getByTestId('page-complete-tracking'),
        ).toBeInTheDocument();
        expect(screen.getByTestId('scroll-depth-tracking')).toBeInTheDocument();
        expect(screen.getByTestId('page-view-tracking')).toBeInTheDocument();
      });
    });

    it('should return null when a user is not in an experiment on the current page type', async () => {
      experimentsForPageMetrics.push(
        ...[
          {
            pageType: ARTICLE_PAGE,
            activeExperiments: ['mockExperimentOff'],
          },
          {
            pageType: HOME_PAGE,
            activeExperiments: ['mockExperiment2'],
          },
        ],
      );
      render(
        <ContextWrap pageType={ARTICLE_PAGE} service="news">
          <OptimizelyPageMetrics
            trackPageComplete
            trackPageDepth
            trackPageView
          />
        </ContextWrap>,
      );
      await waitFor(() => {
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
  });
});
