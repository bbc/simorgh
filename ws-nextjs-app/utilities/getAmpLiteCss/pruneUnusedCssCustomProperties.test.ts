import pruneUnusedCssCustomProperties from './pruneUnusedCssCustomProperties';

describe('pruneUnusedCssCustomProperties', () => {
  it('returns the CSS unchanged when there are no :root blocks', () => {
    const css = '.foo{color:red}';
    expect(pruneUnusedCssCustomProperties(css)).toBe(css);
  });

  it('removes a custom property that is never referenced', () => {
    const css = ':root{--used:red;--unused:blue}.foo{color:var(--used)}';
    expect(pruneUnusedCssCustomProperties(css)).toBe(
      ':root{--used:red}.foo{color:var(--used)}',
    );
  });

  it('keeps all custom properties that are referenced', () => {
    const css =
      ':root{--a:1px;--b:2px}.foo{width:var(--a)}.bar{height:var(--b)}';
    expect(pruneUnusedCssCustomProperties(css)).toBe(css);
  });

  it('drops the :root block entirely when none of its properties are used', () => {
    const css = ':root{--unused:red}.foo{color:blue}';
    expect(pruneUnusedCssCustomProperties(css)).toBe('.foo{color:blue}');
  });

  it('merges multiple :root blocks into one, keeping only used properties', () => {
    const css =
      ':root{--font:sans-serif}:root{--used:red;--unused:blue}.foo{font-family:var(--font);color:var(--used)}';
    expect(pruneUnusedCssCustomProperties(css)).toBe(
      ':root{--font:sans-serif;--used:red}.foo{font-family:var(--font);color:var(--used)}',
    );
  });

  it('recognises usage with a fallback value, e.g. var(--name, fallback)', () => {
    const css = ':root{--used:red}.foo{color:var(--used, blue)}';
    expect(pruneUnusedCssCustomProperties(css)).toBe(css);
  });

  it('does not false-match a property name that is a prefix of another', () => {
    const css =
      ':root{--font-size-pica:1rem;--font-size-pica-large:2rem}.foo{font-size:var(--font-size-pica-large)}';
    expect(pruneUnusedCssCustomProperties(css)).toBe(
      ':root{--font-size-pica-large:2rem}.foo{font-size:var(--font-size-pica-large)}',
    );
  });
});
