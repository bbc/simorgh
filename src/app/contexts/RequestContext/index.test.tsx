import { use } from 'react';
import { render } from '@testing-library/react';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import getStatsDestination from './getStatsDestination';
import getOriginContext from './getOriginContext';
import getEnv from './getEnv';
import getMetaUrls from './getMetaUrls';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { RequestContextProvider, RequestContext } = require('./index');

const Component = () => {
  use(RequestContext);
  return null;
};

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    use: jest.fn().mockImplementation(original.use),
  };
});

jest.mock('./getStatsDestination', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('./getOriginContext', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('./getEnv', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('./getMetaUrls', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockGetStatsDestination = jest.mocked(getStatsDestination);
const mockGetOriginContext = jest.mocked(getOriginContext);
const mockGetEnv = jest.mocked(getEnv);
const mockGetMetaUrls = jest.mocked(getMetaUrls);

mockGetStatsDestination.mockReturnValue({
  destinationName: 'getStatsDestination',
  destinationSiteId: 12345,
});
mockGetOriginContext.mockReturnValue({
  origin: 'origin',
});
mockGetEnv.mockReturnValue('test');
mockGetMetaUrls.mockReturnValue({
  canonicalLink: 'canonicalLink',
  ampLink: 'ampLink',
  canonicalUkLink: 'canonicalUkLink',
  ampUkLink: 'ampUkLink',
  canonicalNonUkLink: 'canonicalNonUkLink',
  ampNonUkLink: 'ampNonUkLink',
});

const input = {
  bbcOrigin: 'bbcOrigin',
  id: 'id',
  isAmp: true,
  pageType: HOME_PAGE,
  service: 'service',
  statusCode: 200,
  pathname: '/current-path',
  variant: 'simp',
  showAdsBasedOnLocation: true,
  serverSideExperiments: [{ experimentName: 'foo', variation: 'bar' }],
  isUK: true,
};

const expectedOutput = {
  env: 'test',
  id: input.id,
  isUK: true,
  origin: 'origin',
  pageType: input.pageType,
  derivedPageType: null,
  isAmp: true,
  isNextJs: false,
  isApp: false,
  isLite: false,
  platform: 'amp',
  variant: 'simp',
  timeOnServer: null,
  statsDestination: 'getStatsDestination',
  destinationSiteId: 12345,
  statusCode: 200,
  canonicalLink: 'canonicalLink',
  ampLink: 'ampLink',
  canonicalUkLink: 'canonicalUkLink',
  ampUkLink: 'ampUkLink',
  canonicalNonUkLink: 'canonicalNonUkLink',
  ampNonUkLink: 'ampNonUkLink',
  showAdsBasedOnLocation: input.showAdsBasedOnLocation,
  showCookieBannerBasedOnCountry: true,
  service: 'service',
  pathname: '/current-path',
  serverSideExperiments: input.serverSideExperiments,
  nonce: null,
  cspHeader: null,
  primaryMediaType: null,
};

describe('RequestContext', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return expected values', () => {
    render(
      <RequestContextProvider {...input}>
        <Component />
      </RequestContextProvider>,
    );

    expect(mockGetStatsDestination).toHaveBeenCalledWith({
      env: 'test',
      isUK: true,
      service: 'service',
    });

    expect(mockGetOriginContext).toHaveBeenCalledWith('bbcOrigin');

    expect(mockGetEnv).toHaveBeenCalledWith('origin');

    expect(mockGetMetaUrls).toHaveBeenCalledWith('origin', '/current-path');

    expect(use).toHaveReturnedWith(expectedOutput);
  });

  it('should return expected values for app requests', () => {
    const appInput = {
      ...input,
      isAmp: false,
      isApp: true,
    };

    render(
      <RequestContextProvider {...appInput}>
        <Component />
      </RequestContextProvider>,
    );

    expect(use).toHaveReturnedWith({
      ...expectedOutput,
      isAmp: false,
      isApp: true,
      platform: 'app',
    });
  });

  it('should return expected values for Topic Pages where primaryMediaType is set', () => {
    const primaryMediaTypeInput = {
      ...input,
      primaryMediaType: 'video',
    };

    render(
      <RequestContextProvider {...primaryMediaTypeInput}>
        <Component />
      </RequestContextProvider>,
    );

    expect(use).toHaveReturnedWith({
      ...expectedOutput,
      primaryMediaType: 'video',
    });
  });

  describe('platform', () => {
    it('should be "amp" when isAmp is true', () => {
      render(
        <RequestContextProvider {...input} isAmp>
          <Component />
        </RequestContextProvider>,
      );

      expect(use).toHaveReturnedWith({
        ...expectedOutput,
        isAmp: true,
        platform: 'amp',
      });
    });

    it('should be "canonical" when isAmp is false', () => {
      render(
        <RequestContextProvider {...input} isAmp={false}>
          <Component />
        </RequestContextProvider>,
      );

      expect(use).toHaveReturnedWith({
        ...expectedOutput,
        isAmp: false,
        platform: 'canonical',
      });
    });

    it('should be "app" when isAmp is false and isApp is true', () => {
      render(
        <RequestContextProvider {...input} isAmp={false} isApp>
          <Component />
        </RequestContextProvider>,
      );

      expect(use).toHaveReturnedWith({
        ...expectedOutput,
        isAmp: false,
        isApp: true,
        platform: 'app',
      });
    });

    it('should be "lite" when isAmp is false and isApp is false and isLite is true', () => {
      render(
        <RequestContextProvider {...input} isAmp={false} isApp={false} isLite>
          <Component />
        </RequestContextProvider>,
      );

      expect(use).toHaveReturnedWith({
        ...expectedOutput,
        isAmp: false,
        isApp: false,
        isLite: true,
        platform: 'lite',
      });
    });

    it('should return a PS statsDestination when isAmp is true and outside the UK', () => {
      mockGetOriginContext.mockReturnValue({
        origin: 'origin',
      });
      render(
        <RequestContextProvider {...input}>
          <Component />
        </RequestContextProvider>,
      );

      expect(mockGetStatsDestination).toHaveBeenCalledWith({
        env: 'test',
        isUK: true,
        service: 'service',
      });
    });

    it('should set isUK to false when the input isUK value is null', () => {
      mockGetOriginContext.mockReturnValue({
        origin: 'origin',
      });

      const inputProps = { ...input, isUK: null };

      render(
        <RequestContextProvider {...inputProps}>
          <Component />
        </RequestContextProvider>,
      );

      expect(use).toHaveReturnedWith({
        ...expectedOutput,
        isUK: false,
      });
    });
  });
});
