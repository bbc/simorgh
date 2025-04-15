import constructPageFetchUrl from '.';
import {
  ARTICLE_PAGE,
  CPS_ASSET,
  HOME_PAGE,
  LIVE_PAGE,
  LIVE_RADIO_PAGE,
  TOPIC_PAGE,
  TV_PAGE,
  UGC_PAGE,
} from '../pageTypes';

process.env.BFF_PATH = 'https://mock-bff-path';

describe('constructPageFetchUrl', () => {
  const originalEnvironment = process.env.SIMORGH_APP_ENV;

  afterEach(() => {
    process.env.SIMORGH_APP_ENV = originalEnvironment;
    jest.clearAllMocks();
  });

  it('should set all query parameters correctly on URL', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    const service = 'ukrainian';
    const pathname = '/ukrainian/topics/c0000000000t';
    const pageType = TOPIC_PAGE;
    const variant = 'ru-UA';
    const page = '2';
    const isAmp = true;

    const fetchUrl = constructPageFetchUrl({
      pathname,
      pageType,
      service,
      variant,
      page,
      isAmp,
    });

    expect(fetchUrl.query).toEqual({
      id: 'c0000000000t',
      page: '2',
      pageType: 'topic',
      service: 'ukrainian',
      serviceEnv: 'live',
      variant: 'ru-UA',
      isAmp: true,
    });
  });

  it('should remove .amp from ID', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    const service = 'pidgin';
    const pathname = '/pidgin/articles/c0000000000o.amp';
    const pageType = ARTICLE_PAGE;

    const fetchUrl = constructPageFetchUrl({
      pathname,
      pageType,
      service,
    });

    expect(fetchUrl.toString()).toBe(
      'https://mock-bff-path/?id=c0000000000o&service=pidgin&pageType=article&serviceEnv=live',
    );
  });

  it.each`
    pageType           | serviceOverride | variant    | environment | pathname                                              | expected
    ${ARTICLE_PAGE}    | ${null}         | ${null}    | ${'local'}  | ${'/ukrainian/articles/c0000000000o'}                 | ${'http://localhost/ukrainian/articles/c0000000000o'}
    ${ARTICLE_PAGE}    | ${null}         | ${null}    | ${'test'}   | ${'/ukrainian/articles/c0000000000o'}                 | ${'https://mock-bff-path/?id=c0000000000o&service=ukrainian&pageType=article&serviceEnv=test'}
    ${ARTICLE_PAGE}    | ${null}         | ${null}    | ${'live'}   | ${'/ukrainian/articles/c0000000000o'}                 | ${'https://mock-bff-path/?id=c0000000000o&service=ukrainian&pageType=article&serviceEnv=live'}
    ${ARTICLE_PAGE}    | ${null}         | ${'ru-UA'} | ${'local'}  | ${'/ukrainian/articles/c0000000000o'}                 | ${'http://localhost/ukrainian/articles/c0000000000o/ru-UA'}
    ${ARTICLE_PAGE}    | ${null}         | ${'ru-UA'} | ${'test'}   | ${'/ukrainian/articles/c0000000000o'}                 | ${'https://mock-bff-path/?id=c0000000000o&service=ukrainian&pageType=article&variant=ru-UA&serviceEnv=test'}
    ${ARTICLE_PAGE}    | ${null}         | ${'ru-UA'} | ${'live'}   | ${'/ukrainian/articles/c0000000000o'}                 | ${'https://mock-bff-path/?id=c0000000000o&service=ukrainian&pageType=article&variant=ru-UA&serviceEnv=live'}
    ${ARTICLE_PAGE}    | ${null}         | ${'ru-UA'} | ${'local'}  | ${'/ukrainian/articles/c00000000000o'}                | ${'http://localhost/ukrainian/articles/c00000000000o/ru-UA'}
    ${ARTICLE_PAGE}    | ${null}         | ${'ru-UA'} | ${'test'}   | ${'/ukrainian/articles/c00000000000o'}                | ${'https://mock-bff-path/?id=c00000000000o&service=ukrainian&pageType=article&variant=ru-UA&serviceEnv=test'}
    ${ARTICLE_PAGE}    | ${null}         | ${'ru-UA'} | ${'live'}   | ${'/ukrainian/articles/c00000000000o'}                | ${'https://mock-bff-path/?id=c00000000000o&service=ukrainian&pageType=article&variant=ru-UA&serviceEnv=live'}
    ${ARTICLE_PAGE}    | ${'kyrgyz'}     | ${null}    | ${'test'}   | ${'/kyrgyz/world-68767501'}                           | ${'https://mock-bff-path/?id=kyrgyz%2Fworld-68767501&service=kyrgyz&pageType=article&serviceEnv=test'}
    ${ARTICLE_PAGE}    | ${'kyrgyz'}     | ${null}    | ${'live'}   | ${'/kyrgyz/world-68767501'}                           | ${'https://mock-bff-path/?id=kyrgyz%2Fworld-68767501&service=kyrgyz&pageType=article&serviceEnv=live'}
    ${ARTICLE_PAGE}    | ${'hausa'}      | ${null}    | ${'local'}  | ${'/hausa/news/2010/10/101020_majalisa_shugabankasa'} | ${'http://localhost/hausa/news/2010/10/101020_majalisa_shugabankasa'}
    ${ARTICLE_PAGE}    | ${'hausa'}      | ${null}    | ${'test'}   | ${'/hausa/news/2010/10/101020_majalisa_shugabankasa'} | ${'https://mock-bff-path/?id=hausa%2Fnews%2F2010%2F10%2F101020_majalisa_shugabankasa&service=hausa&pageType=article&serviceEnv=test'}
    ${ARTICLE_PAGE}    | ${'hausa'}      | ${null}    | ${'live'}   | ${'/hausa/news/2010/10/101020_majalisa_shugabankasa'} | ${'https://mock-bff-path/?id=hausa%2Fnews%2F2010%2F10%2F101020_majalisa_shugabankasa&service=hausa&pageType=article&serviceEnv=live'}
    ${ARTICLE_PAGE}    | ${'cymrufyw'}   | ${null}    | ${'live'}   | ${'/cymrufyw/erthyglau/c0000000000o'}                 | ${'https://mock-bff-path/?id=c0000000000o&service=cymrufyw&pageType=article&serviceEnv=live'}
    ${CPS_ASSET}       | ${null}         | ${null}    | ${'local'}  | ${'/ukrainian/23263889'}                              | ${'http://localhost/ukrainian/23263889'}
    ${CPS_ASSET}       | ${null}         | ${null}    | ${'test'}   | ${'/ukrainian/23263889'}                              | ${'https://mock-bff-path/?id=ukrainian%2F23263889&service=ukrainian&pageType=cpsAsset&serviceEnv=test'}
    ${CPS_ASSET}       | ${null}         | ${null}    | ${'live'}   | ${'/ukrainian/23263889'}                              | ${'https://mock-bff-path/?id=ukrainian%2F23263889&service=ukrainian&pageType=cpsAsset&serviceEnv=live'}
    ${CPS_ASSET}       | ${null}         | ${null}    | ${'local'}  | ${'/ukrainian'}                                       | ${'http://localhost/ukrainian'}
    ${CPS_ASSET}       | ${'serbian'}    | ${'cyr'}   | ${'local'}  | ${'/serbian/cyr'}                                     | ${'http://localhost/serbian/cyr'}
    ${HOME_PAGE}       | ${null}         | ${null}    | ${'test'}   | ${'c0000000000t'}                                     | ${'https://mock-bff-path/?id=cl13j7792ljt&service=ukrainian&pageType=home&serviceEnv=test'}
    ${HOME_PAGE}       | ${null}         | ${null}    | ${'live'}   | ${'c0000000000t'}                                     | ${'https://mock-bff-path/?id=c3eg5kglplrt&service=ukrainian&pageType=home&serviceEnv=live'}
    ${LIVE_PAGE}       | ${null}         | ${null}    | ${'local'}  | ${'c0000000000t'}                                     | ${'http://localhost/api/local/ukrainian/live/c0000000000t'}
    ${LIVE_PAGE}       | ${null}         | ${null}    | ${'local'}  | ${'c0000000000t.lite'}                                | ${'http://localhost/api/local/ukrainian/live/c0000000000t'}
    ${LIVE_PAGE}       | ${'serbian'}    | ${'cyr'}   | ${'local'}  | ${'c0000000000t'}                                     | ${'http://localhost/api/local/serbian/live/c0000000000t/cyr'}
    ${LIVE_PAGE}       | ${'serbian'}    | ${'cyr'}   | ${'local'}  | ${'c0000000000t.lite'}                                | ${'http://localhost/api/local/serbian/live/c0000000000t/cyr'}
    ${LIVE_PAGE}       | ${null}         | ${null}    | ${'test'}   | ${'c0000000000t'}                                     | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=live&serviceEnv=test'}
    ${LIVE_PAGE}       | ${'zhongwen'}   | ${'trad'}  | ${'test'}   | ${'c0000000000t'}                                     | ${'https://mock-bff-path/?id=c0000000000t&service=zhongwen&pageType=live&variant=trad&serviceEnv=test'}
    ${LIVE_PAGE}       | ${null}         | ${null}    | ${'live'}   | ${'c0000000000t'}                                     | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=live&serviceEnv=live'}
    ${LIVE_PAGE}       | ${'serbian'}    | ${'cyr'}   | ${'live'}   | ${'c0000000000t'}                                     | ${'https://mock-bff-path/?id=c0000000000t&service=serbian&pageType=live&variant=cyr&serviceEnv=live'}
    ${LIVE_PAGE}       | ${'arabic'}     | ${null}    | ${'local'}  | ${'67574192'}                                         | ${'http://localhost/api/local/arabic/live/67574192'}
    ${LIVE_PAGE}       | ${'arabic'}     | ${null}    | ${'local'}  | ${'67574192.lite'}                                    | ${'http://localhost/api/local/arabic/live/67574192'}
    ${LIVE_PAGE}       | ${'zhongwen'}   | ${'trad'}  | ${'local'}  | ${'uk-69168527'}                                      | ${'http://localhost/api/local/zhongwen/live/uk-69168527/trad'}
    ${LIVE_PAGE}       | ${'zhongwen'}   | ${'trad'}  | ${'local'}  | ${'uk-69168527.lite'}                                 | ${'http://localhost/api/local/zhongwen/live/uk-69168527/trad'}
    ${LIVE_PAGE}       | ${'arabic'}     | ${null}    | ${'test'}   | ${'67574192'}                                         | ${'https://mock-bff-path/?id=%2Farabic%2Flive%2F67574192&service=arabic&pageType=live&serviceEnv=test'}
    ${LIVE_PAGE}       | ${'serbian'}    | ${'lat'}   | ${'test'}   | ${'media-23179005'}                                   | ${'https://mock-bff-path/?id=%2Fserbian%2Flat%2Flive%2Fmedia-23179005&service=serbian&pageType=live&variant=lat&serviceEnv=test'}
    ${LIVE_PAGE}       | ${'arabic'}     | ${null}    | ${'live'}   | ${'67574192'}                                         | ${'https://mock-bff-path/?id=%2Farabic%2Flive%2F67574192&service=arabic&pageType=live&serviceEnv=live'}
    ${LIVE_PAGE}       | ${'zhongwen'}   | ${'trad'}  | ${'live'}   | ${'uk-69168527'}                                      | ${'https://mock-bff-path/?id=%2Fzhongwen%2Ftrad%2Flive%2Fuk-69168527&service=zhongwen&pageType=live&variant=trad&serviceEnv=live'}
    ${TOPIC_PAGE}      | ${null}         | ${null}    | ${'local'}  | ${'/ukrainian/topics/c0000000000t'}                   | ${'http://localhost/ukrainian/topics/c0000000000t'}
    ${TOPIC_PAGE}      | ${null}         | ${null}    | ${'test'}   | ${'/ukrainian/topics/c0000000000t'}                   | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=topic&serviceEnv=test'}
    ${TOPIC_PAGE}      | ${null}         | ${null}    | ${'live'}   | ${'/ukrainian/topics/c0000000000t'}                   | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=topic&serviceEnv=live'}
    ${TOPIC_PAGE}      | ${null}         | ${'ru-UA'} | ${'local'}  | ${'/ukrainian/topics/c0000000000t'}                   | ${'http://localhost/ukrainian/topics/c0000000000t/ru-UA'}
    ${TOPIC_PAGE}      | ${null}         | ${'ru-UA'} | ${'test'}   | ${'/ukrainian/topics/c0000000000t'}                   | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=topic&variant=ru-UA&serviceEnv=test'}
    ${TOPIC_PAGE}      | ${null}         | ${'ru-UA'} | ${'live'}   | ${'/ukrainian/topics/c0000000000t'}                   | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=topic&variant=ru-UA&serviceEnv=live'}
    ${TOPIC_PAGE}      | ${'persian'}    | ${null}    | ${'local'}  | ${'/persian/afghanistan'}                             | ${'http://localhost/persian/topics/crezq2dg9zwt'}
    ${TOPIC_PAGE}      | ${'persian'}    | ${null}    | ${'test'}   | ${'/persian/afghanistan'}                             | ${'https://mock-bff-path/?id=c15er11zq57t&service=persian&pageType=topic&serviceEnv=test'}
    ${TOPIC_PAGE}      | ${'persian'}    | ${null}    | ${'live'}   | ${'/persian/afghanistan'}                             | ${'https://mock-bff-path/?id=crezq2dg9zwt&service=persian&pageType=topic&serviceEnv=live'}
    ${TOPIC_PAGE}      | ${'persian'}    | ${null}    | ${'local'}  | ${'/persian/topics/c0000000000t'}                     | ${'http://localhost/persian/topics/c0000000000t'}
    ${TOPIC_PAGE}      | ${'persian'}    | ${null}    | ${'test'}   | ${'/persian/topics/c0000000000t'}                     | ${'https://mock-bff-path/?id=c0000000000t&service=persian&pageType=topic&serviceEnv=test'}
    ${TOPIC_PAGE}      | ${'persian'}    | ${null}    | ${'live'}   | ${'/persian/topics/c0000000000t'}                     | ${'https://mock-bff-path/?id=c0000000000t&service=persian&pageType=topic&serviceEnv=live'}
    ${TOPIC_PAGE}      | ${'persian'}    | ${null}    | ${'local'}  | ${'/persian/topics/c00000000000t'}                    | ${'http://localhost/persian/topics/c00000000000t'}
    ${TOPIC_PAGE}      | ${'persian'}    | ${null}    | ${'test'}   | ${'/persian/topics/c00000000000t'}                    | ${'https://mock-bff-path/?id=c00000000000t&service=persian&pageType=topic&serviceEnv=test'}
    ${TOPIC_PAGE}      | ${'persian'}    | ${null}    | ${'live'}   | ${'/persian/topics/c00000000000t'}                    | ${'https://mock-bff-path/?id=c00000000000t&service=persian&pageType=topic&serviceEnv=live'}
    ${TOPIC_PAGE}      | ${'zhongwen'}   | ${'trad'}  | ${'local'}  | ${'/zhongwen/topics/cpydz21p02et/trad'}               | ${'http://localhost/zhongwen/topics/cpydz21p02et/trad'}
    ${TOPIC_PAGE}      | ${'zhongwen'}   | ${'simp'}  | ${'local'}  | ${'/zhongwen/topics/c4vmr03pyn6t/simp'}               | ${'http://localhost/zhongwen/topics/c4vmr03pyn6t/simp'}
    ${TOPIC_PAGE}      | ${'zhongwen'}   | ${'trad'}  | ${'test'}   | ${'/zhongwen/topics/cpydz21p02et/trad'}               | ${'https://mock-bff-path/?id=cpydz21p02et&service=zhongwen&pageType=topic&variant=trad&serviceEnv=test'}
    ${TOPIC_PAGE}      | ${'zhongwen'}   | ${'simp'}  | ${'test'}   | ${'/zhongwen/topics/c4vmr03pyn6t/simp'}               | ${'https://mock-bff-path/?id=c4vmr03pyn6t&service=zhongwen&pageType=topic&variant=simp&serviceEnv=test'}
    ${TOPIC_PAGE}      | ${'zhongwen'}   | ${'trad'}  | ${'live'}   | ${'/zhongwen/topics/cpydz21p02et/trad'}               | ${'https://mock-bff-path/?id=cpydz21p02et&service=zhongwen&pageType=topic&variant=trad&serviceEnv=live'}
    ${TOPIC_PAGE}      | ${'zhongwen'}   | ${'simp'}  | ${'live'}   | ${'/zhongwen/topics/c4vmr03pyn6t/simp'}               | ${'https://mock-bff-path/?id=c4vmr03pyn6t&service=zhongwen&pageType=topic&variant=simp&serviceEnv=live'}
    ${UGC_PAGE}        | ${'mundo'}      | ${null}    | ${'local'}  | ${'/u50853489'}                                       | ${'http://localhost/api/local/mundo/send/u50853489'}
    ${TV_PAGE}         | ${'hausa'}      | ${null}    | ${'local'}  | ${'/hausa/bbc_hausa_tv/tv/w172yjj7rfhxp1p'}           | ${'http://localhost/hausa/bbc_hausa_tv/tv/w172yjj7rfhxp1p'}
    ${TV_PAGE}         | ${'hindi'}      | ${null}    | ${'local'}  | ${'/hindi/bbc_hindi_tv/tv_programmes/w13xttlw'}       | ${'http://localhost/hindi/bbc_hindi_tv/tv_programmes/w13xttlw'}
    ${TV_PAGE}         | ${'hausa'}      | ${null}    | ${'test'}   | ${'/hausa/bbc_hausa_tv/tv/w172yjj7rfhxp1p'}           | ${'https://mock-bff-path/?id=hausa%2Fbbc_hausa_tv%2Ftv%2Fw172yjj7rfhxp1p&service=hausa&pageType=tv&serviceEnv=test'}
    ${TV_PAGE}         | ${'hindi'}      | ${null}    | ${'test'}   | ${'/hindi/bbc_hindi_tv/tv_programmes/w13xttlw'}       | ${'https://mock-bff-path/?id=hindi%2Fbbc_hindi_tv%2Ftv_programmes%2Fw13xttlw&service=hindi&pageType=tv&serviceEnv=test'}
    ${TV_PAGE}         | ${'hausa'}      | ${null}    | ${'live'}   | ${'/hausa/bbc_hausa_tv/tv/w172yjj7rfhxp1p'}           | ${'https://mock-bff-path/?id=hausa%2Fbbc_hausa_tv%2Ftv%2Fw172yjj7rfhxp1p&service=hausa&pageType=tv&serviceEnv=live'}
    ${TV_PAGE}         | ${'hindi'}      | ${null}    | ${'live'}   | ${'/hindi/bbc_hindi_tv/tv_programmes/w13xttlw'}       | ${'https://mock-bff-path/?id=hindi%2Fbbc_hindi_tv%2Ftv_programmes%2Fw13xttlw&service=hindi&pageType=tv&serviceEnv=live'}
    ${LIVE_RADIO_PAGE} | ${'afrique'}    | ${null}    | ${'local'}  | ${'/afrique/bbc_afrique_radio/liveradio'}             | ${'http://localhost/afrique/bbc_afrique_radio/liveradio'}
    ${LIVE_RADIO_PAGE} | ${'afrique'}    | ${null}    | ${'test'}   | ${'/afrique/bbc_afrique_radio/liveradio'}             | ${'https://mock-bff-path/?id=bbc_afrique_radio&service=afrique&pageType=liveRadio&serviceEnv=test'}
    ${LIVE_RADIO_PAGE} | ${'afrique'}    | ${null}    | ${'live'}   | ${'/afrique/bbc_afrique_radio/liveradio'}             | ${'https://mock-bff-path/?id=bbc_afrique_radio&service=afrique&pageType=liveRadio&serviceEnv=live'}
  `(
    `on $environment environment, should return $expected when path is $pathname, pageType is $pageType, service is $serviceOverride and variant is $variant`,
    ({
      pageType,
      serviceOverride,
      variant,
      environment,
      pathname,
      expected,
    }) => {
      process.env.SIMORGH_APP_ENV = environment;
      const service = serviceOverride || 'ukrainian';

      const fetchUrl = constructPageFetchUrl({
        pathname,
        pageType,
        service,
        variant,
      });

      expect(fetchUrl.toString()).toBe(expected);
    },
  );

  it.each`
    pageType           | service        | pathname                            | expected
    ${HOME_PAGE}       | ${'foo'}       | ${'/foo/c0000000000t'}              | ${'Home ID is invalid'}
    ${LIVE_PAGE}       | ${'ukrainian'} | ${'foo'}                            | ${'Live ID is invalid'}
    ${TOPIC_PAGE}      | ${'ukrainian'} | ${'/ukrainian/topics/foo'}          | ${'Topic ID is invalid'}
    ${TOPIC_PAGE}      | ${'ukrainian'} | ${'/ukrainian/topics/c000000000t'}  | ${'Topic ID is invalid'}
    ${LIVE_RADIO_PAGE} | ${'afrique'}   | ${'/foo'}                           | ${'LiveRadio ID is invalid'}
    ${'foo'}           | ${'ukrainian'} | ${'/ukrainian/topics/c0000000000t'} | ${'Foo ID is invalid'}
  `(
    `should throw a 500 with message $expected, when pageType $pageType asset ID is incorrect with service of $service`,
    ({ pageType, service, pathname, expected }) => {
      expect(() => {
        constructPageFetchUrl({
          pathname,
          pageType,
          service,
        });
      }).toThrow(expected);
    },
  );
});
