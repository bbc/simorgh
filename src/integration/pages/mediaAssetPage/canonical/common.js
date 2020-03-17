import {
  runFooterTests,
  runCommonSeoTests,
  runCommonA11yTests,
  runCommonAnalyticsTests,
  runChartbeatTests,
} from '../../../common/canonical';
import { MEDIA_ASSET_PAGE_URL } from '../../../pageUrls';

export default () => {
  describe('Common', () => {
    runCommonAnalyticsTests({
      pageUrl: MEDIA_ASSET_PAGE_URL,
    });

    runCommonSeoTests({
      pageUrl: MEDIA_ASSET_PAGE_URL,
      pageTitle: `Hari perempuan internasional: Bergulat demi kebebasan perempuan - BBC News Indonesia`,
      canonicalUrl: 'http://localhost/indonesia/indonesia-51772194',
      language: 'id',
    });

    runCommonA11yTests({ pageUrl: MEDIA_ASSET_PAGE_URL });

    runChartbeatTests({ pageUrl: MEDIA_ASSET_PAGE_URL });

    runFooterTests({
      pageUrl: MEDIA_ASSET_PAGE_URL,
      copyrightText: `© 2020 BBC. BBC tidak bertanggung jawab atas konten dari situs eksternal. Baca tentang peraturan baru terkait link eksternal.`,
      brandingText: 'BBC News, Indonesia',
      brandingLink: '/indonesia',
    });
  });
};
