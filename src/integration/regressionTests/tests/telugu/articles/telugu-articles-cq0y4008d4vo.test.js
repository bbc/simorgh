/**
 * @pathname /telugu/articles/cq0y4008d4vo
 */

it('I can see a page title - AMP', () => {
  const pageTitle = amp.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(
    `"డక్‌వర్త్ లూయీస్: క్రికెట్ మ్యాచ్‌లో వర్షం పడితే ఫలితం తేల్చేది వీళ్లే... అసలు ఇది ఎలా పుట్టింది? - BBC News తెలుగు"`,
  );
});

it('I can see a page title - Canonical', () => {
  const pageTitle = canonical.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(
    `"డక్‌వర్త్ లూయీస్: క్రికెట్ మ్యాచ్‌లో వర్షం పడితే ఫలితం తేల్చేది వీళ్లే... అసలు ఇది ఎలా పుట్టింది? - BBC News తెలుగు"`,
  );
});

it(`I can see the brand logo in the header - AMP`, () => {
  const logo = amp.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(
    `"BBC News, తెలుగు"`,
  );
});

it(`I can see the brand logo in the header - Canonical`, () => {
  const logo = canonical.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(
    `"BBC News, తెలుగు"`,
  );
});

it('I can see a skip to content link that links to the main content of the page - AMP', () => {
  const skipToContentEl = amp.document.querySelector('[href="#content"]');
  const h1El = amp.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(
    `"కంటెంట్‌కు వెళ్లండి"`,
  );
});

it('I can see a headline - AMP', () => {
  const headline = amp.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(
    `"ఈ పరీక్షా వ్యాసం యొక్క శీర్షిక ఇది"`,
  );
});

it('I can see a skip to content link that links to the main content of the page - Canonical', () => {
  const skipToContentEl = canonical.document.querySelector('[href="#content"]');
  const h1El = canonical.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(
    `"కంటెంట్‌కు వెళ్లండి"`,
  );
});

it('I can see a headline - Canonical', () => {
  const headline = canonical.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(
    `"ఈ పరీక్షా వ్యాసం యొక్క శీర్షిక ఇది"`,
  );
});

it('I can see the footer copyright - AMP', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020  BBC. ఇతర వెబ్‌సైట్లలో సమాచారానికి బీబీసీ బాధ్యత వహించదు. ఇతర వెబ్‌సైట్లకు మా లింకింగ్ విధానం గురించి తెలుసుకోండి."`,
  );
});

it('I can see the footer copyright - Canonical', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020  BBC. ఇతర వెబ్‌సైట్లలో సమాచారానికి బీబీసీ బాధ్యత వహించదు. ఇతర వెబ్‌సైట్లకు మా లింకింగ్ విధానం గురించి తెలుసుకోండి."`,
  );
});
