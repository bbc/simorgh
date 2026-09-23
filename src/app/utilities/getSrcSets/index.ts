import { createResponsiveSrcSet } from '#app/utilities/imageSrcSets';

export default (params: Parameters<typeof createResponsiveSrcSet>[0]) =>
  createResponsiveSrcSet({
    ...params,
    srcSetSeparator: ', \n                          ',
  });
