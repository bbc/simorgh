import constructPageFetchUrl from '.';
import PAGE_TYPES from './page-types';

const { ARTICLE, CPS_ASSET, HOME, LIVE, TOPIC } = PAGE_TYPES;

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
    const pageType = PAGE_TYPES.TOPIC;
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
      variant: 'ru-UA',
      isAmp: true,
    });
  });

  it('should remove .amp from ID', async () => {
    const service = 'pidgin';
    const pathname = '/pidgin/articles/c0000000000o.amp';
    const pageType = PAGE_TYPES.ARTICLE;

    const fetchUrl = constructPageFetchUrl({
      pathname,
      pageType,
      service,
    });

    expect(fetchUrl.toString()).toBe(
      'https://mock-bff-path/?id=c0000000000o&service=pidgin&pageType=article',
    );
  });

  it.each`
    pageType     | serviceOverride | variant    | environment | pathname                              | expected
    ${ARTICLE}   | ${null}         | ${null}    | ${'local'}  | ${'/ukrainian/articles/c0000000000o'} | ${'http://localhost/ukrainian/articles/c0000000000o'}
    ${ARTICLE}   | ${null}         | ${null}    | ${'test'}   | ${'/ukrainian/articles/c0000000000o'} | ${'https://mock-bff-path/?id=c0000000000o&service=ukrainian&pageType=article'}
    ${ARTICLE}   | ${null}         | ${null}    | ${'live'}   | ${'/ukrainian/articles/c0000000000o'} | ${'https://mock-bff-path/?id=c0000000000o&service=ukrainian&pageType=article'}
    ${ARTICLE}   | ${null}         | ${'ru-UA'} | ${'local'}  | ${'/ukrainian/articles/c0000000000o'} | ${'http://localhost/ukrainian/articles/c0000000000o/ru-UA'}
    ${ARTICLE}   | ${null}         | ${'ru-UA'} | ${'test'}   | ${'/ukrainian/articles/c0000000000o'} | ${'https://mock-bff-path/?id=c0000000000o&service=ukrainian&pageType=article&variant=ru-UA'}
    ${ARTICLE}   | ${null}         | ${'ru-UA'} | ${'live'}   | ${'/ukrainian/articles/c0000000000o'} | ${'https://mock-bff-path/?id=c0000000000o&service=ukrainian&pageType=article&variant=ru-UA'}
    ${CPS_ASSET} | ${null}         | ${null}    | ${'local'}  | ${'/ukrainian/23263889'}              | ${'http://localhost/ukrainian/23263889'}
    ${CPS_ASSET} | ${null}         | ${null}    | ${'test'}   | ${'/ukrainian/23263889'}              | ${'https://mock-bff-path/?id=%2Fukrainian%2F23263889&service=ukrainian&pageType=cpsAsset'}
    ${CPS_ASSET} | ${null}         | ${null}    | ${'live'}   | ${'/ukrainian/23263889'}              | ${'https://mock-bff-path/?id=%2Fukrainian%2F23263889&service=ukrainian&pageType=cpsAsset'}
    ${CPS_ASSET} | ${null}         | ${null}    | ${'local'}  | ${'/ukrainian'}                       | ${'http://localhost/ukrainian'}
    ${CPS_ASSET} | ${null}         | ${null}    | ${'test'}   | ${'/ukrainian'}                       | ${'https://mock-bff-path/?id=%2Fukrainian%2Ffront_page&service=ukrainian&pageType=cpsAsset'}
    ${CPS_ASSET} | ${null}         | ${null}    | ${'live'}   | ${'/ukrainian'}                       | ${'https://mock-bff-path/?id=%2Fukrainian%2Ffront_page&service=ukrainian&pageType=cpsAsset'}
    ${CPS_ASSET} | ${'serbian'}    | ${'cyr'}   | ${'local'}  | ${'/serbian/cyr'}                     | ${'http://localhost/serbian/cyr'}
    ${CPS_ASSET} | ${'serbian'}    | ${'cyr'}   | ${'test'}   | ${'/serbian/cyr'}                     | ${'https://mock-bff-path/?id=%2Fserbian%2Fcyr%2Ffront_page&service=serbian&pageType=cpsAsset&variant=cyr'}
    ${CPS_ASSET} | ${'serbian'}    | ${'cyr'}   | ${'live'}   | ${'/serbian/cyr'}                     | ${'https://mock-bff-path/?id=%2Fserbian%2Fcyr%2Ffront_page&service=serbian&pageType=cpsAsset&variant=cyr'}
    ${HOME}      | ${null}         | ${null}    | ${'local'}  | ${'c0000000000t'}                     | ${'http://localhost/ukrainian/tipohome'}
    ${HOME}      | ${null}         | ${null}    | ${'test'}   | ${'c0000000000t'}                     | ${'https://mock-bff-path/?id=cl13j7792ljt&service=ukrainian&pageType=home'}
    ${HOME}      | ${null}         | ${null}    | ${'live'}   | ${'c0000000000t'}                     | ${'https://mock-bff-path/?id=c3eg5kglplrt&service=ukrainian&pageType=home'}
    ${LIVE}      | ${null}         | ${null}    | ${'local'}  | ${'c0000000000t'}                     | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=live'}
    ${LIVE}      | ${null}         | ${null}    | ${'test'}   | ${'c0000000000t'}                     | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=live'}
    ${LIVE}      | ${null}         | ${null}    | ${'live'}   | ${'c0000000000t'}                     | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=live'}
    ${TOPIC}     | ${null}         | ${null}    | ${'local'}  | ${'/ukrainian/topics/c0000000000t'}   | ${'http://localhost/ukrainian/topics/c0000000000t'}
    ${TOPIC}     | ${null}         | ${null}    | ${'test'}   | ${'/ukrainian/topics/c0000000000t'}   | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=topic'}
    ${TOPIC}     | ${null}         | ${null}    | ${'live'}   | ${'/ukrainian/topics/c0000000000t'}   | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=topic'}
    ${TOPIC}     | ${null}         | ${'ru-UA'} | ${'local'}  | ${'/ukrainian/topics/c0000000000t'}   | ${'http://localhost/ukrainian/ru-UA/topics/c0000000000t'}
    ${TOPIC}     | ${null}         | ${'ru-UA'} | ${'test'}   | ${'/ukrainian/topics/c0000000000t'}   | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=topic&variant=ru-UA'}
    ${TOPIC}     | ${null}         | ${'ru-UA'} | ${'live'}   | ${'/ukrainian/topics/c0000000000t'}   | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=topic&variant=ru-UA'}
  `(
    `should return $expected when pageType is $pageType and variant is $variant on $environment environment`,
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
    pageType   | service        | pathname                            | expected
    ${ARTICLE} | ${'ukrainian'} | ${'/ukrainian/articles/foo'}        | ${'Article ID is invalid'}
    ${HOME}    | ${'foo'}       | ${'/foo/c0000000000t'}              | ${'Home ID is invalid'}
    ${LIVE}    | ${'ukrainian'} | ${'foo'}                            | ${'Live ID is invalid'}
    ${TOPIC}   | ${'ukrainian'} | ${'/ukrainian/topics/foo'}          | ${'Topic ID is invalid'}
    ${'foo'}   | ${'ukrainian'} | ${'/ukrainian/topics/c0000000000t'} | ${'Foo ID is invalid'}
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
