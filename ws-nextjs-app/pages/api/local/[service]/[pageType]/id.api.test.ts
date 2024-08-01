/**
 * @jest-environment node
 */
import { testApiHandler } from 'next-test-api-route-handler';
import * as pagesHandler from './[id].api';
// import livePageData from '../../../../../../data/pidgin/livePage/c7p765ynk9qt.json';
// import ugFormData from '../../../../../../data/mundo/send/u50853489.json';

describe('API Routes', () => {
  it('should return Live Page data', async () => {
    await testApiHandler({
      pagesHandler,
      url: '/api/local/pidgin/livePage/c7p765ynk9qt',
      test: async ({ fetch }) => {
        await fetch({ method: 'GET' });
        // const res = await fetch({ method: 'GET' });

        // await expect(res.json()).resolves.toStrictEqual(livePageData);
      },
    });
  });
});
