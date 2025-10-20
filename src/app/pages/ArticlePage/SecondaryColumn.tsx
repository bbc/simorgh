/** @jsx jsx */

import { jsx, useTheme, Theme, useMediaQuery } from '@emotion/react';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import { Article } from '#app/models/types/optimo';
import Curation from '#app/components/Curation';
import {
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
} from '#app/models/types/curationData';
import TopStoriesSection from './PagePromoSections/TopStoriesSection';
import styles from './ArticlePage.styles';

const adaptiveCurationsSectionStyles = ({ spacings, mq }: Theme) => ({
  marginBottom: `${spacings.TRIPLE}rem`,
  padding: `${spacings.DOUBLE}rem`,
  [mq.GROUP_4_MIN_WIDTH]: {
    display: 'none',
  },
});

const dummySimpleCurationGridContent = {
  summaries: [
    {
      type: 'video',
      duration: 'PT3M24S',
      isLive: false,
      title:
        'फ़ोन आने पर कोई ओटीपी की मांग करे तो ज़रा ठहरिए, ये स्कैम भी हो सकता है',
      firstPublished: '2025-10-17T11:28:34.142Z',
      lastPublished: '2025-10-17T11:28:34.142Z',
      link: 'https://www.bbc.com/hindi/articles/c5y9x8zl1p7o',
      imageUrl:
        'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/d185/live/1f7dab90-ab48-11f0-b2a1-6f537f66f9aa.jpg.webp',
      description:
        'फ्रॉड करने वालों ने एक नया रास्ता अपनाया है. ये कॉल करते हैं और सीधा ओटीपी की मांग करते हैं.\n',
      imageAlt: 'OTP से होने वाले स्कैम के बारे में समझिए',
      id: 'c5y9x8zl1p7o',
      readTime: 1,
    },
    {
      type: 'video',
      duration: 'PT3M24S',
      isLive: false,
      title:
        'फ़ोन आने पर कोई ओटीपी की मांग करे तो ज़रा ठहरिए, ये स्कैम भी हो सकता है',
      firstPublished: '2025-10-17T11:28:34.142Z',
      lastPublished: '2025-10-17T11:28:34.142Z',
      link: 'https://www.bbc.com/hindi/articles/c5y9x8zl1p7o',
      imageUrl:
        'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/d185/live/1f7dab90-ab48-11f0-b2a1-6f537f66f9aa.jpg.webp',
      description:
        'फ्रॉड करने वालों ने एक नया रास्ता अपनाया है. ये कॉल करते हैं और सीधा ओटीपी की मांग करते हैं.\n',
      imageAlt: 'OTP से होने वाले स्कैम के बारे में समझिए',
      id: 'c5y9x8zl1p7o',
      readTime: 1,
    },
    {
      type: 'video',
      duration: 'PT3M24S',
      isLive: false,
      title:
        'फ़ोन आने पर कोई ओटीपी की मांग करे तो ज़रा ठहरिए, ये स्कैम भी हो सकता है',
      firstPublished: '2025-10-17T11:28:34.142Z',
      lastPublished: '2025-10-17T11:28:34.142Z',
      link: 'https://www.bbc.com/hindi/articles/c5y9x8zl1p7o',
      imageUrl:
        'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/d185/live/1f7dab90-ab48-11f0-b2a1-6f537f66f9aa.jpg.webp',
      description:
        'फ्रॉड करने वालों ने एक नया रास्ता अपनाया है. ये कॉल करते हैं और सीधा ओटीपी की मांग करते हैं.\n',
      imageAlt: 'OTP से होने वाले स्कैम के बारे में समझिए',
      id: 'c5y9x8zl1p7o',
      readTime: 1,
    },
    {
      type: 'video',
      duration: 'PT3M24S',
      isLive: false,
      title:
        'फ़ोन आने पर कोई ओटीपी की मांग करे तो ज़रा ठहरिए, ये स्कैम भी हो सकता है',
      firstPublished: '2025-10-17T11:28:34.142Z',
      lastPublished: '2025-10-17T11:28:34.142Z',
      link: 'https://www.bbc.com/hindi/articles/c5y9x8zl1p7o',
      imageUrl:
        'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/d185/live/1f7dab90-ab48-11f0-b2a1-6f537f66f9aa.jpg.webp',
      description:
        'फ्रॉड करने वालों ने एक नया रास्ता अपनाया है. ये कॉल करते हैं और सीधा ओटीपी की मांग करते हैं.\n',
      imageAlt: 'OTP से होने वाले स्कैम के बारे में समझिए',
      id: 'c5y9x8zl1p7o',
      readTime: 1,
    },
  ],
  activePage: 1,
  pageCount: 40,
  link: 'https://www.bbc.com/hindi/topics/cw9kv0kpxydt',
  curationId: 'urn:bbc:vivo:curation:23b426a2-6119-4c26-9c6b-b19d468186fd',
  curationType: 'vivo-stream',
  position: 6,
  visualProminence: 'NORMAL',
  title: 'मल्टीमीडिया',
  visualStyle: 'FEED',
};
const dummyTvBulletinContent = {
  summaries: [
    {
      type: 'link',
      isLive: false,
      title: 'बीबीसी दुनिया देखने के लिए यहाँ क्लिक करें',
      firstPublished: '',
      lastPublished: '',
      link: 'https://www.bbc.com/hindi/bbc_hindi_tv/tv_programmes/w13xttlw',
      imageUrl:
        'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/c5f6/live/11c27630-24a7-11ef-a13a-0b8c563da930.png.webp',
      description:
        'देखिए सोमवार से शुक्रवार हर रात 10 बजे से BBC News Hindi  के होम पेज पर.',
      imageAlt: 'बीबीसी दुनिया देखने के लिए यहाँ क्लिक करें',
    },
  ],
  id: 'https%3A%2F%2Fwww.bbc.com%2Fkyrgyz%2Fbbc_kyrgyz_tv%2Ftv_programmes%2Fw13xttqx%3Flimit%3D4',
  visualProminence: 'MAXIMUM',
  activePage: 1,
  pageCount: 1,
  curationId: 'urn:bbc:tipo:list:2323cbdf-5d76-425c-94e0-fe743831ce17',
  curationType: 'tipo-curation',
  position: 7,
  visualStyle: 'BANNER',
  title: 'बीबीसी दुनिया',
};

