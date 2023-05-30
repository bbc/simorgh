import constructPageFetchUrl from '.';
import PAGE_TYPES from './page-types';

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

    const fetchUrl = constructPageFetchUrl({
      pathname,
      pageType,
      service,
      variant,
      page,
    });

    expect(fetchUrl.query).toEqual({
      id: 'c0000000000t',
      page: '2',
      pageType: 'topic',
      service: 'ukrainian',
      variant: 'ru-UA',
    });
  });

  it('should remove .amp from ID', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    const service = 'pidgin';
    const pathname = '/pidgin.amp';
    const pageType = PAGE_TYPES.HOME;

    const fetchUrl = constructPageFetchUrl({
      pathname,
      pageType,
      service,
    });

    expect(fetchUrl.toString()).toBe(
      'https://mock-bff-path/?id=ck3yk9nz25qt&service=pidgin&pageType=home',
    );
  });

  it.each`
    pageType                | variant    | pathname                              | expected
    ${PAGE_TYPES.ARTICLE}   | ${null}    | ${'/ukrainian/articles/c0000000000o'} | ${'http://localhost/ukrainian/articles/c0000000000o'}
    ${PAGE_TYPES.CPS_ASSET} | ${null}    | ${'/ukrainian/23263889'}              | ${'http://localhost/ukrainian/23263889'}
    ${PAGE_TYPES.HOME}      | ${null}    | ${'c0000000000t'}                     | ${'http://localhost/ukrainian/tipohome'}
    ${PAGE_TYPES.LIVE}      | ${null}    | ${'c0000000000t'}                     | ${'https://mock-bff-path/?id=c0000000000t&service=ukrainian&pageType=live'}
    ${PAGE_TYPES.TOPIC}     | ${null}    | ${'/ukrainian/topics/c0000000000t'}   | ${'http://localhost/ukrainian/topics/c0000000000t'}
    ${PAGE_TYPES.TOPIC}     | ${'ru-UA'} | ${'/ukrainian/topics/c0000000000t'}   | ${'http://localhost/ukrainian/ru-UA/topics/c0000000000t'}
  `(
    `should return $expected when pageType is $pageType and variant is $variant on local environment`,
    ({ pageType, variant, pathname, expected }) => {
      process.env.SIMORGH_APP_ENV = 'local';
      const service = 'ukrainian';

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
    pageType            | service        | pathname                            | expected
    ${PAGE_TYPES.HOME}  | ${'foo'}       | ${'/foo/c0000000000t'}              | ${'Home ID is invalid'}
    ${PAGE_TYPES.LIVE}  | ${'ukrainian'} | ${'foo'}                            | ${'Live ID is invalid'}
    ${PAGE_TYPES.TOPIC} | ${'ukrainian'} | ${'/ukrainian/topics/foo'}          | ${'Topic ID is invalid'}
    ${'foo'}            | ${'ukrainian'} | ${'/ukrainian/topics/c0000000000t'} | ${'Foo ID is invalid'}
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
