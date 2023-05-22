import getItemList from '.';
import { VISUAL_PROMINENCE } from '../../../models/types/curationData';

const baseCurations = [
  {
    curationId: 'a',
    curationType: 'tipo-curation',
    visualProminence: VISUAL_PROMINENCE.NORMAL,
    position: 1,
  },
  {
    curationId: 'b',
    curationType: 'tipo-curation',
    visualProminence: VISUAL_PROMINENCE.HIGH,
    position: 2,
  },
];

describe('SEO Utils | getItemList', () => {
  it('should convert curations into an ItemList', () => {
    const curations = baseCurations.map((curation, index) => {
      return {
        ...curation,
        summaries: [
          {
            title: `Title ${index}`,
            type: `Type ${index}`,
            link: `https://www.bbc.com/mundo/${index}`,
          },
        ],
      };
    });

    expect(getItemList(curations)).toMatchInlineSnapshot(`
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
