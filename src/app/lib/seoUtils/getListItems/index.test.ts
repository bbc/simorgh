import getItemList from '.';
import { baseCurations, curationsWithSummaries } from '../testHelpers';

describe('SEO Utils | getListItems', () => {
  it('should convert curations into an array of ListItems', () => {
    expect(getItemList(curationsWithSummaries)).toMatchInlineSnapshot(`
      Array [
        Object {
          "@context": "http://schema.org",
          "@type": "ListItem",
          "position": 1,
          "url": "https://www.bbc.com/mundo/0",
        },
        Object {
          "@context": "http://schema.org",
          "@type": "ListItem",
          "position": 2,
          "url": "https://www.bbc.com/mundo/1",
        },
      ]
    `);
  });

  it('should return an empty list if there are no summaries in the curation', () => {
    expect(getItemList(baseCurations)).toHaveLength(0);
  });
});
