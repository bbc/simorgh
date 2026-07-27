import withCache from './withCache';
import getToggles from '.';

jest.mock('.', () => ({ __esModule: true, default: jest.fn() }));

describe('withCache', () => {
  afterEach(() => {
    getToggles.mockReset();
  });

  it('calls getToggles with the service and pagePath for the simorgh application', async () => {
    getToggles.mockResolvedValue({ testToggle: { enabled: true } });

    await withCache({ service: 'mundo', pagePath: '/mundo' });
    await withCache({ service: 'pidgin', pagePath: '/pidgin' });

    expect(getToggles).toHaveBeenNthCalledWith(1, {
      service: 'mundo',
      pagePath: '/mundo',
    });
    expect(getToggles).toHaveBeenNthCalledWith(2, {
      service: 'pidgin',
      pagePath: '/pidgin',
    });
  });

  it('does not fetch amp toggles when isAmp is false', async () => {
    getToggles.mockResolvedValue({ testToggle: { enabled: true } });

    await withCache({ service: 'mundo', pagePath: '/mundo', isAmp: false });

    expect(getToggles).toHaveBeenCalledTimes(1);
    expect(getToggles).not.toHaveBeenCalledWith(
      expect.objectContaining({ overrideEndpoint: expect.any(String) }),
    );
  });

  it('fetches both simorgh and amp toggles and merges them when isAmp is true', async () => {
    const simorghToggles = {
      sharedToggle: { enabled: false },
      simorghOnlyToggle: { enabled: true },
    };
    const ampToggles = {
      sharedToggle: { enabled: true },
      ampOnlyToggle: { enabled: true },
    };

    getToggles
      .mockResolvedValueOnce(simorghToggles)
      .mockResolvedValueOnce(ampToggles);

    const toggles = await withCache({
      service: 'mundo',
      pagePath: '/mundo',
      isAmp: true,
    });

    expect(getToggles).toHaveBeenNthCalledWith(1, {
      service: 'mundo',
      pagePath: '/mundo',
      overrideEndpoint: expect.stringContaining('/fd/ws-toggles'),
    });
    expect(getToggles).toHaveBeenNthCalledWith(2, {
      service: 'mundo',
      pagePath: '/mundo',
      overrideEndpoint: expect.stringContaining('/fd/ws-toggles'),
    });

    // amp toggles take precedence over simorgh toggles on conflicts
    expect(toggles).toEqual({
      sharedToggle: { enabled: true },
      simorghOnlyToggle: { enabled: true },
      ampOnlyToggle: { enabled: true },
    });
  });
});
