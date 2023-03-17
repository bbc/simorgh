/* eslint-disable react/prop-types */
import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import {
  OptimizelyExperiment,
  OptimizelyProvider,
  ReactSDKClient,
} from '@optimizely/react-sdk';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { render } from '../react-testing-library-with-providers';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { Services } from '../../models/types/global';
import OptimizelyRecommendations, { ArticlePageType } from '.';
import { samplePageData, hybridV1RecommendationsSample } from './fixtureData';

// 005_brasil_recommendations_experiment
const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
  user: {
    attributes: {},
  },
  close: jest.fn(),
} as unknown as ReactSDKClient;

jest.mock('@optimizely/react-sdk', () => {
  const actualModules = jest.requireActual('@optimizely/react-sdk');
  return {
    __esModule: true,
    ...actualModules,
    OptimizelyExperiment: jest.fn(),
  };
});

// 005_brasil_recommendations_experiment
jest.mock('#containers/ATIAnalytics/beacon', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    sendEventBeacon: jest.fn(),
  };
});

const makeMockFn =
  (variationMock: string | null) => (props: { children: unknown }) => {
    const { children } = props;

    const variation = variationMock;

    if (children != null && typeof children === 'function') {
      return <>{children(variation, true, false)}</>;
    }

    return null;
  };

const renderContainer = (service: Services, pageData: ArticlePageType) => {
  const toggleState = {
    cpsRecommendations: {
      enabled: true,
    },
    eventTracking: {
      enabled: true,
    },
  };
  return render(
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        isAmp={false}
        pageType={STORY_PAGE}
        pathname="/service/085965"
        service={service}
        statusCode={200}
      >
        <ToggleContext.Provider
          value={{ toggleState, toggleDispatch: jest.fn() }}
        >
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <OptimizelyProvider optimizely={optimizely} isServerSide>
              <OptimizelyRecommendations pageData={pageData} />
            </OptimizelyProvider>
          }
        </ToggleContext.Provider>
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

describe('OptimizelyRecommendations', () => {
  describe('when toggle is enabled and the service supports recommendations', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should render the default recommendation if no experiment is set', () => {
      (OptimizelyExperiment as jest.Mock).mockImplementation(makeMockFn(null));

      const { getByText } = renderContainer(
        'portuguese',
        samplePageData as unknown as ArticlePageType,
      );

      expect(
        getByText(
          'PL das fake news pode acirrar polarização política, diz pesquisador',
        ),
      ).toBeInTheDocument();
    });

    it('should render the default recommendation if the experiment cannot be found', () => {
      (OptimizelyExperiment as jest.Mock).mockImplementation(
        makeMockFn('variation_1'),
      );

      const { getByText } = renderContainer(
        'portuguese',
        samplePageData as unknown as ArticlePageType,
      );

      expect(
        getByText(
          'PL das fake news pode acirrar polarização política, diz pesquisador',
        ),
      ).toBeInTheDocument();
    });

    it('should render the appropriate recommendation if an experiment is set', () => {
      (OptimizelyExperiment as jest.Mock).mockImplementation(
        makeMockFn('variation_1'),
      );

      const sampleData = {
        ...samplePageData,
        datalabHybridRecommendationsV1x1: hybridV1RecommendationsSample,
      };

      const { getByText } = renderContainer(
        'portuguese',
        sampleData as unknown as ArticlePageType,
      );

      expect(
        getByText('SAMPLE RECOMMENDATION 1 - HEADLINE'),
      ).toBeInTheDocument();
    });
  });
});
