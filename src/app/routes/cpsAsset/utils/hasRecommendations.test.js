// components to test
import hasRecommendations from './hasRecommendations';
import getConfig from '../../utils/getConfig';

jest.mock('../../utils/getConfig', () => jest.fn());

describe('hasRecommendations', () => {
  it('returns true if service has recommendations enabled', async () => {
    getConfig.mockImplementationOnce(() => ({
      recommendations: {
        hasStoryRecommendations: true,
      },
    }));

    expect(await hasRecommendations('mock-service')).toBe(true);
  });

  it('returns false if service has recommendations disabled', async () => {
    getConfig.mockImplementationOnce(() => ({
      recommendations: {
        hasStoryRecommendations: false,
      },
    }));

    expect(await hasRecommendations('mock-service')).toBe(false);
  });
});
