/**
 * @jest-environment node
 */
import { testApiHandler } from 'next-test-api-route-handler';
import * as pagesHandler from './[...id].api';
import livePageData from '../../../../data/pidgin/livePage/c7p765ynk9qt.json';
import dualScriptLivePageData from '../../../../data/zhongwen/livePage/c0000000000t/simp.json';
import ugFormData from '../../../../data/mundo/send/u50853489.json';

describe('API Routes', () => {
  it('should return Live Page data', async () => {
    await testApiHandler({
      pagesHandler,
      params: {
        id: ['pidgin', 'live', 'c7p765ynk9qt'],
      },
      test: async ({ fetch }) => {
        await fetch({ method: 'GET' });
        const res = await fetch({ method: 'GET' });

        expect(res.status).toEqual(200);
        await expect(res.json()).resolves.toStrictEqual(livePageData);
      },
    });
  });

  it('should return Live Page data for a dual script service', async () => {
    await testApiHandler({
      pagesHandler,
      params: {
        id: ['zhongwen', 'simp', 'live', 'c0000000000t'],
      },
      test: async ({ fetch }) => {
        await fetch({ method: 'GET' });
        const res = await fetch({ method: 'GET' });

        expect(res.status).toEqual(200);
        await expect(res.json()).resolves.toStrictEqual(dualScriptLivePageData);
      },
    });
  });

  it('should return UGC Uploader form data', async () => {
    await testApiHandler({
      pagesHandler,
      params: {
        id: ['mundo', 'send', 'u50853489'],
      },
      test: async ({ fetch }) => {
        await fetch({ method: 'GET' });
        const res = await fetch({ method: 'GET' });

        expect(res.status).toEqual(200);
        await expect(res.json()).resolves.toStrictEqual(ugFormData);
      },
    });
  });

  it('should return a 500 when the requested fixture does not exist', async () => {
    await testApiHandler({
      pagesHandler,
      params: {
        id: ['swahili', 'invalidType', 'u50853489'],
      },
      test: async ({ fetch }) => {
        await fetch({ method: 'GET' });
        const res = await fetch({ method: 'GET' });

        expect(res.status).toEqual(500);
        await expect(res.json()).resolves.toEqual(
          expect.objectContaining({
            error: expect.stringMatching(/Failed to load data\..*/),
          }),
        );
      },
    });
  });

  it('should return a 500 for a path with an invalid length', async () => {
    await testApiHandler({
      pagesHandler,
      params: {
        id: [
          'zhongwen',
          'simp',
          'live',
          'c0000000000t',
          'other',
          'path',
          'parts',
        ],
      },
      test: async ({ fetch }) => {
        await fetch({ method: 'GET' });
        const res = await fetch({ method: 'GET' });

        expect(res.status).toEqual(500);
        await expect(res.json()).resolves.toEqual(
          expect.objectContaining({
            error: 'Failed to load data. Error: Invalid file path.',
          }),
        );
      },
    });
  });
});
