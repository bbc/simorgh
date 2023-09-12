import { Agent as HttpsAgent } from 'http';
import { Agent as UndiciAgent } from 'undici';

import fetchDataFromBFF from '.';
import {
  ARTICLE_PAGE,
  CPS_ASSET,
  HOME_PAGE,
  MOST_READ_PAGE,
  TOPIC_PAGE,
} from '../pageTypes';
import * as fetchPageData from '../fetchPageData';

jest.mock('../fetchPageData', () =>
  jest.fn().mockImplementation(() => {
    return {
      json: { data: {} },
      status: 200,
    };
  }),
);

const mockAgent = { cert: 'cert', ca: 'ca', key: 'key' };

jest.mock('../../../../server/utilities/getAgent', () =>
  jest.fn(() => Promise.resolve(mockAgent as unknown as HttpsAgent)),
);

jest.mock('../../../../../ws-nextjs-app/utilities/undiciAgent', () =>
  jest.fn(() => Promise.resolve(mockAgent as unknown as UndiciAgent)),
);

describe('Fetch Data from BFF', () => {
  beforeEach(() => {
    process.env.BFF_PATH = 'https://mock-bff-path';
  });
  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.SIMORGH_APP_ENV;
    delete process.env.BFF_PATH;
  });

  describe('for an article', () => {
    const url = '/pidgin/articles/cwl08rd38p6o';

    it.each`
      environment | pathname                      | path                                                                        | agent        | optHeaders
      ${'local'}  | ${url}                        | ${'http://localhost/pidgin/articles/cwl08rd38p6o'}                          | ${undefined} | ${undefined}
      ${'local'}  | ${`${url}?renderer_env=test`} | ${'https://mock-bff-path/?id=cwl08rd38p6o&service=pidgin&pageType=article'} | ${mockAgent} | ${{ 'ctx-service-env': 'test' }}
      ${'local'}  | ${`${url}?renderer_env=live`} | ${'https://mock-bff-path/?id=cwl08rd38p6o&service=pidgin&pageType=article'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
      ${'test'}   | ${url}                        | ${'https://mock-bff-path/?id=cwl08rd38p6o&service=pidgin&pageType=article'} | ${mockAgent} | ${{ 'ctx-service-env': 'test' }}
      ${'test'}   | ${`${url}?renderer_env=live`} | ${'https://mock-bff-path/?id=cwl08rd38p6o&service=pidgin&pageType=article'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
      ${'live'}   | ${url}                        | ${'https://mock-bff-path/?id=cwl08rd38p6o&service=pidgin&pageType=article'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
    `(
      'when environment is $environment and pathname is $pathname, should invoke the BFF with the expected params',
      async ({ environment, path, agent, optHeaders, pathname }) => {
        const fetchPageDataSpy = jest.spyOn(fetchPageData, 'default');
        process.env.SIMORGH_APP_ENV = environment;

        await fetchDataFromBFF({
          pathname,
          pageType: ARTICLE_PAGE,
          service: 'pidgin',
        });

        expect(fetchPageDataSpy).toHaveBeenCalledWith({
          pageType: ARTICLE_PAGE,
          path,
          agent,
          optHeaders,
        });
      },
    );
  });

  describe('for a CPS Asset', () => {
    const url = '/pidgin/12345678';

    it.each`
      environment | pathname                      | path                                                                                 | agent        | optHeaders
      ${'local'}  | ${url}                        | ${'http://localhost/pidgin/12345678'}                                                | ${undefined} | ${undefined}
      ${'local'}  | ${`${url}?renderer_env=test`} | ${'https://mock-bff-path/?id=%2Fpidgin%2F12345678&service=pidgin&pageType=cpsAsset'} | ${mockAgent} | ${{ 'ctx-service-env': 'test' }}
      ${'local'}  | ${`${url}?renderer_env=live`} | ${'https://mock-bff-path/?id=%2Fpidgin%2F12345678&service=pidgin&pageType=cpsAsset'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
      ${'test'}   | ${url}                        | ${'https://mock-bff-path/?id=%2Fpidgin%2F12345678&service=pidgin&pageType=cpsAsset'} | ${mockAgent} | ${{ 'ctx-service-env': 'test' }}
      ${'test'}   | ${`${url}?renderer_env=live`} | ${'https://mock-bff-path/?id=%2Fpidgin%2F12345678&service=pidgin&pageType=cpsAsset'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
      ${'live'}   | ${url}                        | ${'https://mock-bff-path/?id=%2Fpidgin%2F12345678&service=pidgin&pageType=cpsAsset'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
    `(
      'when environment is $environment and pathname is $pathname, should invoke the BFF with the expected params',
      async ({ environment, path, agent, optHeaders, pathname }) => {
        const fetchPageDataSpy = jest.spyOn(fetchPageData, 'default');
        process.env.SIMORGH_APP_ENV = environment;

        await fetchDataFromBFF({
          pathname,
          pageType: CPS_ASSET,
          service: 'pidgin',
        });

        expect(fetchPageDataSpy).toHaveBeenCalledWith({
          pageType: CPS_ASSET,
          path,
          agent,
          optHeaders,
        });
      },
    );
  });

  describe('for a topic page', () => {
    const url = '/pidgin/topics/c0000000000t';

    it.each`
      environment | pathname                      | path                                                                      | agent        | optHeaders
      ${'local'}  | ${url}                        | ${'http://localhost/pidgin/topics/c0000000000t'}                          | ${undefined} | ${undefined}
      ${'local'}  | ${`${url}?renderer_env=test`} | ${'https://mock-bff-path/?id=c0000000000t&service=pidgin&pageType=topic'} | ${mockAgent} | ${{ 'ctx-service-env': 'test' }}
      ${'local'}  | ${`${url}?renderer_env=live`} | ${'https://mock-bff-path/?id=c0000000000t&service=pidgin&pageType=topic'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
      ${'test'}   | ${url}                        | ${'https://mock-bff-path/?id=c0000000000t&service=pidgin&pageType=topic'} | ${mockAgent} | ${{ 'ctx-service-env': 'test' }}
      ${'test'}   | ${`${url}?renderer_env=test`} | ${'https://mock-bff-path/?id=c0000000000t&service=pidgin&pageType=topic'} | ${mockAgent} | ${{ 'ctx-service-env': 'test' }}
      ${'test'}   | ${`${url}?renderer_env=live`} | ${'https://mock-bff-path/?id=c0000000000t&service=pidgin&pageType=topic'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
      ${'live'}   | ${url}                        | ${'https://mock-bff-path/?id=c0000000000t&service=pidgin&pageType=topic'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
    `(
      'when environment is $environment and pathname is $pathname, should invoke the BFF with the expected params',
      async ({ environment, path, agent, optHeaders, pathname }) => {
        const fetchPageDataSpy = jest.spyOn(fetchPageData, 'default');
        process.env.SIMORGH_APP_ENV = environment;

        await fetchDataFromBFF({
          pathname,
          pageType: TOPIC_PAGE,
          service: 'pidgin',
        });

        expect(fetchPageDataSpy).toHaveBeenCalledWith({
          pageType: TOPIC_PAGE,
          path,
          agent,
          optHeaders,
        });
      },
    );
  });

  describe('for a most read page', () => {
    const url = '/pidgin/popular/read';

    it.each`
      environment | pathname                      | path                                                                     | agent        | optHeaders
      ${'local'}  | ${url}                        | ${'http://localhost/pidgin/mostread'}                                    | ${undefined} | ${undefined}
      ${'local'}  | ${`${url}?renderer_env=test`} | ${'https://mock-bff-path/?id=mostRead&service=pidgin&pageType=mostRead'} | ${mockAgent} | ${{ 'ctx-service-env': 'test' }}
      ${'local'}  | ${`${url}?renderer_env=live`} | ${'https://mock-bff-path/?id=mostRead&service=pidgin&pageType=mostRead'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
      ${'test'}   | ${url}                        | ${'https://mock-bff-path/?id=mostRead&service=pidgin&pageType=mostRead'} | ${mockAgent} | ${{ 'ctx-service-env': 'test' }}
      ${'test'}   | ${`${url}?renderer_env=live`} | ${'https://mock-bff-path/?id=mostRead&service=pidgin&pageType=mostRead'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
      ${'live'}   | ${url}                        | ${'https://mock-bff-path/?id=mostRead&service=pidgin&pageType=mostRead'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
    `(
      'when environment is $environment and pathname is $pathname, should invoke the BFF with the expected params',
      async ({ environment, path, agent, optHeaders, pathname }) => {
        const fetchPageDataSpy = jest.spyOn(fetchPageData, 'default');
        process.env.SIMORGH_APP_ENV = environment;

        await fetchDataFromBFF({
          pathname,
          pageType: MOST_READ_PAGE,
          service: 'pidgin',
        });

        expect(fetchPageDataSpy).toHaveBeenCalledWith({
          pageType: MOST_READ_PAGE,
          path,
          agent,
          optHeaders,
        });
      },
    );
  });

  describe('for a home page', () => {
    const url = '/pidgin';

    it.each`
      environment | pathname                      | path                                                                     | agent        | optHeaders
      ${'local'}  | ${url}                        | ${'http://localhost/pidgin/tipohome'}                                    | ${undefined} | ${undefined}
      ${'local'}  | ${`${url}?renderer_env=test`} | ${'https://mock-bff-path/?id=c93v2kkz841t&service=pidgin&pageType=home'} | ${mockAgent} | ${{ 'ctx-service-env': 'test' }}
      ${'local'}  | ${`${url}?renderer_env=live`} | ${'https://mock-bff-path/?id=ck3yk9nz25qt&service=pidgin&pageType=home'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
      ${'test'}   | ${url}                        | ${'https://mock-bff-path/?id=c93v2kkz841t&service=pidgin&pageType=home'} | ${mockAgent} | ${{ 'ctx-service-env': 'test' }}
      ${'test'}   | ${`${url}?renderer_env=live`} | ${'https://mock-bff-path/?id=ck3yk9nz25qt&service=pidgin&pageType=home'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
      ${'live'}   | ${url}                        | ${'https://mock-bff-path/?id=ck3yk9nz25qt&service=pidgin&pageType=home'} | ${mockAgent} | ${{ 'ctx-service-env': 'live' }}
    `(
      'when environment is $environment and pathname is $pathname, should invoke the BFF with the expected params',
      async ({ environment, path, agent, optHeaders, pathname }) => {
        const fetchPageDataSpy = jest.spyOn(fetchPageData, 'default');
        process.env.SIMORGH_APP_ENV = environment;

        await fetchDataFromBFF({
          pathname,
          pageType: HOME_PAGE,
          service: 'pidgin',
        });

        expect(fetchPageDataSpy).toHaveBeenCalledWith({
          pageType: HOME_PAGE,
          path,
          agent,
          optHeaders,
        });
      },
    );
  });
});
