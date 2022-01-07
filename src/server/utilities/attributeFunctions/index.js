import encodeChunkFilename from '../encodeChunkUri';

const crossOrigin = 'anonymous';

export const getScriptAttributes = bundleType => chunk => {
  if (chunk) {
    const { url } = chunk;

    return {
      crossOrigin,
      defer: true,
      ...(url && { src: encodeChunkFilename(chunk) }),
      ...(bundleType === 'modern' && { type: 'module' }),
      ...(bundleType === 'legacy' && { noModule: true }),
    };
  }

  return {};
};

export const getLinkAttributes = chunk => ({
  crossOrigin,
  rel: 'modulepreload',
  ...(chunk && chunk.url && { href: encodeChunkFilename(chunk) }),
});
