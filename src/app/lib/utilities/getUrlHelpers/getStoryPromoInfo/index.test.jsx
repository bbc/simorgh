import { getAssetTypeCode, getHeadlineUrlAndLive } from '.';

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
      categoryId: 'http://www.bbc.co.uk/ontologies/applicationlogic-news/News',
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
          getHeadlineUrlAndLive(assetTypeCode, getAssetTypeCode(assetTypeCode)),
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
        expect(getHeadlineUrlAndLive(noUrl, getAssetTypeCode(noUrl))).toEqual({
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
        expect(getHeadlineUrlAndLive(noUrl, getAssetTypeCode(noUrl))).toEqual({
          headline:
            "BBC'nin 60 yıllık Türkiye arşivlerini izleyicilerimizle buluşturuyoruz",
          url: null,
          isLive: undefined,
        });
      });
    });
  });
});
