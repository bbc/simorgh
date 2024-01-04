import { Agent } from 'undici';
import recommendationsJson from '#data/mundo/recommendations/index.json';
import hasArticleRecommendations from './hasArticleRecommendations';
import getOnwardsPageData from './getOnwardsData';
import * as fetchPageData from '../../utils/fetchPageData';

jest.mock('./hasArticleRecommendations', () => jest.fn());

const agent = {
  connect: { cert: 'cert', ca: 'ca', key: 'key' },
} as unknown as Agent;

const fetchDataSpy = jest.spyOn(fetchPageData, 'default');

describe('WSOJ data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return only recommendations data for non Portuguese services', async () => {
    const expectedOutput = {
      recommendations: recommendationsJson,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore`
    hasArticleRecommendations.mockImplementationOnce(() => true);

    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: recommendationsJson,
      }),
    );

    const additionalPageData = await getOnwardsPageData({
      pathname: '/kyrgyz/articles/c0000000000o.amp?renderer_env=live',
      service: 'kyrgyz',
      isAdvertising: true,
      agent,
    });

    expect(additionalPageData).toEqual(expectedOutput);
  });

  it('should NOT return recommendations data for sfv articles', async () => {
    const expectedOutput = {};

    const additionalPageData = await getOnwardsPageData({
      pathname: '/kyrgyz/articles/c0000000000o.amp?renderer_env=live',
      service: 'kyrgyz',
      isAdvertising: true,
      isArticleSfv: true,
      agent,
    });

    expect(additionalPageData).toEqual(expectedOutput);
  });
});
