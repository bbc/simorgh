import path from 'ramda/src/path';

const cpsOnlyOnwardJourneys = (json) => {
  const groups = path(['relatedContent', 'groups'], json);

  const processedGroups = groups.reduce((acc, group) => {
    const { type } = group;
    if (type === 'see-alsos') {
      const { promos } = group;
      const onlyCpsPromos = promos.filter(
        ({ type: promoType }) => promoType === 'cps',
      );

      const noCpsPromos = onlyCpsPromos.length === 0;

      if (noCpsPromos) {
        // omit the entire group if no cps promos
        return acc;
      }
      const seeAlsoGroupCpsOnly = {
        ...group,
        promos: onlyCpsPromos,
      };

      return [...acc, seeAlsoGroupCpsOnly];
    }
    return [...acc, group];
  }, []);

  const { relatedContent } = json;

  return {
    ...json,
    relatedContent: {
      ...relatedContent,
      groups: processedGroups,
    },
  };
};

export default cpsOnlyOnwardJourneys;
