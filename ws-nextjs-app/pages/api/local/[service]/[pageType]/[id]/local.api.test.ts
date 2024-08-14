/**
 * @jest-environment node
 */
import { testApiHandler } from 'next-test-api-route-handler';
import * as pagesHandler from './[[...optionalParams]].api';
import livePageData from '../../../../../../../data/pidgin/live/c7p765ynk9qt.json';
import dualScriptLivePageData from '../../../../../../../data/zhongwen/live/c0000000000t/simp.json';
import ugFormData from '../../../../../../../data/mundo/send/u50853489.json';
import russianAvEmbedData from '../../../../../../../data/russian/av-embeds/features-49881797.json';
import russianAvEmbedDataWithPid from '../../../../../../../data/russian/av-embeds/features-49881797/pid/p07q3wwl.json';

describe('API Routes', () => {
  it('should return Live Page data', async () => {
    await testApiHandler({
      pagesHandler,
      params: {
        service: 'pidgin',
        pageType: 'live',
        id: 'c7p765ynk9qt',
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
        service: 'zhongwen',
        pageType: 'live',
        id: 'c0000000000t',
        optionalParams: ['simp'],
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
        service: 'mundo',
        pageType: 'send',
        id: 'u50853489',
      },
      test: async ({ fetch }) => {
        await fetch({ method: 'GET' });
        const res = await fetch({ method: 'GET' });

        expect(res.status).toEqual(200);
        await expect(res.json()).resolves.toStrictEqual(ugFormData);
      },
    });
  });

  it('should return AV Embeds data', async () => {
    await testApiHandler({
      pagesHandler,
      params: {
        service: 'russian',
        pageType: 'av-embeds',
        id: 'features-49881797',
      },
      test: async ({ fetch }) => {
        await fetch({ method: 'GET' });
        const res = await fetch({ method: 'GET' });

        expect(res.status).toEqual(200);
        await expect(res.json()).resolves.toStrictEqual(russianAvEmbedData);
      },
    });
  });

  it('should return AV Embeds data with specific media ID', async () => {
    await testApiHandler({
      pagesHandler,
      params: {
        service: 'russian',
        pageType: 'av-embeds',
        id: 'features-49881797',
        optionalParams: ['pid', 'p07q3wwl'],
      },
      test: async ({ fetch }) => {
        await fetch({ method: 'GET' });
        const res = await fetch({ method: 'GET' });

        expect(res.status).toEqual(200);
        await expect(res.json()).resolves.toStrictEqual(
          russianAvEmbedDataWithPid,
        );
      },
    });
  });

  it('should return a 500 when the requested fixture does not exist', async () => {
    await testApiHandler({
      pagesHandler,
      params: {
        service: 'swahili',
        pageType: 'invalidType',
        id: 'u50853489',
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
});
