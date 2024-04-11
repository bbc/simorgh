import constructPageFetchUrl from '.';
import {
  ARTICLE_PAGE,
  CPS_ASSET,
  HOME_PAGE,
  LIVE_PAGE,
  TOPIC_PAGE,
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
    pageType        | serviceOverride | variant    | environment | pathname                               | expected
    ${ARTICLE_PAGE} | ${null}         | ${null}    | ${'local'}  | ${'/ukrainian/articles/c0000000000o'}  | ${'http://localhost/ukrainian/articles/c0000000000o'}
    ${ARTICLE_PAGE} | ${null}         | ${null}    | ${'test'}   | ${'/ukrainian/articles/c0000000000o'}  | ${'https://mock-bff-path/?id=c0000000000o&service=ukrainian&pageType=article&serviceEnv=test'}
    ${ARTICLE_PAGE} | ${null}         | ${null}    | ${'live'}   | ${'/ukrainian/articles/c0000000000o'}  | ${'https://mock-bff-path/?id=c0000000000o&service=ukrainian&pageType=article&serviceEnv=live'}
    ${ARTICLE_PAGE} | ${null}         | ${'ru-UA'} | ${'local'}  | ${'/ukrainian/articles/c0000000000o'}  | ${'http://localhost/ukrainian/articles/c0000000000o/ru-UA'}
    ${ARTICLE_PAGE} | ${null}         | ${'ru-UA'} | ${'test'}   | ${'/ukrainian/articles/c0000000000o'}  | ${'https://mock-bff-path/?id=c0000000000o&service=ukrainian&pageType=article&variant=ru-UA&serviceEnv=test'}
    ${ARTICLE_PAGE} | ${null}         | ${'ru-UA'} | ${'live'}   | ${'/ukrainian/articles/c0000000000o'}  | ${'https://mock-bff-path/?id=c0000000000o&service=ukrainian&pageType=article&variant=ru-UA&serviceEnv=live'}
    ${ARTICLE_PAGE} | ${null}         | ${'ru-UA'} | ${'local'}  | ${'/ukrainian/articles/c00000000000o'} | ${'http://localhost/ukrainian/articles/c00000000000o/ru-UA'}
    ${ARTICLE_PAGE} | ${null}         | ${'ru-UA'} | ${'test'}   | ${'/ukrainian/articles/c00000000000o'} | ${'https://mock-bff-path/?id=c00000000000o&service=ukrainian&pageType=article&variant=ru-UA&serviceEnv=test'}
    ${ARTICLE_PAGE} | ${null}         | ${'ru-UA'} | ${'live'}   | ${'/ukrainian/articles/c00000000000o'} | ${'https://mock-bff-path/?id=c00000000000o&service=ukrainian&pageType=article&variant=ru-UA&serviceEnv=live'}
    ${CPS_ASSET}    | ${null}         | ${null}    | ${'local'}  | ${'/ukrainian/23263889'}               | ${'http://localhost/ukrainian/23263889'}
    ${CPS_ASSET}    | ${null}         | ${null}    | ${'test'}   | ${'/ukrainian/23263889'}               | ${'https://mock-bff-path/?id=ukrainian%2F23263889&service=ukrainian&pageType=cpsAsset&serviceEnv=test'}
    ${CPS_ASSET}    | ${null}         | ${null}    | ${'live'}   | ${'/ukrainian/23263889'}               | ${'https://mock-bff-path/?id=ukrainian%2F23263889&service=ukrainian&pageType=cpsAsset&serviceEnv=live'}
    ${CPS_ASSET}    | ${null}         | ${null}    | ${'local'}  | ${'/ukrainian'}                        | ${'http://localhost/ukrainian'}
    ${CPS_ASSET}    | ${null}         | ${null}    | ${'test'}   | ${'/ukrainian'}                        | ${'https://mock-bff-path/?id=ukrainian%2Ffront_page&service=ukrainian&pageType=cpsAsset&serviceEnv=test'}
    ${CPS_ASSET}    | ${null}         | ${null}    | ${'live'}   | ${'/ukrainian'}                        | ${'https://mock-bff-path/?id=ukrainian%2Ffront_page&service=ukrainian&pageType=cpsAsset&serviceEnv=live'}
    ${CPS_ASSET}    | ${'serbian'}    | ${'cyr'}   | ${'local'}  | ${'/serbian/cyr'}                      | ${'http://localhost/serbian/cyr'}
    ${CPS_ASSET}    | ${'serbian'}    | ${'cyr'}   | ${'test'}   | ${'/serbian/cyr'}                      | ${'https://mock-bff-path/?id=serbian%2Fcyr%2Ffront_page&service=serbian&pageType=cpsAsset&variant=cyr&serviceEnv=test'}
    ${CPS_ASSET}    | ${'serbian'}    | ${'cyr'}   | ${'live'}   | ${'/serbian/cyr'}                      | ${'https://mock-bff-path/?id=serbian%2Fcyr%2Ffront_page&service=serbian&pageType=cpsAsset&variant=cyr&serviceEnv=live'}
    ${HOME_PAGE}    | ${null}         | ${null}    | ${'local'}  | ${'c0000000000t'}                      | ${'http://localhost/ukrainian/tipohome'}
    ${HOME_PAGE}    | ${null}         | ${null}    | ${'test'}   | ${'c0000000000t'}                      | ${'https://mock-bff-path/?id=cl13j7792ljt&service=ukrainian&pageType=home&serviceEnv=test'}
    ${HOME_PAGE}    | ${null}         | ${null}    | ${'live'}   | ${'c0000000000t'}                      | ${'https://mock-bff-path/?id=c3eg5kglplrt&service=ukrainian&pageType=home&serviceEnv=live'}
    ${LIVE_PAGE}    | ${null}         | ${null}    | ${'local'}  | ${'c0000000000t'}                      | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=live&serviceEnv=local'}
    ${LIVE_PAGE}    | ${null}         | ${null}    | ${'test'}   | ${'c0000000000t'}                      | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=live&serviceEnv=test'}
    ${LIVE_PAGE}    | ${null}         | ${null}    | ${'live'}   | ${'c0000000000t'}                      | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=live&serviceEnv=live'}
    ${TOPIC_PAGE}   | ${null}         | ${null}    | ${'local'}  | ${'/ukrainian/topics/c0000000000t'}    | ${'http://localhost/ukrainian/topics/c0000000000t'}
    ${TOPIC_PAGE}   | ${null}         | ${null}    | ${'test'}   | ${'/ukrainian/topics/c0000000000t'}    | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=topic&serviceEnv=test'}
    ${TOPIC_PAGE}   | ${null}         | ${null}    | ${'live'}   | ${'/ukrainian/topics/c0000000000t'}    | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=topic&serviceEnv=live'}
    ${TOPIC_PAGE}   | ${null}         | ${'ru-UA'} | ${'local'}  | ${'/ukrainian/topics/c0000000000t'}    | ${'http://localhost/ukrainian/ru-UA/topics/c0000000000t'}
    ${TOPIC_PAGE}   | ${null}         | ${'ru-UA'} | ${'test'}   | ${'/ukrainian/topics/c0000000000t'}    | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=topic&variant=ru-UA&serviceEnv=test'}
    ${TOPIC_PAGE}   | ${null}         | ${'ru-UA'} | ${'live'}   | ${'/ukrainian/topics/c0000000000t'}    | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=topic&variant=ru-UA&serviceEnv=live'}
    ${TOPIC_PAGE}   | ${'persian'}    | ${null}    | ${'local'}  | ${'/persian/afghanistan'}              | ${'http://localhost/persian/topics/crezq2dg9zwt'}
    ${TOPIC_PAGE}   | ${'persian'}    | ${null}    | ${'test'}   | ${'/persian/afghanistan'}              | ${'https://mock-bff-path/?id=c15er11zq57t&service=persian&pageType=topic&serviceEnv=test'}
    ${TOPIC_PAGE}   | ${'persian'}    | ${null}    | ${'live'}   | ${'/persian/afghanistan'}              | ${'https://mock-bff-path/?id=crezq2dg9zwt&service=persian&pageType=topic&serviceEnv=live'}
    ${TOPIC_PAGE}   | ${'persian'}    | ${null}    | ${'local'}  | ${'/persian/topics/c0000000000t'}      | ${'http://localhost/persian/topics/c0000000000t'}
    ${TOPIC_PAGE}   | ${'persian'}    | ${null}    | ${'test'}   | ${'/persian/topics/c0000000000t'}      | ${'https://mock-bff-path/?id=c0000000000t&service=persian&pageType=topic&serviceEnv=test'}
    ${TOPIC_PAGE}   | ${'persian'}    | ${null}    | ${'live'}   | ${'/persian/topics/c0000000000t'}      | ${'https://mock-bff-path/?id=c0000000000t&service=persian&pageType=topic&serviceEnv=live'}
    ${TOPIC_PAGE}   | ${'persian'}    | ${null}    | ${'local'}  | ${'/persian/topics/c00000000000t'}     | ${'http://localhost/persian/topics/c00000000000t'}
    ${TOPIC_PAGE}   | ${'persian'}    | ${null}    | ${'test'}   | ${'/persian/topics/c00000000000t'}     | ${'https://mock-bff-path/?id=c00000000000t&service=persian&pageType=topic&serviceEnv=test'}
    ${TOPIC_PAGE}   | ${'persian'}    | ${null}    | ${'live'}   | ${'/persian/topics/c00000000000t'}     | ${'https://mock-bff-path/?id=c00000000000t&service=persian&pageType=topic&serviceEnv=live'}
    ${UGC_PAGE}     | ${'mundo'}      | ${null}    | ${'local'}  | ${'/u50853489'}                        | ${'https://mock-bff-path/?id=u50853489&service=mundo&pageType=ugcForm&serviceEnv=local'}
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
    pageType        | service        | pathname                             | expected
    ${ARTICLE_PAGE} | ${'ukrainian'} | ${'/ukrainian/articles/foo'}         | ${'Article ID is invalid'}
    ${ARTICLE_PAGE} | ${'ukrainian'} | ${'/ukrainian/articles/c000000000o'} | ${'Article ID is invalid'}
    ${HOME_PAGE}    | ${'foo'}       | ${'/foo/c0000000000t'}               | ${'Home ID is invalid'}
    ${LIVE_PAGE}    | ${'ukrainian'} | ${'foo'}                             | ${'Live ID is invalid'}
    ${TOPIC_PAGE}   | ${'ukrainian'} | ${'/ukrainian/topics/foo'}           | ${'Topic ID is invalid'}
    ${TOPIC_PAGE}   | ${'ukrainian'} | ${'/ukrainian/topics/c000000000t'}   | ${'Topic ID is invalid'}
    ${'foo'}        | ${'ukrainian'} | ${'/ukrainian/topics/c0000000000t'}  | ${'Foo ID is invalid'}
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
