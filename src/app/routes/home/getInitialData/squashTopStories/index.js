import pathOr from 'ramda/src/pathOr';

const squashKeys = [
  'responsive-top-stories',
  'top-story',
  'secondary-top-story',
  'other-top-stories',
];

const squashTopStories = (jsonRaw) => {
  const json = jsonRaw;
  let groups = pathOr(null, ['content', 'groups'], json);
  let collectedItems = [];
  let collectedStrapline;

  if (groups) {
    /*
     * Find and delete unwanted groups while collecting items
     */
    groups = groups.filter((group) => {
      if (squashKeys.includes(group.type)) {
        collectedItems = collectedItems.concat(group.items);

        const foundStapline = pathOr(null, ['strapline', 'name'], group);

        // collect the first found strapline name
        if (!collectedStrapline && foundStapline) {
          collectedStrapline = foundStapline;
        }

        return false; // delete the group
      }

      return true; // keep the group
    });

    /*
     * If items were collected, form into a new group
     */
    if (collectedItems.length > 0) {
      const newTopStoriesGroup = {
        type: 'top-stories',
        title: 'Top stories',
        items: collectedItems,
      };

      if (collectedStrapline) {
        newTopStoriesGroup.strapline = {
          name: collectedStrapline,
        };
      }

      /*
       * Add new group to the start of the groups array
       */
      groups.unshift(newTopStoriesGroup);

      /*
       * Override the original groups with the new ones
       */
      json.content.groups = groups;
    }
  }

  return json;
};

export default squashTopStories;
