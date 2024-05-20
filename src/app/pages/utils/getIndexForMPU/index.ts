import { Curation, VISUAL_STYLE } from '#app/models/types/curationData';

export default (curations: Curation[]) => {
  let index;
  for (let i = 0; i <= curations.length; i += 1) {
    if (curations[0].visualStyle !== VISUAL_STYLE.BANNER) {
      index = 0;
      return index;
    }
    if (curations[0].visualStyle === VISUAL_STYLE.BANNER) {
      index = 1;
      return index;
    }

    if (curations[3].visualStyle === VISUAL_STYLE.COLLECTION) {
      index = 3;
      return index;
    }
  }
  return 'index';
};
