import { NextPageContext } from 'next/types';
import addLinkHeader from '.';

describe('addLinkHeader', () => {
  const mockSetHeader = jest.fn();
  const mockCtx = {
    res: {
      setHeader: mockSetHeader,
    },
    pathname: '/japanese/articles/c0000000001o',
  } as unknown as NextPageContext;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add the correct Link header for Test env', () => {
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
      'https://static.test.files.bbci.co.uk';

    process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

    process.env.SIMORGH_REVERB_SOURCE =
      'https://mybbc-analytics.files.bbci.co.uk/reverb-version.js';

    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.bbci.co.uk';

    addLinkHeader({ ctx: mockCtx });

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Link',
      '<https://logws1363.ati-host.net?>; rel="dns-prefetch",<https://ping.chartbeat.net>; rel="dns-prefetch",<https://mybbc-analytics.files.bbci.co.uk>; rel="dns-prefetch",<https://ichef.bbci.co.uk>; rel="preconnect"; crossorigin,<https://static.test.files.bbci.co.uk>; rel="preconnect"; crossorigin',
    );
  });

  it('should add the correct Link header for Live env', () => {
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
      'https://static.files.bbci.co.uk';

    process.env.SIMORGH_ATI_BASE_URL = 'https://a1.api.bbc.co.uk';

    process.env.SIMORGH_REVERB_SOURCE =
      'https://mybbc-analytics.files.bbci.co.uk/reverb-version.js';

    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.bbci.co.uk';

    addLinkHeader({ ctx: mockCtx });

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Link',
      '<https://a1.api.bbc.co.uk>; rel="dns-prefetch",<https://ping.chartbeat.net>; rel="dns-prefetch",<https://mybbc-analytics.files.bbci.co.uk>; rel="dns-prefetch",<https://ichef.bbci.co.uk>; rel="preconnect"; crossorigin,<https://static.files.bbci.co.uk>; rel="preconnect"; crossorigin',
    );
  });
});
