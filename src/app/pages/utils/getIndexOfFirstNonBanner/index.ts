import { type Curation, VISUAL_STYLE } from '#app/models/types/curationData';

export default (curations: Curation[]) => curations.findIndex(
    ({ visualStyle }) => visualStyle !== VISUAL_STYLE.BANNER,
  );
