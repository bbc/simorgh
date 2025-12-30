import { NextPageContext } from 'next/types';
import addLinkHeader from '.';

describe('addLinkHeader', () => {
  const mockSetHeader = jest.fn();
  const mockCtx = {
    res: {
      setHeader: mockSetHeader,
    },
  } as unknown as NextPageContext;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add the correct Link header for Test env', () => {
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
      'https://static.test.files.bbci.co.uk';

    process.env.ATI_BASE_URL = 'https://logws1363.ati-host.net?';

    addLinkHeader({ ctx: mockCtx });

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Link',
      '<https://ichef.bbci.co.uk>; rel="dns-prefetch", <https://ichef.bbci.co.uk>; rel="preconnect",<https://static.test.files.bbci.co.uk>; rel="dns-prefetch", <https://static.test.files.bbci.co.uk>; rel="preconnect",<https://logws1363.ati-host.net?>; rel="dns-prefetch", <https://logws1363.ati-host.net?>; rel="preconnect",<https://ping.chartbeat.net>; rel="dns-prefetch", <https://ping.chartbeat.net>; rel="preconnect"',
    );
  });

  it('should add the correct Link header for Live env', () => {
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
      'https://static.files.bbci.co.uk';

    process.env.ATI_BASE_URL = 'https://a1.api.bbc.co.uk/hit.xiti?';

    addLinkHeader({ ctx: mockCtx });

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Link',
      '<https://ichef.bbci.co.uk>; rel="dns-prefetch", <https://ichef.bbci.co.uk>; rel="preconnect",<https://static.files.bbci.co.uk>; rel="dns-prefetch", <https://static.files.bbci.co.uk>; rel="preconnect",<https://static.files.bbci.co.uk>; rel="preconnect"; crossorigin,<https://logws1363.ati-host.net?>; rel="dns-prefetch", <https://logws1363.ati-host.net?>; rel="preconnect",<https://ping.chartbeat.net>; rel="dns-prefetch", <https://ping.chartbeat.net>; rel="preconnect"',
    );
  });
});
