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

export const getLinkAttributes = chunk => {
  const rel =
    /(modern\.commons-n\.js$)|(modern\.main-src_a\.js$)/.test(chunk.filename) ||
    chunk.scriptType !== 'script'
      ? 'modulepreload'
      : '';
  return {
    crossOrigin,
    rel,
    ...(chunk && chunk.url && { href: encodeChunkFilename(chunk) }),
  };
};
