// test helpers
import fetchMock from 'fetch-mock';

// components to test

// mock data
import mapJson from '#data/pidgin/cpsAssets/media-23256549.json';
import styJson from '#data/mundo/cpsAssets/23263889.json';
import portugueseSty from '#data/portuguese/cpsAssets/brasil-59057279';
import cspJson from '#data/news/cpsAssets/business-55345826.json';
import noRecommendationsStyJson from '#data/pidgin/cpsAssets/world-23252817.json';
import mostReadJson from '#data/mundo/mostRead/index.json';
import cspMostReadJson from '#data/news/mostRead/index.json';
import mostWatchedJson from '#data/pidgin/mostWatched/index.json';
import secondaryColumnJson from '#data/mundo/secondaryColumn/index.json';
import cspSecondaryColumnJson from '#data/news/secondaryColumn/index.json';
import recommendationsJson from '#data/mundo/recommendations/index.json';
import hasRecommendations from './hasRecommendations';
import getAdditionalPageData from './getAdditionalPageData';

fetchMock.config.overwriteRoutes = false; // http://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration allows us to mock the same endpoint multiple times

jest.mock('./hasRecommendations', () => jest.fn());
jest.mock('#server/utilities/getAgent/index');

describe('getAdditionalPageData', () => {
  beforeEach(() => {
    process.env.RECOMMENDATIONS_ENDPOINT = 'http://mock-recommendations-path';
  });
  afterEach(() => {
    delete process.env.RECOMMENDATIONS_ENDPOINT;
    fetchMock.restore();
  });

  it('should return additional data with most watched for a MAP asset', async () => {
    fetchMock.mock('http://localhost/pidgin/mostwatched.json', mostWatchedJson);
    const additionalPageData = await getAdditionalPageData({
      pageData: mapJson,
      service: 'pidgin',
      env: 'local',
    });

    const expectedOutput = {
      mostWatched: mostWatchedJson,
    };
    expect(additionalPageData).toEqual(expectedOutput);
  });

  it('should return additional data for an STY with recommendations for service with hasStoryRecommendations set to true and is whitelisted for using the unirecs datalab engine', async () => {
    fetchMock.mock('http://localhost/mundo/mostread.json', mostReadJson);
    fetchMock.mock(
      'http://localhost/mundo/sty-secondary-column.json',
      secondaryColumnJson,
    );
    fetchMock.mock(
      'http://mock-recommendations-path/recommendations/mundo/23263889?Engine=unirecs_datalab',
      recommendationsJson,
    );
    hasRecommendations.mockImplementationOnce(() => true);
    const additionalPageData = await getAdditionalPageData({
      pageData: styJson,
      service: 'mundo',
    });

    const expectedOutput = {
      mostRead: mostReadJson,
      secondaryColumn: secondaryColumnJson,
      recommendations: recommendationsJson,
    };

    expect(additionalPageData).toEqual(expectedOutput);
  });

  it('should return additonal data for an STY with no recommendations for service with hasStoryRecommendations set to false', async () => {
    fetchMock.mock('http://localhost/pidgin/mostread.json', { foo: 'bar' });
    fetchMock.mock('http://localhost/pidgin/sty-secondary-column.json', {
      foo: 'bar',
    });
    hasRecommendations.mockImplementationOnce(() => false);
    const additionalPageData = await getAdditionalPageData({
      pageData: noRecommendationsStyJson,
      service: 'pidgin',
    });

    const expectedOutput = {
      mostRead: { foo: 'bar' },
      secondaryColumn: { foo: 'bar' },
    };

    expect(additionalPageData).toEqual(expectedOutput);
  });

  it('should return an empty object when a data fetch fails', async () => {
    fetchMock.mock('http://localhost/mundo/mostread.json', 404);
    fetchMock.mock('http://localhost/mundo/sty-secondary-column.json', 404);
    fetchMock.mock(
      'http://mock-recommendations-path/recommendations/mundo/23263889',
      404,
    );
    const additionalPageData = await getAdditionalPageData({
      pageData: styJson,
      service: 'mundo',
    });

    expect(additionalPageData).toEqual({});
  });

  it('should return additional data for a CSP asset', async () => {
    fetchMock.mock('http://localhost/news/mostread.json', cspMostReadJson);
    fetchMock.mock(
      'http://localhost/news/sty-secondary-column.json',
      cspSecondaryColumnJson,
    );
    const additionalPageData = await getAdditionalPageData({
      pageData: cspJson,
      service: 'news',
      env: 'local',
    });

    const expectedOutput = {
      mostRead: cspMostReadJson,
      secondaryColumn: cspSecondaryColumnJson,
    };
    expect(additionalPageData).toEqual(expectedOutput);
  });

  describe('Optimizely Experiments', () => {
    describe('004_brasil_recommendations_experiment', () => {
      it('should recommendations data from camino, unirecs content and unirecs hybrid engine', async () => {
        const expectedOutput = {
          recommendations: recommendationsJson,
          datalabContentRecommendations: recommendationsJson,
          datalabHybridRecommendations: recommendationsJson,
        };

        hasRecommendations.mockImplementationOnce(() => true);

        fetchMock.mock(
          'http://mock-recommendations-path/recommendations/portuguese/brasil-59057279?Engine=unirecs_camino',
          recommendationsJson,
        );
        fetchMock.mock(
          'http://mock-recommendations-path/recommendations/portuguese/brasil-59057279?Engine=unirecs_datalab&EngineVariant=content',
          recommendationsJson,
        );
        fetchMock.mock(
          'http://mock-recommendations-path/recommendations/portuguese/brasil-59057279?Engine=unirecs_datalab&EngineVariant=hybrid',
          recommendationsJson,
        );

        const additionalPageData = await getAdditionalPageData({
          pageData: portugueseSty,
          service: 'portuguese',
        });

        expect(additionalPageData).toEqual(expectedOutput);
      });

      it('should not get recommendations data when hasRecommendations is false', async () => {
        fetchMock.mock(
          'http://mock-recommendations-path/recommendations/portuguese/brasil-59057279',
          recommendationsJson,
        );
        fetchMock.mock(
          'http://mock-recommendations-path/recommendations/portuguese/brasil-59057279?Engine=unirecs_datalab&EngineVariant=content',
          recommendationsJson,
        );
        fetchMock.mock(
          'http://mock-recommendations-path/recommendations/portuguese/brasil-59057279?Engine=unirecs_datalab&EngineVariant=hybrid',
          recommendationsJson,
        );

        const additionalPageData = await getAdditionalPageData({
          pageData: portugueseSty,
          service: 'portuguese',
        });

        expect(additionalPageData).toEqual({});
      });
    });
  });
});
