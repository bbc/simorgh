import { Curation, VISUAL_STYLE } from '#app/models/types/curationData';

export default (curations: Curation[]) => {
  return curations.findIndex(
    ({ visualStyle }) => visualStyle !== VISUAL_STYLE.BANNER,
  );
};
