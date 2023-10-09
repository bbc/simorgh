import hasArticleRecommendations from './hasArticleRecommendations';
import getConfig from '../../utils/getConfig';

jest.mock('../../utils/getConfig', () => jest.fn());

describe('hasArticleRecommendations', () => {
  it('returns true if service has recommendations and optimo asset allows advertising', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore`
    getConfig.mockImplementationOnce(() => ({
      recommendations: {
        hasStoryRecommendations: true,
      },
    }));

    expect(await hasArticleRecommendations('mock-service', true)).toBeTruthy();
  });

  it('returns false if service disallows recommendations and optimo asset disallows advertising', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore`
    getConfig.mockImplementationOnce(() => ({
      recommendations: {
        hasStoryRecommendations: false,
      },
    }));

    expect(await hasArticleRecommendations('mock-service', false)).toBeFalsy();
  });
});
