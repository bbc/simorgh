// components to test
import hasRecommendations from './hasRecommendations';
import getConfig from '../../utils/getConfig';

jest.mock('../../utils/getConfig', () => jest.fn());

const pageDataAdvertising = {
  metadata: { options: { allowAdvertising: true } },
};

const pageDataNoAdvertising = {
  metadata: { options: { allowAdvertising: false } },
};

describe('hasRecommendations', () => {
  it('returns true if service has recommendations and asset allows advertising', async () => {
    getConfig.mockImplementationOnce(() => ({
      recommendations: {
        hasStoryRecommendations: true,
      },
    }));

    expect(
      await hasRecommendations('mock-service', null, pageDataAdvertising),
    ).toBeTruthy();
  });

  it('returns false if service has recommendations and asset disallows advertising', async () => {
    getConfig.mockImplementationOnce(() => ({
      recommendations: {
        hasStoryRecommendations: true,
      },
    }));

    expect(
      await hasRecommendations('mock-service', null, pageDataNoAdvertising),
    ).toBeFalsy();
  });

  it('returns false if service has no recommendations and asset allows advertising', async () => {
    getConfig.mockImplementationOnce(() => ({
      recommendations: {
        hasStoryRecommendations: false,
      },
    }));

    expect(
      await hasRecommendations('mock-service', null, pageDataAdvertising),
    ).toBeFalsy();
  });

  it('returns false if service has no recommendations and asset disallows advertising', async () => {
    getConfig.mockImplementationOnce(() => ({
      recommendations: {
        hasStoryRecommendations: false,
      },
    }));

    expect(
      await hasRecommendations('mock-service', null, pageDataNoAdvertising),
    ).toBeFalsy();
  });
});