const SecondaryColumn = ({
  pageData,
  sendOptimizelyEvents,
  experimentVariant,
}: {
  pageData: Article;
  sendOptimizelyEvents: boolean;
  experimentVariant: string | null;
}) => {
  const topStoriesContent = pageData?.secondaryColumn?.topStories;
  const featuresContent = pageData?.secondaryColumn?.features;
  // Use dummy data for development
  const tvBulletinContent = dummyTvBulletinContent;
  console.log('tvBulletinContent:', tvBulletinContent);
  console.log('experimentVariant:', experimentVariant);
  console.log('sendOptimizelyEvents:', sendOptimizelyEvents);
  console.log('title', dummyTvBulletinContent?.title);
  const theme = useTheme();
  const {
    palette: { GREY_2 },
    mq,
  } = theme;

  // Detect if we're in GROUP_4_MIN_WIDTH (desktop and up)
  const isGroup4Up = useMediaQuery(mq.GROUP_4_MIN_WIDTH);

  if (!topStoriesContent && !featuresContent && !tvBulletinContent) return null;
  const showAdaptiveSection = experimentVariant === 'variant_a' && !isGroup4Up;
  // ask about putting the curations in a curationList in secondary Column data so that we can map over the list below when rendering curations

  return (
    <div css={styles.secondaryColumn}>
      {showAdaptiveSection && (
        <section
          css={adaptiveCurationsSectionStyles(theme)}
          aria-label="Adaptive Experience"
          data-testid="adaptive-curations-section"
        >
          <Curation
            visualStyle={VISUAL_STYLE.FEED}
            visualProminence={VISUAL_PROMINENCE.NORMAL}
            summaries={dummySimpleCurationGridContent.summaries}
            title={dummySimpleCurationGridContent.title}
            position={dummySimpleCurationGridContent.position}
            curationId={dummySimpleCurationGridContent.curationId}
            curationLength={4}
            link={dummySimpleCurationGridContent.link}
          />
          <Curation
            visualStyle={VISUAL_STYLE.BANNER}
            visualProminence={VISUAL_PROMINENCE.MAXIMUM}
            summaries={dummyTvBulletinContent.summaries}
            title={dummyTvBulletinContent.title}
            position={dummyTvBulletinContent.position}
            curationId={dummyTvBulletinContent.curationId}
          />
        </section>
      )}
      {topStoriesContent && (
        <div
          css={styles.topStoriesSection}
          data-testid="top-stories"
          data-experiment-position="secondaryColumn"
        >
          <TopStoriesSection
            content={topStoriesContent}
            sendOptimizelyEvents={sendOptimizelyEvents}
          />
        </div>
      )}
      {featuresContent && (
        <div css={styles.featuresSection} data-testid="features">
          <FeaturesAnalysis
            content={featuresContent}
            sendOptimizelyEvents={sendOptimizelyEvents}
            parentColumns={{}}
            sectionLabelBackground={GREY_2}
          />
        </div>
      )}
    </div>
  );
};

export default SecondaryColumn;
