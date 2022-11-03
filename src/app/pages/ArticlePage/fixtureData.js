import {
  blockContainingText,
  blockContainingByline,
  singleTextBlock,
  textBlock,
} from '#models/blocks';

const blocksWithHeadlineAndText = blockValues => {
  const [headlineText, paragraphText] = blockValues;

  return [
    blockContainingText('headline', headlineText, 1),
    singleTextBlock(paragraphText, 2),
  ];
};

const blocksWithHeadlineTexAndByline = blockValues => {
  const [headlineText, paragraphText, twitterHandle] = blockValues;

  return [
    blockContainingText('headline', headlineText, 1),
    blockContainingByline(twitterHandle, 2),
    singleTextBlock(paragraphText, 3),
  ];
};

const articleDataBuilder = (
  id,
  createdBy,
  passportLanguage,
  home,
  blockValues,
  seoHeadline,
  promoHeadline,
  summary,
  things,
  allowAdvertising = false,
  articleBlocksPopulator = blocksWithHeadlineAndText,
) => ({
  metadata: {
    id: `urn:bbc:ares::article:${id}`,
    locators: {
      optimoUrn: `urn:bbc:optimo:asset:${id}`,
    },
    analyticsLabels: {
      contentId: 'urn:bbc:optimo:c0000000001o',
    },
    type: 'article',
    createdBy,
    created: 1514808060000,
    firstPublished: 1514808060000,
    lastPublished: 1514811600000,
    lastUpdated: 1514815200000,
    passport: {
      language: passportLanguage,
      home,
      category: 'news',
      genre: null,
    },
    tags: things,
    allowAdvertising,
  },
  content: {
    model: {
      blocks: articleBlocksPopulator(blockValues),
    },
  },
  promo: {
    id: `urn:bbc:ares::article:${id}`,
    headlines: {
      seoHeadline,
      promoHeadline,
    },
    locators: {
      optimoUrn: `urn:bbc:optimo:asset:${id}`,
    },
    summary: textBlock(summary),
    timestamp: 1514811600000,
  },
});

const presetThings = {
  about: [
    {
      thingUri:
        'http://www.bbc.co.uk/things/2351f2b2-ce36-4f44-996d-c3c4f7f90eaa#id',
      topicId: 'cpwpy79d6dxt',
      topicName: 'Royal Wedding 2018',
      curationType: ['vivo-stream'],
      thingId: '2351f2b2-ce36-4f44-996d-c3c4f7f90eaa',
      thingLabel: 'Royal Wedding 2018',
      thingEnglishLabel: 'Royal Wedding 2018',
      thingType: ['Thing', 'Event'],
      thingSameAs: [
        'http://dbpedia.org/resource/Queen_Victoria',
        'http://rdf.freebase.com/ns/m.0cw10',
      ],
    },
    {
      thingUri:
        'http://www.bbc.co.uk/things/803eaeb9-c0c3-4f1b-9a66-90efac3df2dc#id',
      topicId: 'cg3mq45zq4xt',
      topicName: 'Duchess of Sussex',
      curationType: ['vivo-stream'],
      thingId: '803eaeb9-c0c3-4f1b-9a66-90efac3df2dc',
      thingLabel: 'Duchess of Sussex',
      thingEnglishLabel: 'Duchess of Sussex',
      thingType: ['Person'],
      thingSameAs: [],
    },
  ],
  mentions: [
    {
      thingUri:
        'http://www.bbc.co.uk/things/1efbf3e5-b330-49a1-b531-b507ab027c96#id',
      thingId: '1efbf3e5-b330-49a1-b531-b507ab027c96',
      thingLabel: 'Queen Victoria',
      thingEnglishLabel: 'Queen Victoria',
      thingType: ['Person', 'Thing'],
    },
  ],
};

const emptyThings = {
  about: null,
  mentions: null,
};

export const articleDataNews = articleDataBuilder(
  'c0000000001o',
  'News',
  'en-gb',
  'http://www.bbc.co.uk/ontologies/passport/home/News',
  ['Article Headline', 'A paragraph.'],
  'Article Headline for SEO',
  'Article Headline for Promo',
  'Article summary.',
  presetThings,
);

export const articleDataPersian = articleDataBuilder(
  'c4vlle3q337o',
  'Persian',
  'fa',
  'http://www.bbc.co.uk/ontologies/passport/home/Persian',
  ['سرصفحه مقاله', 'یک پاراگراف.'],
  'سرصفحه مقاله',
  'سرصفحه مقاله برای ارتقاء',
  'خلاصه مقاله',
  emptyThings,
);

export const articleDataPidgin = articleDataBuilder(
  'cwl08rd38l6o',
  'Pidgin',
  'pcm',
  'http://www.bbc.co.uk/ontologies/passport/home/Pidgin',
  ['Article Headline in Pidgin', 'A paragraph in Pidgin.'],
  'Article Headline for SEO in Pidgin',
  'Article Headline for Promo in Pidgin',
  'Article summary in Pidgin',
  emptyThings,
);

export const articleDataPidginWithAds = articleDataBuilder(
  'cwl08rd38l6o',
  'Pidgin',
  'pcm',
  'http://www.bbc.co.uk/ontologies/passport/home/Pidgin',
  ['Article Headline in Pidgin', 'A paragraph in Pidgin.'],
  'Article Headline for SEO in Pidgin',
  'Article Headline for Promo in Pidgin',
  'Article summary in Pidgin',
  emptyThings,
  true,
);

export const articleDataPidginWithByline = articleDataBuilder(
  'cwl08rd38l6o',
  'Pidgin',
  'pcm',
  'http://www.bbc.co.uk/ontologies/passport/home/Pidgin',
  ['Article Headline in Pidgin', 'A paragraph in Pidgin.', 'mary_harper'],
  'Article Headline for SEO in Pidgin',
  'Article Headline for Promo in Pidgin',
  'Article summary in Pidgin',
  emptyThings,
  undefined,
  blocksWithHeadlineTexAndByline,
);
