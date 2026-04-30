import { GetServerSidePropsContext } from 'next';
import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import pidginMostReadTopicFixture from '#data/pidgin/topics/mostReadTopic.json';
import * as getPageDataModule from '../../../../utilities/pageRequests/getPageData';
import { getServerSideProps as handleMostReadRoute } from './[[...variant]].page';

jest.mock('../../../../utilities/pageRequests/getPageData');

describe('handleMostReadRoute', () => {
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
    resolvedUrl: '/pidgin/popular/read',
    query: { service: 'pidgin' },
  } satisfies GetServerSidePropsContext;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: pidginMostReadTopicFixture.data,
        status: 200,
      },
    });
  });

  it('returns expected props if data fetch succeeds', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleMostReadRoute(mockGetServerSidePropsContext);

    expect(result.props.status).toEqual(200);
    expect(result.props.pageType).toEqual(MOST_READ_PAGE);
  });

  it('returns correct metadata.atiAnalytics', () => {
    return handleMostReadRoute(mockGetServerSidePropsContext).then(result => {
      expect(result.props.pageData.metadata.atiAnalytics).toEqual({
        contentType: 'list-datadriven',
        pageIdentifier: 'pidgin.popular.read.page',
        timePublished:
          pidginMostReadTopicFixture?.data?.curations?.[0]?.mostRead
            ?.firstRecordTimeStamp,
        timeUpdated:
          pidginMostReadTopicFixture?.data?.curations?.[0]?.mostRead
            ?.lastRecordTimeStamp,
        pageTitle: pidginMostReadTopicFixture?.data?.title || null,
      });
    });
  });

  it('returns error props if data fetch returns 500', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: pidginMostReadTopicFixture.data,
        status: 500,
      },
    });

    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleMostReadRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 500,
        pageType: MOST_READ_PAGE,
        pathname: '/pidgin/popular/read',
      }),
    });
  });

  it('returns error props if data fetch returns 404', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: pidginMostReadTopicFixture.data,
        status: 404,
      },
    });

    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleMostReadRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 404,
        pageType: MOST_READ_PAGE,
        pathname: '/pidgin/popular/read',
      }),
    });
  });

  it('throws if pageData is missing', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: { pageData: null, status: 200 },
    });

    await expect(
      handleMostReadRoute(mockGetServerSidePropsContext),
    ).rejects.toThrow('MostReadPage data is malformed');
  });

  it('sets correct cache-control header', async () => {
    await handleMostReadRoute(mockGetServerSidePropsContext);

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('max-age=60'),
    );
  });
});
