import { Article } from '#app/models/types/optimo';
import { TopicTag } from '#app/models/types/metadata';
import { ArticleEndItem } from '#app/components/EndOfArticleTreatment/types';
import articleFixture from '#data/mundo/articles/cddylv9g8z0o.json';
import getArticleEndItems, {
  getAuthoredItems,
  getCandidateTopics,
  getUniqueCandidates,
  selectDistinctItems,
} from '.';

jest.mock('#utilities/getAgent', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const item = (
  id: string,
  format: ArticleEndItem['format'] = 'article',
): ArticleEndItem => ({
  id,
  title: `Story ${id}`,
  href: `https://www.bbc.com/mundo/articles/${id}`,
  format,
  relationship: 'Relacionado con este artículo',
});

describe('article end prototype data', () => {
  it('deduplicates overlapping feeds before selecting two media pages to hydrate', () => {
    const candidates = getUniqueCandidates(
      [
        item('urn:bbc:optimo:asset:cqvg2449m4mjo', 'video'),
        item('cqvg2449m4mjo', 'video'),
        item('c4g3pwygzg6o', 'video'),
      ],
      'source',
    );
    expect(candidates.slice(0, 2).map(candidate => candidate.id)).toEqual([
      'urn:bbc:optimo:asset:cqvg2449m4mjo',
      'c4g3pwygzg6o',
    ]);
  });
  it('excludes the source regardless of URL/URN identifier and keeps one of each format', () => {
    const result = selectDistinctItems(
      [
        item('cwe9k0d7x9z0o'),
        item('cq0mem48n7yzo'),
        item('c4g3pwygzg6o'),
        item('cq0mem48n7yzo', 'video'),
        item('cqvg2449m4mjo', 'portrait'),
        item('c95y3r6wg52t', 'topic'),
      ],
      'urn:bbc:optimo:asset:cwe9k0d7x9z0o',
    );
    expect(result.map(value => value.id)).toEqual([
      'cq0mem48n7yzo',
      'cqvg2449m4mjo',
      'c95y3r6wg52t',
    ]);
  });

  it('rejects non-BBC and non-Mundo destinations and caps the number at four', () => {
    const result = selectDistinctItems(
      [
        { ...item('bad'), href: 'data:text/html,unexpected' },
        { ...item('external'), href: 'https://example.com/mundo/articles/x' },
        { ...item('language'), href: 'https://www.bbc.com/news/articles/x' },
        item('one'),
        item('two', 'portrait'),
        item('three', 'video'),
        item('four', 'topic'),
        item('five', 'audio'),
      ],
      'source',
    );
    expect(result.map(value => value.id)).toEqual([
      'one',
      'two',
      'three',
      'four',
    ]);
  });

  it('extracts editorial related links from the real Optimo block structure', () => {
    const article = articleFixture.data.article as unknown as Article;
    const result = getAuthoredItems(article);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      id: 'c8x421j4k0qo',
      href: 'https://www.bbc.com/mundo/articles/c8x421j4k0qo',
      format: 'article',
      relationship: 'Relacionado con este artículo',
    });
    expect(result[0].imageUrl).toContain(
      '055d3fa0-055d-11f0-b8d2-617de79a7a08',
    );
  });

  it('includes people and subjects without padding with country-wide feeds', () => {
    const topics = [
      { topicId: 'country', types: ['core:Place'] },
      { topicId: 'person', types: ['core:Person'] },
      { topicId: 'theme', types: ['core:Theme'] },
    ] as TopicTag[];
    expect(getCandidateTopics(topics).map(topic => topic.topicId)).toEqual([
      'person',
      'theme',
    ]);
  });

  it('provides a stable real portrait, related article and topic for the study article', async () => {
    const article = {
      metadata: { id: 'urn:bbc:optimo:asset:cwe9k0d7x9z0o' },
    } as Article;
    const result = await getArticleEndItems(
      article,
      '/mundo/articles/cwe9k0d7x9z0o?renderer_env=live',
    );
    expect(result.map(value => value.format)).toEqual([
      'portrait',
      'article',
      'topic',
    ]);
    expect(result[0].media?.type).toBe('aresMedia');
    expect(JSON.stringify(result[0].media)).toContain('p0pmc08m');
    expect(result.some(value => value.id === 'cwe9k0d7x9z0o')).toBe(false);
  });

  it('falls back to an actual related topic when upstream discovery is unavailable', async () => {
    const originalFetch = global.fetch;
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error('Network unavailable'));
    try {
      const article = {
        metadata: {
          id: 'urn:bbc:optimo:asset:c00000000000o',
          lastPublished: 1,
          topics: [
            {
              topicId: 'c95y3r6wg52t',
              topicName: 'Física',
              types: ['core:Theme'],
            },
          ],
        },
        content: { model: { blocks: [] } },
      } as unknown as Article;
      const result = await getArticleEndItems(
        article,
        '/mundo/articles/c00000000000o?renderer_env=live',
      );
      expect(result).toEqual([
        expect.objectContaining({ title: 'Física', format: 'topic' }),
      ]);
    } finally {
      global.fetch = originalFetch;
    }
  });
});
