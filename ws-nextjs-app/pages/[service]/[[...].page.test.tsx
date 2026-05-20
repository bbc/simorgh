import { GetServerSidePropsContext } from 'next/types';

import { getServerSideProps } from './[[...]].page';
import handleArticleRoute from './articles/handleArticleRoute';
import handleAvRoute from './av-embeds/handleAvRoute';
import handleHomepageRoute from './homepage/handleHomepageRoute';
import handleOnDemandAudioRoute from './onDemandAudio/handleOnDemandAudioRoute';
import handleOnDemandTvRoute from './onDemandTv/handleOnDemandTvRoute';

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

jest.mock('./homepage/handleHomepageRoute', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({}),
}));

jest.mock('./onDemandAudio/handleOnDemandAudioRoute', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({}),
}));

jest.mock('./onDemandTv/handleOnDemandTvRoute', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({}),
}));

const commonContext = {
  req: { headers: {} },
  query: { service: 'pidgin' },
  res: {},
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
        } as unknown as GetServerSidePropsContext['req'],
      };

      await getServerSideProps(context);

      expect(handleAvRoute).toHaveBeenCalled();
    });
  });

  describe('Article page type', () => {
    it('should call the Article route handler if an article is requested using URL', async () => {
      const context = {
        ...commonContext,
        resolvedUrl: '/pidgin/articles/c0000000000o',
      };

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
        } as unknown as GetServerSidePropsContext['req'],
      };

      await getServerSideProps(context);

      expect(handleArticleRoute).toHaveBeenCalled();
    });
  });

  describe('Homepage page type', () => {
    it('should call the Homepage route handler if homepage is requested using URL', async () => {
      const context = {
        ...commonContext,
        resolvedUrl: '/pidgin',
      };

      await getServerSideProps(context);

      expect(handleHomepageRoute).toHaveBeenCalled();
    });

    it('should call the Homepage route handler if homepage is requested using page-type header', async () => {
      const context = {
        ...commonContext,
        req: {
          headers: { 'page-type': 'home' },
        } as unknown as GetServerSidePropsContext['req'],
      };

      await getServerSideProps(context);

      expect(handleHomepageRoute).toHaveBeenCalled();
    });
  });

  describe('On Demand Audio page type', () => {
    it('should call the On Demand Audio route handler if an On Demand Audio page is requested using URL', async () => {
      const context = {
        ...commonContext,
        resolvedUrl: '/pidgin/bbc_pidgin_radio/some-audio-page',
      };

      await getServerSideProps(context);

      expect(handleOnDemandAudioRoute).toHaveBeenCalled();
    });

    it('should call the On Demand Audio route handler if an On Demand Audio page is requested using page-type header', async () => {
      const context = {
        ...commonContext,
        req: {
          headers: { 'page-type': 'audio' },
        } as unknown as GetServerSidePropsContext['req'],
      };

      await getServerSideProps(context);

      expect(handleOnDemandAudioRoute).toHaveBeenCalled();
    });
  });

  describe('On Demand TV page type', () => {
    it('should call the On Demand TV route handler if an On Demand TV page is requested using URL for /tv/', async () => {
      const context = {
        ...commonContext,
        resolvedUrl: '/pidgin/bbc_pidgin_tv/tv/some-tv-page',
      };

      await getServerSideProps(context);

      expect(handleOnDemandTvRoute).toHaveBeenCalled();
    });

    it('should call the On Demand TV route handler if an On Demand TV page is requested using URL for /tv_programmes/', async () => {
      const context = {
        ...commonContext,
        resolvedUrl: '/pidgin/bbc_pidgin_tv/tv_programmes/some-tv-page',
      };

      await getServerSideProps(context);

      expect(handleOnDemandTvRoute).toHaveBeenCalled();
    });

    it('should call the On Demand TV route handler if an On Demand TV page is requested using page-type header', async () => {
      const context = {
        ...commonContext,
        req: {
          headers: { 'page-type': 'tv' },
        } as unknown as GetServerSidePropsContext['req'],
      };

      await getServerSideProps(context);

      expect(handleOnDemandTvRoute).toHaveBeenCalled();
    });
  });

  it('should return 404 for unsupported page types', async () => {
    const context = {
      ...commonContext,
      resolvedUrl: '/pidgin/some-unsupported-page-type',
    };

    // @ts-expect-error - props is not typed on the return value of getServerSideProps
    const { props } = await getServerSideProps(context);

    expect(props.status).toBe(404);
  });
});
