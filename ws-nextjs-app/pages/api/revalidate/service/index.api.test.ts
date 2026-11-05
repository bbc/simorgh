/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler';
import * as pagesHandler from './index.api';

describe('POST /api/revalidate/service', () => {
  const originalSecret = process.env.SIMORGH_ISR_REVALIDATE_SECRET;

  beforeEach(() => {
    process.env.SIMORGH_ISR_REVALIDATE_SECRET = 'test-secret';
  });

  afterAll(() => {
    process.env.SIMORGH_ISR_REVALIDATE_SECRET = originalSecret;
  });

  it('returns 401 if token is invalid', async () => {
    await testApiHandler({
      pagesHandler,
      params: {
        service: 'pidgin',
      },
      test: async ({ fetch }) => {
        const response = await fetch({ method: 'POST' });

        expect(response.status).toEqual(401);
      },
    });
  });

  it('returns 400 if service is missing', async () => {
    await testApiHandler({
      pagesHandler,
      params: {
        secret: 'test-secret',
      },
      test: async ({ fetch }) => {
        const response = await fetch({ method: 'POST' });

        expect(response.status).toEqual(400);
      },
    });
  });

  it('returns 200 for a valid request', async () => {
    await testApiHandler({
      pagesHandler,
      params: {
        service: 'pidgin',
        secret: 'test-secret',
      },
      test: async ({ fetch }) => {
        const response = await fetch({ method: 'POST' });
        const data = await response.json();

        expect(response.status).toEqual(200);
        expect(data.invalidated).toEqual(true);
        expect(data.service).toEqual('pidgin');
        expect(data.invalidatedEntries).toEqual(expect.any(Number));
      },
    });
  });
});
