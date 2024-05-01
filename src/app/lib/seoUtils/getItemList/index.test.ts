import getItemList from '.';
import { baseCurations, curationsWithSummaries } from '../testHelpers';

describe('SEO Utils | getItemList', () => {
  it('should convert curations into an ItemList object with ListItems', () => {
    expect(
      getItemList({
        // @ts-expect-error suppressed due to partial data required for testing purposes
        curations: curationsWithSummaries,
        name: 'BBC News Mundo',
      }),
    ).toMatchInlineSnapshot(`
      {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@context": "http://schema.org",
            "@type": "ListItem",
            "position": 1,
            "url": "https://www.bbc.com/mundo/0",
          },
          {
            "@context": "http://schema.org",
            "@type": "ListItem",
            "position": 2,
            "url": "https://www.bbc.com/mundo/1",
          },
        ],
        "name": "BBC News Mundo",
        "numberOfItems": 2,
      }
    `);
  });

  it('should return an ItemList object with no ListItems if curation has no summaries', () => {
    const expected = {
      '@type': 'ItemList',
      name: 'BBC News Pidgin',
      itemListElement: [],
      numberOfItems: 0,
    };

    expect(
      getItemList({ curations: baseCurations, name: 'BBC News Pidgin' }),
    ).toStrictEqual(expected);
  });
});
