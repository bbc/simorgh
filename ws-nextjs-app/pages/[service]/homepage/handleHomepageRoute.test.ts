import { GetServerSidePropsContext } from 'next';
import pidginHomepageFixtureData from '#data/pidgin/homePage/index.json';
import * as getPageDataModule from '../../../utilities/pageRequests/getPageData';
import handleHomepageRoute from './handleHomepageRoute';

jest.mock('../../../utilities/pageRequests/getPageData');

describe('handleHomepageRoute', () => {
  const mockSetHeader = jest.fn();
  const mockGetServerSidePropsContext = {
    req: {
      headers: {},
    } as unknown as GetServerSidePropsContext['req'],
    res: {
      setHeader: mockSetHeader,
      removeHeader: jest.fn(),
    } as unknown as GetServerSidePropsContext['res'],
    resolvedUrl: '/pidgin',
    query: { service: 'pidgin' },
  } satisfies GetServerSidePropsContext;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: pidginHomepageFixtureData.data,
        status: 200,
      },
    });
  });

  it('returns expected props if data fetch succeeds', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleHomepageRoute(mockGetServerSidePropsContext);

    expect(result.props.status).toEqual(200);
    expect(result.props.pageType).toEqual('home');
  });

  it('returns error props if data fetch returns 500', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: pidginHomepageFixtureData.data,
        status: 500,
      },
    });

    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleHomepageRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 500,
        pageType: 'home',
        pathname: '/pidgin',
      }),
    });
  });

  it('returns error props if data fetch returns 404', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: pidginHomepageFixtureData.data,
        status: 404,
      },
    });

    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleHomepageRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 404,
        pageType: 'home',
        pathname: '/pidgin',
      }),
    });
  });

  it('throws if pageData is missing', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: { pageData: null, status: 200 },
    });

    await expect(
      handleHomepageRoute(mockGetServerSidePropsContext),
    ).rejects.toThrow('HomePage data is malformed');
  });

  it('sets correct cache-control header', async () => {
    await handleHomepageRoute(mockGetServerSidePropsContext);

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('max-age=30'),
    );
  });

  it('returns not found props when service is invalid', async () => {
    const result = await handleHomepageRoute({
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/fakeservice',
    });

    expect(result).toEqual({
      props: expect.objectContaining({ status: 404 }),
    });
  });
});
