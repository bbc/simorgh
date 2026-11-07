import { safeLoad } from 'js-yaml';
import russianArticle from '#data/russian/articles/c6wyzl2xdyz2o.json';
import pidginArticle from '#data/pidgin/articles/cvpde7nqj92o.json';
import articleToMarkdown from '.';

const canonicalUrl = 'https://www.bbc.com/russian/articles/c6wyzl2xdyz2o';
const { article } = russianArticle.data;

const readFrontMatter = (markdown: string) =>
  safeLoad(markdown.split('---\n')[1]);

describe('articleToMarkdown', () => {
  it('renders the BBC article metadata as valid YAML before the body', () => {
    const markdown = articleToMarkdown({ article, canonicalUrl });

    expect(markdown).toMatch(/^---\ntitle: /);
    expect(readFrontMatter(markdown)).toEqual({
      title: article.promo.headlines.seoHeadline,
      description: article.promo.summary.blocks[0].model.blocks[0].model.text,
      canonical: canonicalUrl,
      authors: ['Лебо Дисеко'],
      'article:published_time': new Date(
        article.metadata.firstPublished,
      ).toISOString(),
      'article:modified_time': new Date(
        article.metadata.lastPublished,
      ).toISOString(),
      language: 'ru',
      image:
        'https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/20c6/live/5ec04ba0-b367-11f1-a430-4d16ee157c41.jpg.webp',
    });
    expect(markdown.split('\n---\n\n')[1]).toMatch(/^# /);
  });

  it('quotes punctuation, YAML scalars, Unicode and multiline text without adding fields', () => {
    const title =
      'Title: "quoted" \\ # tag\n---\ncanonical: https://example.com';
    const description = 'true\nnull\n2026-01-01\n---\n[текст] & more';
    const markdown = articleToMarkdown({
      article: {
        ...article,
        promo: {
          ...article.promo,
          headlines: { seoHeadline: title },
          summary: description,
        },
      },
      canonicalUrl,
    });

    expect(readFrontMatter(markdown)).toMatchObject({
      title,
      description,
      canonical: canonicalUrl,
    });
    expect(markdown.split('\n---\n\n')).toHaveLength(2);
  });

  it('omits absent authors, description, language, image and title', () => {
    const markdown = articleToMarkdown({
      article: {
        ...pidginArticle.data.article,
        promo: { headlines: { seoHeadline: '' } },
        metadata: { ...pidginArticle.data.article.metadata, language: '' },
      },
      canonicalUrl,
    });

    expect(readFrontMatter(markdown)).toEqual({
      canonical: canonicalUrl,
      'article:published_time': new Date(
        pidginArticle.data.article.metadata.firstPublished,
      ).toISOString(),
      'article:modified_time': new Date(
        pidginArticle.data.article.metadata.lastPublished,
      ).toISOString(),
    });
  });

  it('preserves multiple authors and avoids duplicate names', () => {
    const byline = {
      type: 'byline',
      model: {
        blocks: [
          {
            type: 'contributor',
            model: {
              blocks: [
                {
                  type: 'name',
                  model: {
                    blocks: [
                      { type: 'paragraph', model: { text: 'First author' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: 'contributor',
            model: {
              blocks: [
                {
                  type: 'name',
                  model: {
                    blocks: [
                      { type: 'paragraph', model: { text: 'Second author' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    };
    const markdown = articleToMarkdown({
      article: {
        ...article,
        content: {
          model: { blocks: [byline, { ...byline, type: 'subByline' }] },
        },
      },
      canonicalUrl,
    });

    expect(readFrontMatter(markdown)).toMatchObject({
      authors: ['First author', 'Second author'],
    });
  });
});
