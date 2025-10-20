/** @jsx jsx */

import { jsx, useTheme, Theme } from '@emotion/react';
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
      duration: 'PT4M4S',
      isLive: false,
      title:
        'पाकिस्तान और अफ़ग़ानिस्तान के संघर्ष ने कैसे बढ़ाई पाकिस्तान के लिए मुश्किलें? - वुसअत की डायरी',
      firstPublished: '2025-10-19T12:31:54.528Z',
      lastPublished: '2025-10-19T12:31:54.528Z',
      link: 'https://www.bbc.com/hindi/articles/c1e3lxjedj7o',
      imageUrl:
        'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/9efb/live/b1e95390-acd7-11f0-b2a1-6f537f66f9aa.jpg.webp',
      description:
        'पाकिस्तान ने अफ़ग़ानिस्तान से संघर्ष में भारत का नाम भी लिया, जिस पर भारत के विदेश मंत्रालय ने भी सख्ती से जवाब दिया. ऐसे में भारत-अफ़ग़ानिस्तान को लेकर पाकिस्तान कैसे परेशान है. \nइसी पर देखिए पाकिस्तान के वरिष्ठ पत्रकार वुसतुल्लाह ख़ान की यह ख़ास टिप्पणी.',
      imageAlt:
        'पाकिस्तान और अफ़ग़ानिस्तान के संघर्ष में भारत का नाम कैसे आया?',
      id: 'c1e3lxjedj7o',
      readTime: 1,
    },
    {
      type: 'video',
      duration: 'PT17M15S',
      isLive: false,
      title:
        'सर सैयद अहमद ख़ान ने कैसे की थी अलीगढ़ मुस्लिम यूनिवर्सिटी की स्थापना? - विवेचना',
      firstPublished: '2025-10-19T12:29:49.472Z',
      lastPublished: '2025-10-19T12:29:49.472Z',
      link: 'https://www.bbc.com/hindi/articles/c39708z88myo',
      imageUrl:
        'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/70ae/live/0631f9d0-acd7-11f0-b2a1-6f537f66f9aa.jpg.webp',
      description:
        'अलीगढ़ मुस्लिम यूनिवर्सिटी की स्थापना कब और कैसे हुई और इस दौरान सर सैयद अहमद ख़ान का विरोध क्यों किया गया? ',
      imageAlt: 'सर सैयद अहमद ख़ान',
      id: 'c39708z88myo',
      readTime: 1,
    },
    {
      type: 'video',
      duration: 'PT3M16S',
      isLive: false,
      title:
        'लड्डू से लेकर कलाकंद तक, कौन-सी मिठाई कितने दिन तक खाने लायक रहती है?',
      firstPublished: '2025-10-19T08:28:55.699Z',
      lastPublished: '2025-10-19T08:28:55.699Z',
      link: 'https://www.bbc.com/hindi/articles/c0kpvl588x5o',
      imageUrl:
        'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/ca54/live/d1063da0-acc4-11f0-b2a1-6f537f66f9aa.jpg.webp',
      description:
        'एक दिन में कितनी मिठाई खाना सही है? और फ्रिज में रखी कौन-सी मिठाई कब तक ख़राब हो जाती है? फ़िट ज़िंदगी के आज के एपिसोड में यही जानिए.\n',
      imageAlt: 'दिवाली के वक्त मिठाइयों को लेकर बरतें सावधानी',
      id: 'c0kpvl588x5o',
      readTime: 1,
    },
    {
      type: 'video',
      duration: 'PT3M58S',
      isLive: false,
      title:
        'टिकट न मिलने से लेकर भीड़ तक, दिवाली के लिए घर जाने वालों की परेशानियां- ग्राउंड रिपोर्ट',
      firstPublished: '2025-10-18T14:22:27.963Z',
      lastPublished: '2025-10-18T14:22:27.963Z',
      link: 'https://www.bbc.com/hindi/articles/c62e7w36nq3o',
      imageUrl:
        'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/afdf/live/31199a80-ac2e-11f0-ba75-093eca1ac29b.jpg.webp',
      description:
        'दिल्ली में रहकर नौकरी कर रहे लोग दिवाली और छठ पूजा के मौके़ पर अपने घर जा रहे हैं. \nलेकिन दिल्ली से घर तक का सफ़र हर किसी के लिए एक सा नहीं है. कई लोग ऐसे हैं, जिन्हें ट्रेन या बस की टिकट ही नहीं मिली. ',
      imageAlt:
        'दिवाली पर लोगों के लिए अपने घर तक जाना कितना मुश्किल? ग्राउंड रिपोर्ट',
      id: 'c62e7w36nq3o',
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
  } = theme;

  if (!topStoriesContent && !featuresContent && !tvBulletinContent) return null;
  const showAdaptiveSection = experimentVariant === 'variant_a';
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
