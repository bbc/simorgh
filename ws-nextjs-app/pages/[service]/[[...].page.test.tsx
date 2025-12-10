import { GetServerSidePropsContext } from 'next/types';

import { getServerSideProps } from './[[...]].page';
import handleAvRoute from './av-embeds/handleAvRoute';
import handleArticleRoute from './articles/handleArticleRoute';

jest.mock('#server/utilities/logResponseTime', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./av-embeds/handleAvRoute', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({}),
}));

jest.mock('./articles/handleArticleRoute', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({}),
}));

const commonContext = {
  req: {
    headers: {},
  },
  query: { service: 'pidgin' },
  res: { statusCode: 200 },
} as unknown as GetServerSidePropsContext;

describe('catch-all route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('AV Embeds page type', () => {
    it('should call the AV Embeds route handler if av-embeds is requested using URL', async () => {
      const context = {
        ...commonContext,
        resolvedUrl: '/pidgin/av-embeds/some-article',
      };

      await getServerSideProps(context);

      expect(handleAvRoute).toHaveBeenCalled();
    });

    it('should call the AV Embeds route handler if av-embeds is requested using page-type header', async () => {
      const context = {
        ...commonContext,
        req: {
          headers: {
            'page-type': 'avEmbeds',
          },
        },
      } as unknown as GetServerSidePropsContext;

      await getServerSideProps(context);

      expect(handleAvRoute).toHaveBeenCalled();
    });
  });

  describe('Article page type', () => {
    it('should call the Article route handler if an article is requested using URL', async () => {
      const context = {
        ...commonContext,
        resolvedUrl: '/pidgin/articles/c0000000000o',
      } as unknown as GetServerSidePropsContext;

      await getServerSideProps(context);

      expect(handleArticleRoute).toHaveBeenCalled();
    });

    it('should call the Article route handler if an article is requested using page-type header', async () => {
      const context = {
        ...commonContext,
        req: {
          headers: {
            'page-type': 'article',
          },
        },
      } as unknown as GetServerSidePropsContext;

      await getServerSideProps(context);

      expect(handleArticleRoute).toHaveBeenCalled();
    });
  });

  it('should return 404 for unsupported page types', async () => {
    const context = {
      ...commonContext,
      resolvedUrl: '/pidgin/some-unsupported-page-type',
    } as unknown as GetServerSidePropsContext;

    // @ts-expect-error - props is not typed on the return value of getServerSideProps
    const { props } = await getServerSideProps(context);

    expect(props.status).toBe(404);
  });
});
