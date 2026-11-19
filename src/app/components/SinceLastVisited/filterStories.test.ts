import { Summary } from '#app/models/types/curationData';
import { filterSummaries, getTopStoriesCuration } from './filterStories';

const NOW = Date.parse('2026-11-18T12:00:00.000Z');
const CUTOFF = Date.parse('2026-11-18T08:00:00.000Z');

const story = (overrides: Partial<Summary> = {}): Summary => ({
  id: 'a',
  title: 'Headline',
  link: 'https://www.bbc.com/mundo/articles/a',
  imageUrl: 'https://ichef.bbci.co.uk/{width}/a.jpg',
  imageAlt: 'alt',
  type: 'article',
  firstPublished: '2026-11-18T10:00:00.000Z',
  lastPublished: '2026-11-18T10:00:00.000Z',
  ...overrides,
});

const run = (summaries: Summary[], currentPathname?: string) =>
  filterSummaries(summaries, { cutoff: CUTOFF, now: NOW, currentPathname });

describe('filterSummaries', () => {
  it('uses firstPublished, not lastPublished', () => {
    const result = run([
      story({
        firstPublished: '2026-11-01T00:00:00.000Z',
        lastPublished: '2026-11-18T11:00:00.000Z',
      }),
    ]);
    expect(result).toHaveLength(0);
  });

  it('excludes stories published exactly at the cutoff', () => {
    expect(
      run([story({ firstPublished: '2026-11-18T08:00:00.000Z' })]),
    ).toHaveLength(0);
    expect(
      run([story({ firstPublished: '2026-11-18T08:00:00.001Z' })]),
    ).toHaveLength(1);
  });

  it.each([
    ['missing', ''],
    ['invalid', 'not-a-date'],
    ['far in the future', '2026-11-19T00:00:00.000Z'],
  ])('excludes stories with %s publication timestamps', (_, firstPublished) => {
    expect(run([story({ firstPublished })])).toHaveLength(0);
  });

  it('excludes stories without id, title or a valid link', () => {
    expect(
      run([story({ id: '' }), story({ id: 'b', title: ' ' })]),
    ).toHaveLength(0);
    expect(run([story({ link: '' })])).toHaveLength(0);
  });

  it('deduplicates by id and sorts newest first', () => {
    const result = run([
      story({ id: 'a', firstPublished: '2026-11-18T09:00:00.000Z' }),
      story({ id: 'b', firstPublished: '2026-11-18T11:00:00.000Z' }),
      story({ id: 'a', firstPublished: '2026-11-18T09:00:00.000Z' }),
    ]);
    expect(result.map(({ id }) => id)).toEqual(['b', 'a']);
  });

  it('excludes the current page by pathname', () => {
    const result = run(
      [
        story(),
        story({ id: 'b', link: 'https://www.bbc.com/mundo/articles/b' }),
      ],
      '/mundo/articles/a/',
    );
    expect(result.map(({ id }) => id)).toEqual(['b']);
  });
});

describe('getTopStoriesCuration', () => {
  const urn = 'urn:bbc:vivo:curation:3f2c9a1e-1111-2222-3333-444455556666';

  it('returns the position 0 curation with a valid URN', () => {
    const curation = { position: 0, curationId: urn, visualProminence: 'HIGH' };
    expect(getTopStoriesCuration([curation])).toBe(curation);
  });

  it('returns null for a missing or malformed URN', () => {
    expect(
      getTopStoriesCuration([{ position: 0, visualProminence: 'HIGH' }]),
    ).toBeNull();
    expect(
      getTopStoriesCuration([
        { position: 0, curationId: 'nope', visualProminence: 'HIGH' },
      ]),
    ).toBeNull();
  });
});
