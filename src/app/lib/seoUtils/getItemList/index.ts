import type { Curation } from '../../../models/types/curationData';

export default ({
  curations,
  name,
}: {
  curations: Curation[];
  name: string;
}) => {
  const itemListElement = curations
    .flatMap(({ summaries = [] }) =>
      summaries.map(({ link }) => ({
        '@context': 'http://schema.org',
        '@type': 'ListItem',
        url: link,
      })),
    )
    .map((listItem, index) => {
      return {
        ...listItem,
        position: index + 1,
      };
    });

  return {
    itemListElement,
    '@type': 'ItemList',
    name,
    numberOfItems: itemListElement.length,
  };
};
