import { GetServerSidePropsContext } from 'next';
import { STATIC_PAGE } from '#app/routes/utils/pageTypes';
import { getServerSideProps } from './index.page';

type MockContext = GetServerSidePropsContext & {
  res: { statusCode: number; setHeader: jest.Mock };
};

const createMockContext = (service: string): MockContext =>
  ({
    query: { service, variant: null },
    res: { statusCode: 200, setHeader: jest.fn() },
    resolvedUrl: `/${service}/portrait-videos`,
  }) as unknown as MockContext;

describe('Portrait videos - getServerSideProps', () => {
  it('returns the static Hausa dataset', async () => {
    const context = createMockContext('hausa');
    const result = await getServerSideProps(context);
    const props = (result as Record<string, unknown>).props as Record<
      string,
      unknown
    >;

    expect(props).toMatchObject({
      service: 'hausa',
      status: 200,
      pageType: STATIC_PAGE,
      pathname: '/hausa/portrait-videos',
    });
    expect(props.pageData).toMatchObject({
      pageTitle: 'Bidiyoyin tsaye',
      metadata: { type: STATIC_PAGE },
    });
    expect(context.res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.any(String),
    );
  });

  it('returns 404 for services without a portrait video dataset', async () => {
    const context = createMockContext('hindi');
    const result = await getServerSideProps(context);

    expect((result as Record<string, unknown>).props).toMatchObject({
      service: 'hindi',
      status: 404,
      pathname: '/hindi/portrait-videos',
    });
    expect(context.res.statusCode).toBe(404);
  });
});
