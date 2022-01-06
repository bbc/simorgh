import encodeChunkFilename from '../utilities/encodeChunkUri';

const crossOrigin = 'anonymous';

export const getScriptAttributes = bundleType => chunk => {
  const { type, url } = chunk || {};
  const MAIN_ASSET = 'mainAsset';

  return {
    crossOrigin,
    defer: true,
    ...(url && { src: encodeChunkFilename(chunk) }),
    ...(bundleType === 'modern' && type === MAIN_ASSET && { type: 'module' }),
    ...(bundleType === 'legacy' && type === MAIN_ASSET && { noModule: true }),
  };
};

export const getLinkAttributes = chunk => ({
  crossOrigin,
  rel: 'modulepreload',
  ...(chunk && chunk.url && { href: encodeChunkFilename(chunk) }),
});
