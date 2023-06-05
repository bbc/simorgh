import { CurationData } from '../../../models/types/curationData';

export default ({
  curations,
  name,
}: {
  curations: CurationData[];
  name: string;
}) => {
  const itemListElement = curations
    .map(({ summaries = [] }) =>
      summaries.map(({ link }) => ({
        '@context': 'http://schema.org',
        '@type': 'ListItem',
        url: link,
      })),
    )
    .flat()
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
