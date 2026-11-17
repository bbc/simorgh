import { Summary } from '#app/models/types/curationData';

// Prototype fixtures. `readTime` is whole minutes, mirroring article
// `metadata.stats.readTime`. The live client-side endpoint
// (`/fd/simorgh-bff?onwardJourney=topicDiscovery`) does NOT currently return
// this field; see README.md.
const buildItem = (
  id: string,
  title: string,
  readTime: unknown,
): Summary & { readTime: number } =>
  ({
    id,
    type: 'article',
    title,
    link: `https://www.bbc.com/pidgin/articles/${id}`,
    imageUrl:
      'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/a5fb/live/a7edb960-d506-11f0-8c06-f5d460985095.jpg.webp',
    imageAlt: title,
    isLive: false,
    isPortraitImage: false,
    firstPublished: '2026-05-01T07:21:02.507Z',
    lastPublished: '2026-05-01T07:21:02.507Z',
    readTime,
  }) as Summary & { readTime: number };

export const shortReadItems = [
  buildItem('c0000000001o', 'Short read one', 1),
  buildItem('c0000000002o', 'Short read two', 3),
  buildItem('c0000000003o', 'Short read at the threshold', 4),
  buildItem('c0000000004o', 'Short read four', 2),
];

export const longReadItems = [
  buildItem('c0000000005o', 'Long read at the threshold', 5),
  buildItem('c0000000006o', 'Long read two', 9),
  buildItem('c0000000007o', 'Long read three', 12),
  buildItem('c0000000008o', 'Long read four', 7),
];

export const mixedItems = [...shortReadItems, ...longReadItems];

export const unclassifiableItems = [
  buildItem('c0000000009o', 'Missing read time', undefined),
  buildItem('c0000000010o', 'Zero read time', 0),
  buildItem('c0000000011o', 'Negative read time', -3),
  buildItem('c0000000012o', 'NaN read time', Number.NaN),
  buildItem('c0000000013o', 'String read time', '5'),
  buildItem('c0000000014o', 'Fractional read time', 4.5),
];

export const arabicMixedItems = mixedItems.map(item => ({
  ...item,
  link: item.link.replace('/pidgin/', '/arabic/'),
}));
