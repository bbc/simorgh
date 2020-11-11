/* eslint-disable import/named */
import {
  getBrandedImage,
  getEmbedUrl,
  getLocalMostReadEndpoint,
  getMostReadEndpoint,
  getMasterBrand,
  getRadioScheduleEndpoint,
  getLocalRadioScheduleEndpoint,
  getSecondaryColumnUrl,
  getAssetTypeCode,
  getHeadlineUrlAndLive,
} from '.';

describe('getUrlHelpers', () => {
  describe('getEmbedUrl', () => {
    const mediaId = 'foo/bar';
    const legacyId = 'russian/multimedia/2016/05/160505_v_diving_record/123/ru';
    const liveOverrideParam = '?renderer_env=live';
    const testOverrideParam = '?renderer_env=test';
    const embedUrlLiveOverride = '?morph_env=live';

    const setEnvironment = environment => {
      process.env.SIMORGH_APP_ENV = environment;
    };

    const testCases = [
      {
        description: `should build a CANONICAL url for articles in test environment`,
        expected: `https://test.bbc.com/ws/av-embeds/articles/${mediaId}`,
        environment: 'test',
        before: setEnvironment,
        embedObject: {
          mediaId,
          type: 'articles',
          queryString: '',
        },
      },
      {
        description: `should build an AMP url for articles in test environment`,
        expected: `https://polling.test.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
        environment: 'test',
        before: setEnvironment,
        embedObject: {
          isAmp: true,
          mediaId,
          type: 'articles',
          queryString: '',
        },
      },
      {
        description: `should build a CANONICAL url for articles in test environment with test override`,
        expected: `https://test.bbc.com/ws/av-embeds/articles/${mediaId}`,
        environment: 'test',
        before: setEnvironment,
        embedObject: {
          mediaId,
          type: 'articles',
          queryString: testOverrideParam,
        },
      },
      {
        description: `should build an AMP url for articles in test environment with test override`,
        expected: `https://polling.test.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
        environment: 'test',
        before: setEnvironment,
        embedObject: {
          isAmp: true,
          mediaId,
          type: 'articles',
          queryString: testOverrideParam,
        },
      },
      {
        description: `should build a CANONICAL url for articles in test environment with live override`,
        expected: `https://test.bbc.com/ws/av-embeds/articles/${mediaId}${embedUrlLiveOverride}`,
        environment: 'test',
        before: setEnvironment,
        embedObject: {
          mediaId,
          type: 'articles',
          queryString: liveOverrideParam,
        },
      },
      {
        description: `should build an AMP url for articles in test environment with live override`,
        expected: `https://polling.test.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp${embedUrlLiveOverride}`,
        environment: 'test',
        before: setEnvironment,
        embedObject: {
          isAmp: true,
          mediaId,
          type: 'articles',
          queryString: liveOverrideParam,
        },
      },
      {
        description: `should build a CANONICAL url for on-demand/live radio in test environment with live override`,
        expected: `https://test.bbc.com/ws/av-embeds/media/${mediaId}${embedUrlLiveOverride}`,
        environment: 'test',
        before: setEnvironment,
        embedObject: {
          mediaId,
          type: 'media',
          queryString: '',
        },
      },
      {
        description: `should build an AMP url for on-demand/live radio in test environment with live override`,
        expected: `https://polling.test.bbc.co.uk/ws/av-embeds/media/${mediaId}/amp${embedUrlLiveOverride}`,
        environment: 'test',
        before: setEnvironment,
        embedObject: {
          isAmp: true,
          mediaId,
          type: 'media',
          queryString: '',
        },
      },
      {
        description: `should build a CANONICAL url for articles in live environment`,
        expected: `https://bbc.com/ws/av-embeds/articles/${mediaId}`,
        environment: 'live',
        before: setEnvironment,
        embedObject: {
          mediaId,
          type: 'articles',
          queryString: '',
        },
      },
      {
        description: `should build an AMP url for articles in live environment`,
        expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
        environment: 'live',
        before: setEnvironment,
        embedObject: {
          isAmp: true,
          mediaId,
          type: 'articles',
          queryString: '',
        },
      },
      {
        description: `should build a CANONICAL url for articles in live environment with test override`,
        expected: `https://bbc.com/ws/av-embeds/articles/${mediaId}`,
        environment: 'live',
        before: setEnvironment,
        embedObject: {
          mediaId,
          type: 'articles',
          queryString: testOverrideParam,
        },
      },
      {
        description: `should build an AMP url for articles in live environment with test override`,
        expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
        environment: 'live',
        before: setEnvironment,
        embedObject: {
          isAmp: true,
          mediaId,
          type: 'articles',
          queryString: testOverrideParam,
        },
      },
      {
        description: `should build a CANONICAL url for articles in live environment with live override`,
        expected: `https://bbc.com/ws/av-embeds/articles/${mediaId}`,
        environment: 'live',
        before: setEnvironment,
        embedObject: {
          mediaId,
          type: 'articles',
          queryString: liveOverrideParam,
        },
      },
      {
        description: `should build an AMP url for articles in live environment with live override`,
        expected: `https://polling.bbc.co.uk/ws/av-embeds/articles/${mediaId}/amp`,
        environment: 'live',
        before: setEnvironment,
        embedObject: {
          isAmp: true,
          mediaId,
          type: 'articles',
          queryString: liveOverrideParam,
        },
      },
      {
        description: `should build a CANONICAL url for legacy media in live environment with live override`,
        expected: `https://bbc.com/ws/av-embeds/legacy/${legacyId}`,
        environment: 'live',
        before: setEnvironment,
        embedObject: {
          mediaId: legacyId,
          type: 'legacy',
          queryString: liveOverrideParam,
        },
      },
      {
        description: `should build an AMP url for legacy media in live environment with live override`,
        expected: `https://polling.bbc.co.uk/ws/av-embeds/legacy/${legacyId}/amp`,
        environment: 'live',
        before: setEnvironment,
        embedObject: {
          isAmp: true,
          mediaId: legacyId,
          type: 'legacy',
          queryString: liveOverrideParam,
        },
      },
      {
        description: `should build a CANONICAL url for legacy media in test environment with no override`,
        expected: `https://test.bbc.com/ws/av-embeds/legacy/${legacyId}`,
        environment: 'test',
        before: setEnvironment,
        embedObject: {
          mediaId: legacyId,
          type: 'legacy',
          queryString: '',
        },
      },
      {
        description: `should build an AMP url for legacy media in test environment with no override`,
        expected: `https://polling.test.bbc.co.uk/ws/av-embeds/legacy/${legacyId}/amp`,
        environment: 'test',
        before: setEnvironment,
        embedObject: {
          isAmp: true,
          mediaId: legacyId,
          type: 'legacy',
          queryString: '',
        },
      },
    ];

    describe('Media Player: Embed URL', () => {
      testCases.forEach(
        ({ description, expected, before, environment, embedObject }) => {
          it(description, () => {
            before(environment);
            expect(getEmbedUrl(embedObject)).toEqual(expected);
          });
        },
      );
      afterAll(() => {
        delete process.env.SIMORGH_APP_ENV;
      });
    });
  });
  describe('getBrandedImage', () => {
    afterEach(() => {
      delete process.env.SIMORGH_ICHEF_BASE_URL;
    });

    it('should return branded image for test', () => {
      process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';

      const locator = '729E/test/_63724392_gettyimages-1098075358.jpg';
      const service = 'pidgin';
      const actual = getBrandedImage(locator, service);
      const expected =
        'https://ichef.test.bbci.co.uk/news/1024/branded_pidgin/729E/test/_63724392_gettyimages-1098075358.jpg';

      expect(actual).toEqual(expected);
    });

    it('should return branded image for local', () => {
      process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';

      const locator = '729E/test/_63724392_gettyimages-1098075358.jpg';
      const service = 'igbo';
      const actual = getBrandedImage(locator, service);
      const expected =
        'https://ichef.test.bbci.co.uk/news/1024/branded_igbo/729E/test/_63724392_gettyimages-1098075358.jpg';

      expect(actual).toEqual(expected);
    });

    it('should return branded image for production', () => {
      process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.bbci.co.uk';

      const locator = '729E/test/_63724392_gettyimages-1098075358.jpg';
      const service = 'korean';
      const actual = getBrandedImage(locator, service);
      const expected =
        'https://ichef.bbci.co.uk/news/1024/branded_korean/729E/test/_63724392_gettyimages-1098075358.jpg';

      expect(actual).toEqual(expected);
    });
  });
  describe('getMostReadEndpoint', () => {
    describe('getMostReadEndpoint', () => {
      it('should return endpoint when passed service', () => {
        expect(getMostReadEndpoint({ service: 'hausa' })).toBe(
          '/hausa/mostread.json',
        );
      });
      it('should return endpoint when passed service and variant', () => {
        expect(
          getMostReadEndpoint({ service: 'serbian', variant: 'lat' }),
        ).toBe('/serbian/mostread/lat.json');
      });
    });
    describe('getLocalMostReadEndpoint', () => {
      it('should return endpoint when passed service', () => {
        expect(getLocalMostReadEndpoint({ service: 'hausa' })).toBe(
          './data/hausa/mostRead/index.json',
        );
      });
      it('should return endpoint when passed service & variant', () => {
        expect(
          getLocalMostReadEndpoint({
            service: 'serbian',
            variant: 'lat',
          }),
        ).toBe('./data/serbian/mostRead/lat.json');
      });
    });
  });
  describe('getMasterBrand', () => {
    const brand = 'brand';
    const assetId = 'liveradio';

    it('should find value', () => {
      const masterbrand = getMasterBrand('liveradio', {
        masterBrand: {
          liveradio: brand,
        },
      });
      expect(masterbrand).toBe(brand);
    });

    it('should not find value and use external id', () => {
      const masterbrand = getMasterBrand(assetId, {
        masterBrand: {
          nothing: brand,
        },
      });
      expect(masterbrand).toBe(assetId);
    });
  });
  describe('getRadioScheduleEndpoint', () => {
    describe('getRadioScheduleEndpoint', () => {
      it('should return endpoint when passed service', () => {
        expect(getRadioScheduleEndpoint({ service: 'hausa' })).toBe(
          '/hausa/bbc_hausa_radio/schedule.json',
        );
      });
      it('should return endpoint when passed base URL and service', () => {
        expect(
          getRadioScheduleEndpoint({ service: 'hausa', baseUrl: 'bbc.com' }),
        ).toBe('bbc.com/hausa/bbc_hausa_radio/schedule.json');
      });
      it('should return endpoint when passed service & radioService', () => {
        expect(
          getRadioScheduleEndpoint({
            service: 'persian',
            radioService: 'dari',
          }),
        ).toBe('/persian/bbc_dari_radio/schedule.json');
      });
      describe('query param override', () => {
        it('should always return endpoint without query string on live', () => {
          expect(
            getRadioScheduleEndpoint({
              service: 'hausa',
              queryString: '?renderer_env=live',
              env: 'live',
            }),
          ).toBe('/hausa/bbc_hausa_radio/schedule.json');
        });
        it('should return endpoint with query string on test', () => {
          expect(
            getRadioScheduleEndpoint({
              service: 'hausa',
              queryString: '?renderer_env=live',
              env: 'test',
            }),
          ).toBe('/hausa/bbc_hausa_radio/schedule.json?renderer_env=live');
        });
        it('should return endpoint with query string on local', () => {
          expect(
            getRadioScheduleEndpoint({
              service: 'hausa',
              queryString: '?renderer_env=live',
              env: 'local',
            }),
          ).toBe('/hausa/bbc_hausa_radio/schedule.json?renderer_env=live');
        });
        it('should return with query string when passed service & radioService', () => {
          expect(
            getRadioScheduleEndpoint({
              service: 'persian',
              radioService: 'dari',
              queryString: '?renderer_env=live',
              env: 'test',
            }),
          ).toBe('/persian/bbc_dari_radio/schedule.json?renderer_env=live');
        });
      });
    });

    describe('getLocalRadioScheduleEndpoint', () => {
      it('should return endpoint when passed service', () => {
        expect(getLocalRadioScheduleEndpoint({ service: 'hausa' })).toBe(
          './data/hausa/bbc_hausa_radio/schedule.json',
        );
      });
      it('should return endpoint when passed service & radioService', () => {
        expect(
          getLocalRadioScheduleEndpoint({
            service: 'persian',
            radioService: 'dari',
          }),
        ).toBe('./data/persian/bbc_dari_radio/schedule.json');
      });
    });
  });
  describe('getSecondaryColumnEndpoint', () => {
    it('should return endpoint when passed service', () => {
      expect(getSecondaryColumnUrl({ service: 'mundo' })).toBe(
        '/mundo/sty-secondary-column',
      );
    });
    it('should return endpoint when passed service and variant', () => {
      expect(
        getSecondaryColumnUrl({ service: 'zhongwen', variant: 'trad' }),
      ).toBe('/zhongwen/sty-secondary-column/trad');
    });
  });
  describe('getStoryPromoInfo', () => {
    const assetTypeCode = {
      name:
        "BBC'nin 60 yıllık Türkiye arşivlerini izleyicilerimizle buluşturuyoruz",
      summary: '',
      indexImage: {
        id: '98847234',
        subType: 'index',
        href:
          'http://c.files.bbci.co.uk/A90A/production/_98847234_istanbul.eski.jpg',
        path: '/cpsprodpb/A90A/production/_98847234_istanbul.eski.jpg',
        height: 1152,
        width: 2048,
        altText: 'Eski İstanbul fotoğrafı',
        copyrightHolder: 'Getty',
      },
      uri: 'http://www.bbc.com/turkce/haberler-turkiye-42068713',
      contentType: 'Text',
      assetTypeCode: 'PRO',
      timestamp: 1511275692000,
      type: 'link',
    };

    const noAssetTypeCode = {
      headlines: {
        headline:
          "Fotoğraflarla: Almanya'da iklim aktivistleri açık kömür madenine girdi",
      },
      locators: {
        assetUri: '/turkce/haberler-dunya-48735662',
        cpsUrn: 'urn:bbc:content:assetUri:turkce/haberler-dunya-48735662',
      },
      summary:
        'Garzweiler açık maden ocağına koruyucu kıyafetlerle giren protestocuları güvenlik güçleri durdurmaya çalıştı. Hükümetin fosil yakıtlara karşı adımlarını yetersiz bulan eylemciler, yasak olmasına rağmen polis kordonunu aşarak madenin etrafına dağıldı.',
      timestamp: 1561292979000,
      passport: {
        category: {
          categoryId:
            'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
          categoryName: 'News',
        },
        campaigns: [
          {
            campaignId: '5a988e4739461b000e9dabfc',
            campaignName: 'WS - Update me',
          },
        ],
      },
      cpsType: 'STY',
      indexImage: {
        id: '107503429',
        subType: 'index',
        href:
          'http://c.files.bbci.co.uk/1690E/production/_107503429_mediaitem107503428.jpg',
        path: '/cpsprodpb/1690E/production/_107503429_mediaitem107503428.jpg',
        height: 1152,
        width: 2048,
        altText: 'protesters in Garzweiler',
        copyrightHolder: 'Reuters',
      },
      options: {
        isBreakingNews: false,
        isFactCheck: false,
      },
      overtypedSummary: ' ',
      id: 'urn:bbc:ares::asset:turkce/haberler-dunya-48735662',
      type: 'cps',
    };

    describe('getStoryPromoInfo', () => {
      describe('assertions', () => {
        describe('getAssetTypeCode', () => {
          it('should return the assetTypeCode that is present', () => {
            expect(getAssetTypeCode(assetTypeCode)).toEqual('PRO');
          });

          it('should return null if the assetTypeCode is not present', () => {
            expect(getAssetTypeCode(noAssetTypeCode)).toEqual(null);
          });
        });

        describe('getHeadlineUrlAndLive', () => {
          it('should return the correct headline, url and null for assetTypeCode', () => {
            expect(
              getHeadlineUrlAndLive(
                assetTypeCode,
                getAssetTypeCode(assetTypeCode),
              ),
            ).toEqual({
              headline:
                "BBC'nin 60 yıllık Türkiye arşivlerini izleyicilerimizle buluşturuyoruz",
              url: 'http://www.bbc.com/turkce/haberler-turkiye-42068713',
              isLive: undefined,
            });
          });

          it('should return the correct headline, url and isLive for noAssetTypeCode', () => {
            expect(
              getHeadlineUrlAndLive(
                noAssetTypeCode,
                getAssetTypeCode(noAssetTypeCode),
              ),
            ).toEqual({
              headline:
                "Fotoğraflarla: Almanya'da iklim aktivistleri açık kömür madenine girdi",
              url: '/turkce/haberler-dunya-48735662',
              isLive: false,
            });
          });

          it('should return the correct headline, url and isLive for live asset', () => {
            const liveAsset = { ...noAssetTypeCode, cpsType: 'LIV' };
            expect(
              getHeadlineUrlAndLive(liveAsset, getAssetTypeCode(liveAsset)),
            ).toEqual({
              headline:
                "Fotoğraflarla: Almanya'da iklim aktivistleri açık kömür madenine girdi",
              url: '/turkce/haberler-dunya-48735662',
              isLive: true,
            });
          });

          it('should return null if headline is missing no asset type code', () => {
            const noHeadline = { ...noAssetTypeCode, headlines: undefined };
            expect(
              getHeadlineUrlAndLive(noHeadline, getAssetTypeCode(noHeadline)),
            ).toEqual({
              headline: null,
              url: '/turkce/haberler-dunya-48735662',
              isLive: false,
            });
          });

          it('should return null if url is missing no asset type code', () => {
            const noUrl = { ...noAssetTypeCode, locators: undefined };
            expect(
              getHeadlineUrlAndLive(noUrl, getAssetTypeCode(noUrl)),
            ).toEqual({
              headline:
                "Fotoğraflarla: Almanya'da iklim aktivistleri açık kömür madenine girdi",
              url: null,
              isLive: false,
            });
          });

          it('should return null if headline is missing asset type code', () => {
            const noHeadline = { ...assetTypeCode, name: undefined };
            expect(
              getHeadlineUrlAndLive(noHeadline, getAssetTypeCode(noHeadline)),
            ).toEqual({
              headline: null,
              url: 'http://www.bbc.com/turkce/haberler-turkiye-42068713',
              isLive: undefined,
            });
          });

          it('should return null if url is missing asset type code', () => {
            const noUrl = { ...assetTypeCode, uri: undefined };
            expect(
              getHeadlineUrlAndLive(noUrl, getAssetTypeCode(noUrl)),
            ).toEqual({
              headline:
                "BBC'nin 60 yıllık Türkiye arşivlerini izleyicilerimizle buluşturuyoruz",
              url: null,
              isLive: undefined,
            });
          });
        });
      });
    });
  });
});
