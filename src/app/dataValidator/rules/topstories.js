import deepGet from '../../helpers/json/deepGet';

const squashKeys = [
  'responsive-top-stories',
  'top-story',
  'secondary-top-story',
  'other-top-stories',
];

const squashTopStories = jsonRaw => {
  let groups = deepGet(['content', 'groups'], jsonRaw);

  let collectedItems = [];

  /*
   * Find and delete unwanted groups while collecting items
   */
  if (groups) {
    groups = groups.filter(group => {
      if (squashKeys.indexOf(group.type) > -1) {
        collectedItems = collectedItems.concat(group.items);

        return false; // delete the group
      }

      return true; // keep the group
    });
  }

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
  }

  return jsonRaw;
};

export default squashTopStories;
