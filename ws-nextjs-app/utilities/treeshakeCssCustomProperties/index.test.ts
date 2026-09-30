import treeshakeCssCustomProperties from '.';

describe('treeshakeCssCustomProperties', () => {
  it('removes custom properties that are never referenced', () => {
    const css = ':root{--used:#111;--unused:#222}.a{color:var(--used)}';

    expect(treeshakeCssCustomProperties(css)).toBe(
      ':root{--used:#111;}.a{color:var(--used)}',
    );
  });

  it('keeps transitively referenced custom properties', () => {
    const css =
      ':root{--base:#111;--alias:var(--base);--unused:#222}.a{color:var(--alias)}';

    expect(treeshakeCssCustomProperties(css)).toBe(
      ':root{--base:#111;--alias:var(--base);}.a{color:var(--alias)}',
    );
  });

  it('removes a :root block that becomes empty', () => {
    const css = ':root{--unused:#222}.a{color:red}';

    expect(treeshakeCssCustomProperties(css)).toBe('.a{color:red}');
  });

  it('preserves non-custom-property declarations in :root', () => {
    const css = ':root{--unused:#222;color:red}.a{color:blue}';

    expect(treeshakeCssCustomProperties(css)).toBe(
      ':root{color:red}.a{color:blue}',
    );
  });

  it('deduplicates usage across multiple :root blocks and rules', () => {
    const css =
      ':root{--a:1;--b:2}:root{--c:3}.x{width:var(--a)}.y{height:var(--c)}';

    expect(treeshakeCssCustomProperties(css)).toBe(
      ':root{--a:1;}:root{--c:3}.x{width:var(--a)}.y{height:var(--c)}',
    );
  });
});
