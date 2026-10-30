import treeshakeCssModuleRules from '.';

describe('treeshakeCssModuleRules', () => {
  it('removes rules for module classes not referenced by the page', () => {
    expect(
      treeshakeCssModuleRules(
        '.AccountHeader_link__abc{color:blue}.icons_mask__def{display:block}',
        '<span class="icons_mask__def"></span>',
      ),
    ).toBe('.icons_mask__def{display:block}');
  });

  it('keeps element-qualified classes and their interactive states when present', () => {
    const css =
      'a.Link_link__abc:hover{color:red}.Link_link__abc:focus{color:blue}';

    expect(
      treeshakeCssModuleRules(css, "<a class='Link_link__abc'>Link</a>"),
    ).toBe(css);
  });

  it('removes unused selectors from a mixed selector list', () => {
    expect(
      treeshakeCssModuleRules(
        '.Card_unused__abc,.Card_used__def,a{color:red}',
        '<div class="Card_used__def"></div>',
      ),
    ).toBe('.Card_used__def,a{color:red}');
  });

  it('does not split selector lists inside functional pseudo-classes', () => {
    const css =
      ':is(.Card_unused__abc,.Card_used__def){color:red}:not(.Card_unused__abc){display:block}';

    expect(treeshakeCssModuleRules(css, '')).toBe(css);
  });

  it('keeps global selectors, Emotion rules, and non-leading module classes', () => {
    const css =
      'body{margin:0}.css-abc:hover{color:red}a .Card_unused__abc{color:blue}';

    expect(treeshakeCssModuleRules(css, '')).toBe(css);
  });

  it('keeps classes referenced by AMP actions even if absent from class attributes', () => {
    const css = '.Navigation_open__abc{display:block}';
    const html =
      '<button on="tap:nav.toggleClass(class=Navigation_open__abc)">Menu</button>';

    expect(treeshakeCssModuleRules(css, html)).toBe(css);
  });

  it('keeps classes referenced by AMP class bindings', () => {
    const css = '.Navigation_open__abc{display:block}';
    const html = "<nav [class]=\"open ? 'Navigation_open__abc' : ''\"></nav>";

    expect(treeshakeCssModuleRules(css, html)).toBe(css);
  });

  it('prunes rules inside media and supports queries without dropping used states', () => {
    expect(
      treeshakeCssModuleRules(
        '@media(forced-colors:active){@supports(mask:url("")){.icons_unused__abc{color:ButtonText}.icons_mask__def{color:inherit}}}',
        '<span class="icons_mask__def"></span>',
      ),
    ).toBe(
      '@media(forced-colors:active){@supports(mask:url("")){.icons_mask__def{color:inherit}}}',
    );
  });

  it('preserves font faces, keyframes, custom properties, and layer ordering', () => {
    const css =
      '@layer components{}:root{--brand:red}@font-face{font-family:Reith;src:url(font.woff2)}@keyframes spin{to{transform:rotate(360deg)}}';

    expect(treeshakeCssModuleRules(css, '')).toBe(css);
  });

  it('does not remove an escaped class by matching only its prefix', () => {
    const css = '.Card_link__abc\\:def{color:red}';

    expect(treeshakeCssModuleRules(css, '')).toBe(css);
  });

  it('matches complete class names rather than prefixes', () => {
    expect(
      treeshakeCssModuleRules(
        '.Card_link__abc{color:red}.Card_link__abcd{color:blue}',
        '<div class="Card_link__abcd"></div>',
      ),
    ).toBe('.Card_link__abcd{color:blue}');
  });

  it('returns empty CSS unchanged', () => {
    expect(treeshakeCssModuleRules('', '<main></main>')).toBe('');
  });
});
