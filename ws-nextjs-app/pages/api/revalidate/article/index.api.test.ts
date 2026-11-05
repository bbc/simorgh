/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler';
import * as pagesHandler from './index.api';

describe('POST /api/revalidate/article', () => {
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
        assetId: 'cy4849j0jyzo',
      },
      test: async ({ fetch }) => {
        const response = await fetch({ method: 'POST' });

        expect(response.status).toEqual(401);
      },
    });
  });

  it('returns 400 if required params are missing', async () => {
    await testApiHandler({
      pagesHandler,
      params: {
        service: 'pidgin',
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
        assetId: 'cy4849j0jyzo',
        variant: 'cyr',
        secret: 'test-secret',
      },
      test: async ({ fetch }) => {
        const response = await fetch({ method: 'POST' });
        const data = await response.json();

        expect(response.status).toEqual(200);
        expect(data.revalidated).toEqual(true);
        expect(data.paths).toEqual([
          '/pidgin/articles/cy4849j0jyzo',
          '/pidgin/articles/cy4849j0jyzo/cyr',
        ]);
      },
    });
  });
});
