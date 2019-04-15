import deepClone from '../../helpers/json/deepClone';
import deepGet from '../../helpers/json/deepGet';

const squashKeys = [
  'responsive-top-stories',
  'top-story',
  'secondary-top-story',
  'other-top-stories',
];

const squashTopStories = jsonRaw => {
  const json = deepClone(jsonRaw); // make a copy so we don't corrupt the input
  let groups = deepGet(['content', 'groups'], json);
  let collectedItems = [];

  if (groups) {
    /*
     * Find and delete unwanted groups while collecting items
     */
    groups = groups.filter(group => {
      if (group.type && squashKeys.indexOf(group.type) > -1) {
        collectedItems = collectedItems.concat(group.items);

        return false; // delete the group
      }

      return true; // keep the group
    });

    /*
     * If items were collected, form into a new group and add to start
     */
    if (collectedItems.length > 0) {
      const newGroup = {
        type: 'top-stories',
        title: 'Top stories',
        items: collectedItems,
      };

      groups.unshift(newGroup);

      /*
       * Now that we have new collected items, override the original groups with the new ones
       */
      json.content.groups = groups;
    }
  }

  return json;
};

export default squashTopStories;
