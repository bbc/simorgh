import path from 'ramda/src/path';
import deepClone from 'ramda/src/clone';

const seeAlsoPredicate = ({ type }) => {
  return type === 'see-alsos';
};

const isCpsOnwardJourney = ({ type }) => {
  return type === 'cps';
};

const cpsOnlyOnwardJourneys = originalJson => {
  const json = deepClone(originalJson);

  const groups = path(['relatedContent', 'groups'], json);

  const seeAlsoGroup = groups.find(seeAlsoPredicate);

  if (seeAlsoGroup) {
    const { promos } = seeAlsoGroup;

    const noCpsOnwardJourneys = promos.every(
      onwardJourney => !isCpsOnwardJourney(onwardJourney),
    );

    if (noCpsOnwardJourneys) {
      const groupsWithoutSeeAlso = groups.filter(seeAlsoPredicate);
      return {
        ...json,
        groups: groupsWithoutSeeAlso,
      };
    } else {
      const someNonCpsOnwardJourneys = promos.some(isCpsOnwardJourney);
      console.log('some');

      if (someNonCpsOnwardJourneys) {
        const groupsWithOnlyCpsOnwardJourneys = groups.map(group => {
          if (seeAlsoPredicate(group)) {
            const { promos } = group;
            return {
              ...group,
              promos: promos.filter(isCpsOnwardJourney),
            };
          }
          return group;
        });

        const { relatedContent } = json;

        return {
          ...json,
          relatedContent: {
            ...relatedContent,
            groups: groupsWithOnlyCpsOnwardJourneys,
          },
        };
      }
    }
  }

  return json;
};

export default cpsOnlyOnwardJourneys;
