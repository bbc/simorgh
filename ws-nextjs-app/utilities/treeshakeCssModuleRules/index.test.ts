import loggerMock from '#testHelpers/loggerMock';
import treeshakeCssCustomProperties from '#utilities/treeshakeCssCustomProperties';
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

  it('keeps global selectors and Emotion rules but prunes unused required descendant classes', () => {
    const css =
      'body{margin:0}.css-abc:hover{color:red}a .Card_unused__abc{color:blue}';

    expect(treeshakeCssModuleRules(css, '')).toBe(
      'body{margin:0}.css-abc:hover{color:red}',
    );
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

  it('removes empty container queries that are invalid in AMP', () => {
    expect(
      treeshakeCssModuleRules(
        '@container(min-width:60rem){.Carousel_unused__abc{display:flex}}',
        '',
      ),
    ).toBe('');
  });

  it('keeps container queries containing rendered module classes', () => {
    const css =
      '@container(min-width:60rem){.Carousel_used__abc{display:flex}}';

    expect(
      treeshakeCssModuleRules(css, '<div class="Carousel_used__abc"></div>'),
    ).toBe(css);
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

describe('treeshakeCssModuleRules', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('removes unused component and variant rules', () => {
    const css =
      '.Promo_card__abc{color:red}.Promo_compact__def{color:blue}.SaveButton_button__ghi{display:flex}';

    expect(
      treeshakeCssModuleRules(css, '<div class="Promo_card__abc">Promo</div>'),
    ).toBe('.Promo_card__abc{color:red}');
  });

  it('prunes individual selectors without removing a used selector in the same rule', () => {
    const css = '.Promo_missing__def,.Promo_card__abc:hover{color:red}';

    expect(
      treeshakeCssModuleRules(css, '<div class="Promo_card__abc"></div>'),
    ).toBe('.Promo_card__abc:hover{color:red}');
  });

  it('handles commas inside functional pseudo-classes and attribute values', () => {
    const css =
      '.Promo_missing__def,.Promo_card__abc:is(:hover,:focus)[data-label="a,b"]{color:red}';

    expect(
      treeshakeCssModuleRules(css, '<div class="Promo_card__abc"></div>'),
    ).toBe('.Promo_card__abc:is(:hover,:focus)[data-label="a,b"]{color:red}');
  });

  it.each([
    '.Promo_card__abc:hover',
    '.Promo_card__abc:focus-visible',
    '.Promo_card__abc::before',
    '.Promo_card__abc[aria-expanded=true]',
    '[data-is-dark-ui=true] .Promo_card__abc',
    '.Promo_card__abc:not(.Promo_missing__def)',
    '.Promo_card__abc:has(.Promo_missing__def)',
    ':is(.Promo_missing__def,.Promo_card__abc)',
    ':where(.Promo_missing__def,.Promo_card__abc)',
    '.Promo_card__abc:nth-child(2n of .Promo_missing__def)',
  ])('preserves state-dependent selector %s', selector => {
    const css = `${selector}{color:red}`;

    expect(
      treeshakeCssModuleRules(css, '<div class="Promo_card__abc"></div>'),
    ).toBe(css);
  });

  it('removes a selector when a required ancestor or variant class is absent', () => {
    const css =
      '.Promo_missing__def .Promo_card__abc{color:red}.Promo_card__abc.Promo_missing__def{color:blue}';

    expect(
      treeshakeCssModuleRules(css, '<div class="Promo_card__abc"></div>'),
    ).toBe('');
  });

  it('preserves global, Emotion and AMP-runtime selectors', () => {
    const css =
      ':root{--color:red}body{margin:0}.css-abc{color:red}.i-amphtml-hidden{display:none}[class~="Promo_card__abc"]{color:blue}';

    expect(treeshakeCssModuleRules(css, '<body></body>')).toBe(css);
  });

  it('preserves classes referenced in AMP bindings and template content', () => {
    const css =
      '.Promo_open__abc{display:block}.Promo_closed__def{display:none}';
    const html =
      "<div data-amp-bind-class=\"open ? 'Promo_open__abc' : 'Promo_closed__def'\"></div>";

    expect(treeshakeCssModuleRules(css, html)).toBe(css);
  });

  it('retains rules at every breakpoint and removes empty conditional blocks', () => {
    const css =
      '@media(min-width:20rem){.Promo_missing__def{color:red}}@supports(display:grid){.Promo_card__abc{display:grid}}@media(min-width:40rem){.Promo_card__abc{color:blue}}';

    expect(
      treeshakeCssModuleRules(css, '<div class="Promo_card__abc"></div>'),
    ).toBe(
      '@supports(display:grid){.Promo_card__abc{display:grid}}@media(min-width:40rem){.Promo_card__abc{color:blue}}',
    );
  });

  it('preserves font faces, keyframes and layer ordering', () => {
    const css =
      '@font-face{font-family:ReithSans;src:url(font.woff2)}@keyframes fade{from{opacity:0}to{opacity:1}}@layer components{}';

    expect(treeshakeCssModuleRules(css, '<body></body>')).toBe(css);
  });

  it('removes empty nested conditional blocks without removing layer declarations', () => {
    const css =
      '@layer components{@media(min-width:20rem){@supports(display:grid){.Promo_missing__def{display:grid}}}}';

    expect(treeshakeCssModuleRules(css, '')).toBe('@layer components{}');
  });

  it('allows custom properties used only by removed rules to be pruned afterwards', () => {
    const css =
      ':root{--used:red;--unused:blue}.Promo_card__abc{color:var(--used)}.Promo_missing__def{color:var(--unused)}';
    const html = '<div class="Promo_card__abc"></div>';

    expect(
      treeshakeCssCustomProperties(treeshakeCssModuleRules(css, html), html),
    ).toBe(':root{--used:red;}.Promo_card__abc{color:var(--used)}');
  });

  it('keeps page-specific results independent across requests', () => {
    const css = '.Promo_card__abc{color:red}.Promo_compact__def{color:blue}';

    expect(
      treeshakeCssModuleRules(css, '<div class="Promo_card__abc"></div>'),
    ).toBe('.Promo_card__abc{color:red}');
    expect(
      treeshakeCssModuleRules(css, '<div class="Promo_compact__def"></div>'),
    ).toBe('.Promo_compact__def{color:blue}');
  });

  it('keeps a stylesheet with unused component chunks below the AMP byte limit', () => {
    const unusedRules = Array.from(
      { length: 1600 },
      (_, index) =>
        `.UnusedComponent_variant${index}__abc{font-family:var(--sans-regular-font-family);color:red}`,
    ).join('');
    const css = `.Promo_card__abc{color:red}${unusedRules}`;

    expect(Buffer.byteLength(css, 'utf8')).toBeGreaterThan(75000);
    const result = treeshakeCssModuleRules(
      css,
      '<div class="Promo_card__abc"></div>',
    );

    expect(Buffer.byteLength(result, 'utf8')).toBeLessThanOrEqual(75000);
    expect(result).toBe('.Promo_card__abc{color:red}');
  });

  it('returns empty CSS unchanged', () => {
    expect(treeshakeCssModuleRules('', '')).toBe('');
  });

  it('logs parsing errors and retains the original stylesheet', () => {
    const css = '.Promo_card__abc{color:red';

    expect(treeshakeCssModuleRules(css, '')).toBe(css);
    expect(loggerMock.error).toHaveBeenCalledWith(
      'amp_lite_css_tree_shake_error',
      expect.objectContaining({ message: expect.any(String) }),
    );
  });

  it('logs selector parsing errors and retains the original stylesheet', () => {
    const css = '.Promo_card__abc::{color:red}';

    expect(treeshakeCssModuleRules(css, '')).toBe(css);
    expect(loggerMock.error).toHaveBeenCalledWith(
      'amp_lite_css_tree_shake_error',
      expect.objectContaining({ message: expect.any(String) }),
    );
  });
});
