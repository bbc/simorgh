import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { FRONT_PAGE } from '#app/routes/utils/pageTypes';
import * as getStatsDestination from './getStatsDestination';
import * as getStatsPageIdentifier from './getStatsPageIdentifier';
import * as getOriginContext from './getOriginContext';
import * as getEnv from './getEnv';
import * as getMetaUrls from './getMetaUrls';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { RequestContextProvider, RequestContext } = require('./index');

const Component = () => {
  useContext(RequestContext);
  return null;
};

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn().mockImplementation(original.useContext),
  };
});

jest.mock('./getStatsDestination');
jest.mock('./getStatsPageIdentifier');
jest.mock('./getOriginContext');
jest.mock('./getEnv');
jest.mock('./getMetaUrls');

(getStatsDestination.default as jest.Mock).mockReturnValue(
  'getStatsDestination',
);
(getStatsPageIdentifier.default as jest.Mock).mockReturnValue(
  'getStatsPageIdentifier',
);
(getOriginContext.default as jest.Mock).mockReturnValue({
  isUK: true,
  origin: 'origin',
});
(getEnv.default as jest.Mock).mockReturnValue('getEnv');
(getMetaUrls.default as jest.Mock).mockReturnValue({
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
  pageType: FRONT_PAGE,
  service: 'service',
  statusCode: 200,
  pathname: '/current-path',
  previousPath: '/previous-path',
  variant: 'simp',
  showAdsBasedOnLocation: true,
  mvtExperiments: [{ experimentName: 'foo', variation: 'bar' }],
};

const expectedOutput = {
  env: 'getEnv',
  id: input.id,
  isUK: true,
  origin: 'origin',
  pageType: input.pageType,
  isAmp: true,
  isNextJs: false,
  platform: 'amp',
  variant: 'simp',
  timeOnServer: null,
  statsDestination: 'getStatsDestination',
  statsPageIdentifier: 'getStatsPageIdentifier',
  statusCode: 200,
  previousPath: '/previous-path',
  canonicalLink: 'canonicalLink',
  ampLink: 'ampLink',
  canonicalUkLink: 'canonicalUkLink',
  ampUkLink: 'ampUkLink',
  canonicalNonUkLink: 'canonicalNonUkLink',
  ampNonUkLink: 'ampNonUkLink',
  showAdsBasedOnLocation: input.showAdsBasedOnLocation,
  service: 'service',
  pathname: '/current-path',
  mvtExperiments: input.mvtExperiments,
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

    expect(getStatsDestination.default).toHaveBeenCalledWith({
      env: 'getEnv',
      isUK: true,
      service: 'service',
    });

    expect(getStatsPageIdentifier.default).toHaveBeenCalledWith({
      id: 'id',
      pageType: 'frontPage',
      service: 'service',
    });

    expect(getOriginContext.default).toHaveBeenCalledWith('bbcOrigin');

    expect(getEnv.default).toHaveBeenCalledWith('origin');

    expect(getMetaUrls.default).toHaveBeenCalledWith('origin', '/current-path');

    expect(React.useContext).toHaveReturnedWith(expectedOutput);
  });

  describe('platform', () => {
    it('should be "amp" when isAmp is true', () => {
      render(
        <RequestContextProvider {...input} isAmp>
          <Component />
        </RequestContextProvider>,
      );

      expect(React.useContext).toHaveReturnedWith({
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

      expect(React.useContext).toHaveReturnedWith({
        ...expectedOutput,
        isAmp: false,
        platform: 'canonical',
      });
    });

    it('should return a PS statsDestination when isAmp is true and outside the UK', () => {
      (getOriginContext.default as jest.Mock).mockReturnValue({
        isUK: false,
        origin: 'origin',
      });
      render(
        <RequestContextProvider {...input}>
          <Component />
        </RequestContextProvider>,
      );

      expect(getStatsDestination.default).toHaveBeenCalledWith({
        env: 'getEnv',
        isUK: true,
        service: 'service',
      });
    });
  });
});
