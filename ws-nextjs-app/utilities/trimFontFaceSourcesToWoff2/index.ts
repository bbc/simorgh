const FONT_FACE_BLOCK = /@font-face\s*\{[^{}]*\}/gi;
const SRC_DECLARATION = /src\s*:\s*([^;}]+);?/i;

const trimFontFaceSourcesToWoff2 = (css: string): string =>
  css.replace(FONT_FACE_BLOCK, block =>
    block.replace(SRC_DECLARATION, (declaration, value) => {
      if (!/woff2/i.test(value)) return declaration;

      const trimmedSources = value
        .split(',')
        .map((source: string) => source.trim())
        .filter(
          (source: string) => /woff2/i.test(source) || /^local\(/i.test(source),
        )
        .join(',');

      return `src:${trimmedSources};`;
    }),
  );

export default trimFontFaceSourcesToWoff2;
