import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import {
  OptimizelyExperiment,
  OptimizelyProvider,
  ReactSDKClient,
} from '@optimizely/react-sdk';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { Article } from '#app/models/types/optimo';
import { render } from '../react-testing-library-with-providers';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { Services } from '../../models/types/global';
import OptimizelyRecommendations from '.';
import { samplePageData, hybridV1RecommendationsSample } from './fixtureData';
import { suppressPropWarnings } from '../../legacy/psammead/psammead-test-helpers/src';

// 005_brasil_recommendations_experiment
const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  setUser: jest.fn(() => Promise.resolve()),
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
jest.mock('../ATIAnalytics/beacon', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    sendEventBeacon: jest.fn(),
  };
});

jest.mock('#lib/config/optimizely', () => ({
  flagId: '005_brasil_hybrid_recommendations',
  viewClickAttributeId: 'wsoj',
  variationMappings: {
    hybrid_recs: 'datalabHybridRecommendations',
    variation_1: 'datalabHybridRecommendationsV1x1',
    variation_2: 'datalabHybridRecommendationsV1x2',
    variation_3: 'datalabHybridRecommendationsV1x3',
    variation_4: 'datalabHybridRecommendationsV1x4',
    variation_5: 'datalabHybridRecommendationsV1x5',
  },
}));

const makeMockFn =
  (variationMock: string | null) => (props: { children: unknown }) => {
    const { children } = props;

    const variation = variationMock;

    if (children != null && typeof children === 'function') {
      return <>{children(variation, true, false)}</>;
    }

    return null;
  };

const renderContainer = (service: Services, pageData: Article) => {
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
        isApp={false}
        pageType={STORY_PAGE}
        pathname="/service/085965"
        service={service}
        statusCode={200}
      >
        <ToggleContext.Provider
          value={{ toggleState, toggleDispatch: jest.fn() }}
        >
          <OptimizelyProvider optimizely={optimizely} isServerSide>
            <OptimizelyRecommendations pageData={pageData} />
          </OptimizelyProvider>
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
      suppressPropWarnings([
        'pageData.metadata.locators.optimoUrn',
        'OptimizelyRecommendation',
        'undefined',
      ]);

      (OptimizelyExperiment as jest.Mock).mockImplementation(makeMockFn(null));

      const { getByText } = renderContainer(
        'portuguese',
        samplePageData as unknown as Article,
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
        samplePageData as unknown as Article,
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
        sampleData as unknown as Article,
      );

      expect(
        getByText('SAMPLE RECOMMENDATION 1 - HEADLINE'),
      ).toBeInTheDocument();
    });
  });
});
