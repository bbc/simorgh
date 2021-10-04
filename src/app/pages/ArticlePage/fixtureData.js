import {
  blockContainingText,
  singleTextBlock,
  textBlock,
} from '#models/blocks';

const articleDataBuilder = (
  id,
  createdBy,
  passportLanguage,
  home,
  headlineText,
  paragraphText,
  seoHeadline,
  promoHeadline,
  summary,
  things,
) => ({
  metadata: {
    id: `urn:bbc:ares::article:${id}`,
    locators: {
      optimoUrn: `urn:bbc:optimo:asset:${id}`,
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
  },
  content: {
    model: {
      blocks: [
        blockContainingText('headline', headlineText, 1),
        singleTextBlock(paragraphText, 2),
      ],
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

export const articleDataNews = articleDataBuilder(
  'c0000000001o',
  'News',
  'en-gb',
  'http://www.bbc.co.uk/ontologies/passport/home/News',
  'Article Headline',
  'A paragraph.',
  'Article Headline for SEO',
  'Article Headline for Promo',
  'Article summary.',
);

export const articleDataPersian = articleDataBuilder(
  'c4vlle3q337o',
  'Persian',
  'fa',
  'http://www.bbc.co.uk/ontologies/passport/home/Persian',
  'سرصفحه مقاله',
  'یک پاراگراف.',
  'سرصفحه مقاله',
  'سرصفحه مقاله برای ارتقاء',
  'خلاصه مقاله',
);

export const articleDataPidgin = articleDataBuilder(
  'cwl08rd38l6o',
  'Pidgin',
  'pcm',
  'http://www.bbc.co.uk/ontologies/passport/home/Pidgin',
  'Article Headline in Pidgin',
  'A paragraph in Pidgin.',
  'Article Headline for SEO in Pidgin',
  'Article Headline for Promo in Pidgin',
  'Article summary in Pidgin',
);
