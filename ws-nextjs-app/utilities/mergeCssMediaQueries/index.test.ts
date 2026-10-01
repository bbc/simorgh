import mergeCssMediaQueries from '.';

const mediaBlocks = (css: string) => css.match(/@media/g)?.length ?? 0;

describe('mergeCssMediaQueries', () => {
  it('folds repeated media queries into a single block', () => {
    const css =
      '@media (min-width:20rem){.a_x__1{color:red}}' +
      '@media (min-width:20rem){.b_y__2{color:blue}}';

    const result = mergeCssMediaQueries(css);

    expect(mediaBlocks(result)).toBe(1);
    expect(result).toContain('.a_x__1');
    expect(result).toContain('.b_y__2');
  });

  it('merges queries that differ only by whitespace', () => {
    const css =
      '@media (min-width: 37.5rem){.a_x__1{color:red}}' +
      '@media (min-width:37.5rem){.b_y__2{color:blue}}';

    expect(mergeCssMediaQueries(css)).toBe(
      '@media (min-width: 37.5rem){.a_x__1{color:red}.b_y__2{color:blue}}',
    );
  });

  it('keeps different queries separate', () => {
    const css =
      '@media (min-width:20rem){.a_x__1{color:red}}' +
      '@media (min-width:63rem){.b_y__2{color:blue}}';

    expect(mergeCssMediaQueries(css)).toBe(css);
  });

  it('preserves the relative order of merged rules', () => {
    const css =
      '@media (min-width:20rem){.a_x__1{color:red}}' +
      '@media (min-width:20rem){.b_y__2{color:blue}}' +
      '@media (min-width:20rem){.c_z__3{color:green}}';

    expect(mergeCssMediaQueries(css)).toBe(
      '@media (min-width:20rem){.a_x__1{color:red}.b_y__2{color:blue}.c_z__3{color:green}}',
    );
  });

  it.each`
    selector                       | reason
    ${'body'}                      | ${'bare element selector'}
    ${'a.css-1a2b3c'}              | ${'element-qualified selector'}
    ${'html .a_x__1'}              | ${'global ancestor selector'}
    ${'.is-opera-mini .a_x__1'}    | ${'global class ancestor'}
    ${'[data-is-dark-ui] .a_x__1'} | ${'global attribute ancestor'}
    ${'.a_x__1 .plain'}            | ${'unhashed descendant class'}
    ${'#global .a_x__1'}           | ${'global id ancestor'}
    ${'* .a_x__1'}                 | ${'universal ancestor'}
    ${':root'}                     | ${'standalone root pseudo'}
    ${':hover'}                    | ${'standalone state pseudo'}
    ${'::before'}                  | ${'standalone pseudo-element'}
    ${':not(.a_x__1)'}             | ${'pseudo without direct hashed class'}
  `(
    'leaves blocks containing a $reason unmerged',
    ({ selector }: { selector: string }) => {
      const css =
        `@media (min-width:20rem){${selector}{color:red}}` +
        '@media (min-width:20rem){.b_y__2{color:blue}}';

      expect(mergeCssMediaQueries(mergeCssMediaQueries(css))).toContain(
        selector,
      );
      expect(mediaBlocks(mergeCssMediaQueries(css))).toBe(2);
    },
  );

  it('merges emotion and css module blocks together', () => {
    const css =
      '@media (min-width:20rem){.css-1a2b3c{color:red}}' +
      '@media (min-width:20rem){.Promo_link__ab12{color:blue}}';

    expect(mediaBlocks(mergeCssMediaQueries(css))).toBe(1);
  });

  it('allows hashed classes with safe pseudo-classes', () => {
    const css =
      '@media (min-width:20rem){.a_x__1:hover{color:red}}' +
      '@media (min-width:20rem){.b_y__2:not(:visited){color:blue}}';

    expect(mediaBlocks(mergeCssMediaQueries(css))).toBe(1);
  });

  it('leaves css without media queries untouched', () => {
    const css = '.a_x__1{color:red}:root{--token:1rem}';

    expect(mergeCssMediaQueries(css)).toBe(css);
  });

  it('returns the original css when it cannot be parsed', () => {
    const css = '@media (min-width:20rem){.a_x__1{color:red}';

    expect(mergeCssMediaQueries(css)).toBe(css);
  });
});
