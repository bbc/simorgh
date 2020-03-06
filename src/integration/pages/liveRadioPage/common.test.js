import { runFooterTests, runCommonSeoTests } from '../../common';
import { LIVE_RADIO_PAGE_URL } from '../../pageUrls';

runCommonSeoTests({
  pageUrl: LIVE_RADIO_PAGE_URL,
  pageTitle: 'BBC 코리아 라디오 - BBC News 코리아',
});

runFooterTests({
  pageUrl: LIVE_RADIO_PAGE_URL,
  copyrightText:
    '© 2020 BBC. BBC는 외부 인터넷 사이트 및 콘텐츠에 대한 책임을 지지않습니다. 외부 콘텐츠 링크에 대한 본사 정책 보기.',
  brandingText: 'BBC News, 코리아',
  brandingLink: '/korean',
});
