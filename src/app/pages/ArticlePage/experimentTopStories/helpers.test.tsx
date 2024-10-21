import {
  getExperimentAnalyticsConfig,
  getExperimentTopStories,
} from './helpers';
import { topStoriesList } from '../PagePromoSections/TopStoriesSection/fixture/index';
import * as analyticsUtils from '../../../lib/analyticsUtils';

(analyticsUtils.getAtUserId as jest.Mock) = jest
  .fn()
  .mockReturnValue('123-456-789');

describe('AMP top stories experiment', () => {
  const mockTextBlock = {
    type: 'text',
    model: {
      blocks: [],
    },
  };
  const expectedExperimentTopStoriesBlock = (index: number) => {
    return {
      type: 'experimentTopStories',
      model: topStoriesList,
      id: `experimentTopStories-${index}`,
    };
  };

  const blocksShortLength = [mockTextBlock];

  const blocksEvenLength = [
    mockTextBlock,
    mockTextBlock,
    mockTextBlock,
    mockTextBlock,
  ];
  const blocksOddLength = [mockTextBlock, mockTextBlock, mockTextBlock];

  describe('getExperimentTopStories()', () => {
    it('returns shouldEnableExperimentTopStories as true if props match conditions.', () => {
      const { shouldEnableExperimentTopStories } = getExperimentTopStories({
        blocks: blocksEvenLength,
        topStoriesContent: topStoriesList,
        isAmp: true,
        id: 'c6v11qzyv8po',
        service: 'news',
      });
      expect(shouldEnableExperimentTopStories).toBe(true);
    });

    it.each`
      testDescription                                | isAmp    | id                | service
      ${'all props are undefined'}                   | ${false} | ${undefined}      | ${undefined}
      ${'only isAmp is true'}                        | ${true}  | ${undefined}      | ${undefined}
      ${'only pathname is undefined'}                | ${true}  | ${undefined}      | ${'news'}
      ${'only pathname is defined and valid'}        | ${false} | ${'c6v11qzyv8po'} | ${undefined}
      ${'all props defined but pathname is invalid'} | ${false} | ${'c1231qzyv8po'} | ${undefined}
      ${'only service is undefined'}                 | ${true}  | ${'c6v11qzyv8po'} | ${undefined}
      ${'only service is defined and valid'}         | ${false} | ${undefined}      | ${'news'}
      ${'all props defined but service is invalid'}  | ${true}  | ${'c6v11qzyv8po'} | ${'igbo'}
    `(
      'returns shouldEnableExperimentTopStories as false because $testDescription.',
      ({ isAmp, id, service }) => {
        const { shouldEnableExperimentTopStories } = getExperimentTopStories({
          blocks: blocksEvenLength,
          topStoriesContent: topStoriesList,
          isAmp,
          id,
          service,
        });

        expect(shouldEnableExperimentTopStories).toBe(false);
      },
    );

    const expectedBlocksEvenLength = [
      mockTextBlock,
      mockTextBlock,
      expectedExperimentTopStoriesBlock(2),
      mockTextBlock,
      mockTextBlock,
    ];
    const expectedBlocksOddLength = [
      mockTextBlock,
      expectedExperimentTopStoriesBlock(1),
      mockTextBlock,
      mockTextBlock,
    ];

    it.each`
      testType  | inputBlocks         | expectedOutput
      ${'even'} | ${blocksEvenLength} | ${expectedBlocksEvenLength}
      ${'odd'}  | ${blocksOddLength}  | ${expectedBlocksOddLength}
    `(
      'should insert experimentTopStories block into blocks array in the correct position when blocks.length is $testType',
      ({ inputBlocks, expectedOutput }) => {
        const { transformedBlocks } = getExperimentTopStories({
          blocks: inputBlocks,
          topStoriesContent: topStoriesList,
          isAmp: true,
          id: 'c6v11qzyv8po',
          service: 'news',
        });
        expect(transformedBlocks).toEqual(expectedOutput);
      },
    );

    it('does not insert experiment top stories blocks if the blocks array length is < 2.', () => {
      const { transformedBlocks } = getExperimentTopStories({
        blocks: blocksShortLength,
        topStoriesContent: topStoriesList,
        isAmp: true,
        id: 'c6v11qzyv8po',
        service: 'news',
      });
      expect(transformedBlocks).toBe(blocksShortLength);
    });
  });

  describe('getExperimentAnalyticsConfig()', () => {
    process.env.SIMORGH_ATI_BASE_URL = 'http://foobar.com?';

    const PS_NEWS_DESTINATION_ID = 598285;
    const PS_NEWS_TEST_DESTINATION_ID = 598286;
    const PS_NEWS_GNL_DESTINATION_ID = 598287;
    const PS_NEWS_GNL_TEST_DESINTATION_ID = 598288;
    const PS_SPORT_DESTINATION_ID = 598310;
    const PS_SPORT_TEST_DESTINATION_ID = 598311;
    const PS_SPORT_GNL_DESTINATION_ID = 598308;
    const PS_SPORT_GNL_TEST_DESTINATION_ID = 598309;
    const NEWS_PRODUCER_ID = 64;
    const SPORT_PRODUCER_ID = 85;

    it.each`
      service    | env       | destinationId                   | gnlId                               | producerId
      ${'news'}  | ${'live'} | ${PS_NEWS_DESTINATION_ID}       | ${PS_NEWS_GNL_DESTINATION_ID}       | ${NEWS_PRODUCER_ID}
      ${'news'}  | ${'test'} | ${PS_NEWS_TEST_DESTINATION_ID}  | ${PS_NEWS_GNL_TEST_DESINTATION_ID}  | ${NEWS_PRODUCER_ID}
      ${'sport'} | ${'live'} | ${PS_SPORT_DESTINATION_ID}      | ${PS_SPORT_GNL_DESTINATION_ID}      | ${SPORT_PRODUCER_ID}
      ${'sport'} | ${'test'} | ${PS_SPORT_TEST_DESTINATION_ID} | ${PS_SPORT_GNL_TEST_DESTINATION_ID} | ${SPORT_PRODUCER_ID}
    `(
      'should create the analytics config with the correct parameters for $service on $env.',
      ({ env, service, destinationId, gnlId, producerId }) => {
        const analyticsConfig = getExperimentAnalyticsConfig({
          env,
          service,
          atiAnalyticsProducerId: producerId,
        });
        expect(analyticsConfig).toMatchInlineSnapshot(`
        {
          "requests": {
            "topStoriesClick": "http://foobar.com?idclient=123-456-789&s=$IF($EQUALS($MATCH(\${ampGeo}, gbOrUnknown, 0), gbOrUnknown), ${destinationId}, ${gnlId})&s2=${producerId}&p=SOURCE_URL&r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}&re=\${availableScreenWidth}x\${availableScreenHeight}&hl=\${timestamp}&lng=\${browserLanguage}&atc=PUB-[article]-[top-stories-promo]-[topStoriesExperiment:VARIANT(topStoriesExperiment)]-[]-[SOURCE_URL]-[]-[]-[]&type=AT",
            "topStoriesView": "http://foobar.com?idclient=123-456-789&s=$IF($EQUALS($MATCH(\${ampGeo}, gbOrUnknown, 0), gbOrUnknown), ${destinationId}, ${gnlId})&s2=${producerId}&p=SOURCE_URL&r=\${screenWidth}x\${screenHeight}x\${screenColorDepth}&re=\${availableScreenWidth}x\${availableScreenHeight}&hl=\${timestamp}&lng=\${browserLanguage}&ati=PUB-[article]-[top-stories-section]-[topStoriesExperiment:VARIANT(topStoriesExperiment)]-[]-[SOURCE_URL]-[]-[]-[]&type=AT",
          },
          "triggers": {
            "trackTopStoriesClick": {
              "on": "click",
              "request": "topStoriesClick",
              "selector": "[data-testid='promo-link']",
            },
            "trackTopStoriesView": {
              "on": "visible",
              "request": "topStoriesView",
              "visibilitySpec": {
                "continuousTimeMin": 200,
                "selector": "[class*='experimentTopStoriesSection']",
                "totalTimeMin": 500,
                "visiblePercentageMin": 20,
              },
            },
          },
        }
        `);
      },
    );
  });
});
