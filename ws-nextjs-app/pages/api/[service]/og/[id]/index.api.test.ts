/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler';

import * as fetchPageData from '#app/routes/utils/fetchPageData';
import api from './index.api';

jest.mock('next/og', () => {
  return {
    ImageResponse: jest.fn().mockImplementation(() => {
      return new Response('mocked image response', {
        status: 200,
      });
    }),
  };
});

jest.mock('#app/routes/utils/fetchPageData');

describe.skip('GET /api/og', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a 200 response with valid article id and service', async () => {
    jest.spyOn(fetchPageData, 'default').mockResolvedValue({
      status: 200,
      json: {},
    });

    await testApiHandler({
      pagesHandler: api,
      params: {
        service: 'pidgin',
        id: 'czjnnk9m8vdo',
      },
      test: async ({ fetch }) => {
        const res = await fetch();

        expect(res.status).toEqual(200);
      },
    });
  });

  // it('should return a 200 response with valid live id and service', async () => {
  //   jest.spyOn(fetchPageData, 'default').mockResolvedValue({
  //     status: 200,
  //     json: {},
  //   });

  //   await testApiHandler({
  //     pagesHandler: api,
  //     params: {
  //       service: 'mundo',
  //       id: 'cemn2qq3x8vt',
  //     },
  //     test: async ({ fetch }) => {
  //       await fetch({ method: 'GET' });
  //       const res = await fetch({ method: 'GET' });

  //       expect(res.status).toEqual(200);
  //     },
  //   });
  // });

  // it('should return a 404 response when id is missing', async () => {
  //   await testApiHandler({
  //     pagesHandler: api,
  //     params: {
  //       service: 'pidgin',
  //     },
  //     test: async ({ fetch }) => {
  //       await fetch({ method: 'GET' });
  //       const res = await fetch({ method: 'GET' });

  //       expect(res.status).toEqual(404);
  //     },
  //   });
  // });

  // it('should return a 404 response when service is missing', async () => {
  //   await testApiHandler({
  //     pagesHandler: api,
  //     params: {
  //       id: 'czjnnk9m8vdo',
  //     },
  //     test: async ({ fetch }) => {
  //       await fetch({ method: 'GET' });
  //       const res = await fetch({ method: 'GET' });

  //       expect(res.status).toEqual(404);
  //     },
  //   });
  // });

  // it('should return a 404 response when id is not an article or live id pattern', async () => {
  //   await testApiHandler({
  //     pagesHandler: api,
  //     params: {
  //       id: '123',
  //       service: 'pidgin',
  //     },
  //     test: async ({ fetch }) => {
  //       await fetch({ method: 'GET' });
  //       const res = await fetch({ method: 'GET' });

  //       expect(res.status).toEqual(404);
  //     },
  //   });
  // });

  // it('should return a 500 response when page data fetch returns 500', async () => {
  //   jest.spyOn(fetchPageData, 'default').mockResolvedValue({
  //     status: 500,
  //     json: {},
  //   });

  //   await testApiHandler({
  //     pagesHandler: api,
  //     params: {
  //       id: 'czjnnk9m8vdo',
  //       service: 'pidgin',
  //     },
  //     test: async ({ fetch }) => {
  //       await fetch({ method: 'GET' });
  //       const res = await fetch({ method: 'GET' });

  //       expect(res.status).toEqual(500);
  //     },
  //   });
  // });
});
