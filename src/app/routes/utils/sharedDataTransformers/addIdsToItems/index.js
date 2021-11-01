import { v4 as uuid } from 'uuid';
import lensPath from 'ramda/src/lensPath';
import view from 'ramda/src/view';
import set from 'ramda/src/set';

const addIdsToItem =
  ({ lens, recursive }) =>
  item => {
    const newItem = { id: uuid(), ...item };

    if (recursive) {
      const nestedItems = view(lens, newItem);

      if (nestedItems) {
        return set(
          lens,
          nestedItems.map(addIdsToItem({ lens, recursive })),
          newItem,
        );
      }
    }

    return newItem;
  };

export default ({ pathToItems, recursive }) =>
  json => {
    const lens = lensPath(pathToItems);
    const newItems = view(lens, json).map(addIdsToItem({ lens, recursive }));

    return set(lens, newItems, json);
  };
