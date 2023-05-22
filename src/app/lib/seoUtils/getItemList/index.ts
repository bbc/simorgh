import { CurationData } from '../../../models/types/curationData';
import getListItems from '../getListItems';

export default ({
  curations,
  name,
}: {
  curations: CurationData[];
  name: string;
}) => {
  const listItems = getListItems(curations);

  return {
    itemListElement: listItems,
    '@type': 'ItemList',
    name,
    numberOfItems: listItems.length,
  };
};
