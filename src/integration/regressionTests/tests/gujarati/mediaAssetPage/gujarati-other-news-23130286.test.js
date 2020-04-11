/**
 * @pathname /gujarati/other-news-23130286
 */

it('I can see a page title - AMP', () => {
  const pageTitle = amp.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(
    `"આગળની સ્લાઇડમાં જુઓ, સબંધિત વધુ તસવીરો... - BBC News ગુજરાતી"`,
  );
});

it('I can see a page title - Canonical', () => {
  const pageTitle = canonical.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(
    `"આગળની સ્લાઇડમાં જુઓ, સબંધિત વધુ તસવીરો... - BBC News ગુજરાતી"`,
  );
});

it(`I can see the brand logo in the header - AMP`, () => {
  const logo = amp.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(
    `"BBC News, ગુજરાતી"`,
  );
});

it(`I can see the brand logo in the header - Canonical`, () => {
  const logo = canonical.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(
    `"BBC News, ગુજરાતી"`,
  );
});

it('I can see a skip to content link that links to the main content of the page - AMP', () => {
  const skipToContentEl = amp.document.querySelector('[href="#content"]');
  const h1El = amp.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(
    `"કન્ટેન્ટ પર જાવ"`,
  );
});

it('I can see a headline - AMP', () => {
  const headline = amp.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(
    `"આગળની સ્લાઇડમાં જુઓ, સબંધિત વધુ તસવીરો..."`,
  );
});

it('I can see a skip to content link that links to the main content of the page - Canonical', () => {
  const skipToContentEl = canonical.document.querySelector('[href="#content"]');
  const h1El = canonical.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(
    `"કન્ટેન્ટ પર જાવ"`,
  );
});

it('I can see a headline - Canonical', () => {
  const headline = canonical.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(
    `"આગળની સ્લાઇડમાં જુઓ, સબંધિત વધુ તસવીરો..."`,
  );
});

it('I can see the footer copyright - AMP', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020 BBC. બહારની વેબસાઇટ્સની સામગ્રી માટે બીબીસી જવાબદાર નથી. બહારની વેબસાઇટ્સની લિંક આપવા અંગેની અમારી નીતિ વિશે વાંચો"`,
  );
});

it('I can see the footer copyright - Canonical', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020 BBC. બહારની વેબસાઇટ્સની સામગ્રી માટે બીબીસી જવાબદાર નથી. બહારની વેબસાઇટ્સની લિંક આપવા અંગેની અમારી નીતિ વિશે વાંચો"`,
  );
});
