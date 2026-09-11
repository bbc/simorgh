import trimFontFaceSourcesToWoff2 from '.';

describe('trimFontFaceSourcesToWoff2', () => {
  it('removes a legacy woff fallback, keeping only woff2', () => {
    const css =
      '@font-face{font-family:\'ReithSans\';src:url(a.woff2) format("woff2"),url(a.woff) format("woff");font-weight:700}';

    expect(trimFontFaceSourcesToWoff2(css)).toBe(
      '@font-face{font-family:\'ReithSans\';src:url(a.woff2) format("woff2");font-weight:700}',
    );
  });

  it('removes multiple legacy formats', () => {
    const css =
      '@font-face{src:url(a.woff2) format("woff2"),url(a.woff) format("woff"),url(a.ttf) format("truetype")}';

    expect(trimFontFaceSourcesToWoff2(css)).toBe(
      '@font-face{src:url(a.woff2) format("woff2");}',
    );
  });

  it('preserves local() sources', () => {
    const css =
      '@font-face{src:local(\'Reith\'),url(a.woff2) format("woff2"),url(a.woff) format("woff")}';

    expect(trimFontFaceSourcesToWoff2(css)).toBe(
      '@font-face{src:local(\'Reith\'),url(a.woff2) format("woff2");}',
    );
  });

  it('leaves a face untouched when it has no woff2 source', () => {
    const css =
      '@font-face{src:url(a.woff) format("woff"),url(a.ttf) format("truetype")}';

    expect(trimFontFaceSourcesToWoff2(css)).toBe(css);
  });

  it('trims every face in the stylesheet', () => {
    const css =
      '@font-face{src:url(a.woff2) format("woff2"),url(a.woff) format("woff")}' +
      '@font-face{src:url(b.woff2) format("woff2"),url(b.woff) format("woff")}';

    expect(trimFontFaceSourcesToWoff2(css)).toBe(
      '@font-face{src:url(a.woff2) format("woff2");}' +
        '@font-face{src:url(b.woff2) format("woff2");}',
    );
  });

  it('leaves stylesheets without @font-face unchanged', () => {
    const css = '.a{color:red}';

    expect(trimFontFaceSourcesToWoff2(css)).toBe(css);
  });
});
