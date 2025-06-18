import { GetServerSidePropsContext } from 'next';
import * as fetchPageData from '#app/routes/utils/fetchPageData';
import russianFixtureData from '#data/russian/av-embeds/features-49881797/pid/p07q3wwl.json';
import handleAvRoute from './handleAvRoute';

const agent = { cert: 'cert', ca: 'ca', key: 'key' };
jest.mock('#server/utilities/getAgent', () =>
  jest.fn(() => Promise.resolve(agent)),
);

const mockGetServerSidePropsContext = {
  req: {
    headers: {
      'x-frame-options': 'DENY',
    },
  } as unknown as GetServerSidePropsContext['req'],
  res: {
    setHeader: jest.fn(),
    removeHeader: jest.fn(),
  } as unknown as GetServerSidePropsContext['res'],
  resolvedUrl: '',
  query: {},
} satisfies GetServerSidePropsContext;

describe('Handle AV Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(fetchPageData, 'default').mockResolvedValue({
      status: 200,
      json: {
        data: {
          avEmbed: {
            metadata: russianFixtureData.data.avEmbed.metadata,
            content: russianFixtureData.data.avEmbed.content,
            promo: {},
            relatedContent: {},
          },
        },
      },
    });
  });

  it('should return atiAnalytics in metadata object', async () => {
    const result = await handleAvRoute(mockGetServerSidePropsContext);

    expect(result?.props?.pageData?.metadata?.atiAnalytics).toEqual({
      campaigns: [
        {
          campaignId: '5a988e3739461b000e9dabfa',
          campaignName: 'WS - Give me perspective',
        },
        {
          campaignId: '5a988e4739461b000e9dabfc',
          campaignName: 'WS - Update me',
        },
      ],
      categoryName: 'News',
      contentId: 'urn:bbc:cps:curie:asset:6ea0060d-2cb6-9b45-b4d9-08876ea24283',
      contentType: 'article',
      language: 'ru',
      ldpThingIds: null,
      ldpThingLabels: null,
      nationsProducer: null,
      pageIdentifier: 'russian.features.story.49881797.page',
      pageTitle:
        '"Невыносимые условия". Как живут деревни возле новой полосы Шереметьево',
      timePublished: '2019-10-04T15:36:44.000Z',
      timeUpdated: '2019-10-04T15:36:44.000Z',
      producerName: 'RUSSIAN',
      producerId: '75',
    });
  });

  it('should set the x-robots-tag header to noindex', async () => {
    await handleAvRoute(mockGetServerSidePropsContext);

    expect(mockGetServerSidePropsContext.res.setHeader).toHaveBeenCalledWith(
      'x-robots-tag',
      'noindex',
    );
  });

  it('should remove the x-frame-options header', async () => {
    await handleAvRoute(mockGetServerSidePropsContext);

    expect(mockGetServerSidePropsContext.res.removeHeader).toHaveBeenCalledWith(
      'x-frame-options',
    );
  });

  it('should set the cache control header correctly for a non-WS route', async () => {
    mockGetServerSidePropsContext.resolvedUrl = '/news/av-embeds/123';

    await handleAvRoute(mockGetServerSidePropsContext);

    expect(mockGetServerSidePropsContext.res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, stale-if-error=90, stale-while-revalidate=30, max-age=30',
    );
  });

  it('should set the cache control header correctly for a WS route', async () => {
    mockGetServerSidePropsContext.resolvedUrl = '/ws/av-embeds/123';

    await handleAvRoute(mockGetServerSidePropsContext);

    expect(mockGetServerSidePropsContext.res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, stale-if-error=90, stale-while-revalidate=30, max-age=30',
    );
  });
});
