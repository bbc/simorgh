import { blockContainingText } from '../../models/blocks';

export const serviceContextNews = {
  brandName: 'BBC News',
  service: 'News',
};

export const serviceContextPersian = {
  brandName: 'BBC News فارسی',
  service: 'Persian',
};

const headlineBlock = headline => blockContainingText('headline', headline);

const articleDataBuilder = (
  id,
  passportLanguage,
  home,
  headlineText,
  paragraphText,
  seoHeadline,
  promoHeadline,
  summary,
) => ({
  metadata: {
    id: `urn:bbc:ares::article:${id}`,
    locators: {
      optimoUrn: `urn:bbc:optimo:asset:${id}`,
    },
    type: 'article',
    createdBy: '',
    blockId: 'a-1',
    created: 1514808060000,
    firstPublished: 1514808060000,
    lastPublished: 1514811600000,
    lastUpdated: 1514811600000,
    passport: {
      language: passportLanguage,
      home: 'http://www.bbc.co.uk/ontologies/passport/home/Persian',
      category: 'news',
      genre: null,
    },
    tags: {},
  },
  content: {
    model: {
      blocks: [
        headlineBlock(headlineText),
        {
          type: 'text',
          blockId: 't-2',
          model: {
            blocks: [
              {
                blockId: 'p-2',
                type: 'paragraph',
                model: {
                  text: paragraphText,
                },
              },
            ],
          },
        },
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
    summary,
    timestamp: 1514811600000,
  },
});

export const articleDataNews = articleDataBuilder(
  'c0000000001o',
  'en-gb',
  'http://www.bbc.co.uk/ontologies/passport/home/News',
  'Article Headline',
  'A paragraph.',
  'Article Headline for SEO',
  'Article Headline for Promo',
  'Article summary.',
);

export const articleDataPersian = articleDataBuilder(
  'c0000000028o',
  'fa',
  'http://www.bbc.co.uk/ontologies/passport/home/Persian',
  'سرصفحه مقاله',
  'یک پاراگراف.',
  'سرصفحه مقاله',
  'سرصفحه مقاله برای ارتقاء',
  'خلاصه مقاله',
);
