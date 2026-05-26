import { GetServerSidePropsContext } from 'next';

import pidginTopicFixtureData from '#data/pidgin/topics/c95y35941vrt.json';
import * as getPageDataModule from '../../../../utilities/pageRequests/getPageData';
import { getServerSideProps as handleTopicRoute } from './[[...variant]].page';

jest.mock('../../../../utilities/pageRequests/getPageData');

describe('handleTopicRoute', () => {
  const mockSetHeader = jest.fn();
  const mockGetServerSidePropsContext = {
    req: {
      headers: {},
    } as unknown as GetServerSidePropsContext['req'],
    res: {
      setHeader: mockSetHeader,
      removeHeader: jest.fn(),
      on: jest.fn(),
    } as unknown as GetServerSidePropsContext['res'],
    resolvedUrl: '/pidgin/topics/c95y35941vrt',
    query: { service: 'pidgin', id: 'c95y35941vrt' },
  } satisfies GetServerSidePropsContext;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: pidginTopicFixtureData.data,
        status: 200,
      },
    });
  });

  it('returns expected props if data fetch succeeds', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleTopicRoute(mockGetServerSidePropsContext);

    expect(result.props.status).toEqual(200);
    expect(result.props.pageType).toEqual('topic');
  });

  it('returns error props if data fetch returns 500', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: pidginTopicFixtureData.data,
        status: 500,
      },
    });

    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleTopicRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 500,
        pageType: 'topic',
        pathname: '/pidgin/topics/c95y35941vrt',
      }),
    });
  });

  it('returns error props if data fetch returns 404', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: pidginTopicFixtureData.data,
        status: 404,
      },
    });

    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleTopicRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 404,
        pageType: 'topic',
        pathname: '/pidgin/topics/c95y35941vrt',
      }),
    });
  });

  it('throws if pageData is missing', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: { pageData: null, status: 200 },
    });

    await expect(
      handleTopicRoute(mockGetServerSidePropsContext),
    ).rejects.toThrow('TopicPage data is malformed');
  });

  it('sets correct cache-control header', async () => {
    await handleTopicRoute(mockGetServerSidePropsContext);

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('max-age=240'),
    );
  });
});
