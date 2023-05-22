import { CurationData } from '../../../models/types/curationData';

export default (curations: CurationData[]) => {
  return curations
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
};
