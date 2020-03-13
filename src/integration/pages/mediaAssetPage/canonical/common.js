import {
  runFooterTests,
  runCommonSeoTests,
  runCommonA11yTests,
  runCommonAnalyticsTests,
} from '../../../common/canonical';
import { MEDIA_ASSET_PAGE_URL } from '../../../pageUrls';

export default () => {
  describe('Common', () => {
    runCommonAnalyticsTests({
      pageUrl: MEDIA_ASSET_PAGE_URL,
    });

    runCommonSeoTests({
      pageUrl: MEDIA_ASSET_PAGE_URL,
      pageTitle: `Konflik Iran-AS: Lima penyebab krisis tak kunjung usai - BBC News Indonesia`,
      canonicalUrl: 'http://localhost/indonesia/media-51102836',
      language: 'id',
    });

    runCommonA11yTests({ pageUrl: MEDIA_ASSET_PAGE_URL });

    runFooterTests({
      pageUrl: MEDIA_ASSET_PAGE_URL,
      copyrightText: `© 2020 BBC. BBC tidak bertanggung jawab atas konten dari situs eksternal. Baca tentang peraturan baru terkait link eksternal.`,
      brandingText: 'BBC News, Indonesia',
      brandingLink: '/indonesia',
    });
  });
};
