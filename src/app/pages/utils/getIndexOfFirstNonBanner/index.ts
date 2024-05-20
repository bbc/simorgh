import { Curation, VISUAL_STYLE } from '#app/models/types/curationData';

export default (curations: Curation[]) => {
  const checkIndex = curations.findIndex(
    curation => curation.visualStyle !== VISUAL_STYLE.BANNER,
  );
  return checkIndex;
};
