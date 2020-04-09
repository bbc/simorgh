/**
 * @pathname /tamil/bbc_tamil_radio/liveradio
 */

it('I can see a page title - AMP', () => {
  const pageTitle = amp.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(`"பிபிசி தமிழோசை - BBC News தமிழ்"`);
});

it('I can see a page title - Canonical', () => {
  const pageTitle = canonical.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(`"பிபிசி தமிழோசை - BBC News தமிழ்"`);
});

it(`I can see the brand logo in the header - AMP`, () => {
  const logo = amp.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(
    `"BBC News, தமிழ்"`,
  );
});

it(`I can see the brand logo in the header - Canonical`, () => {
  const logo = canonical.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(
    `"BBC News, தமிழ்"`,
  );
});

it('I can see a skip to content link that links to the main content of the page - AMP', () => {
  const skipToContentEl = amp.document.querySelector('[href="#content"]');
  const h1El = amp.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(
    `"உள்ளடக்கத்துக்குத் தாண்டிச் செல்க"`,
  );
});

it('I can see a headline - AMP', () => {
  const headline = amp.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(`"பிபிசி தமிழோசை"`);
});

it('I can see a skip to content link that links to the main content of the page - Canonical', () => {
  const skipToContentEl = canonical.document.querySelector('[href="#content"]');
  const h1El = canonical.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(
    `"உள்ளடக்கத்துக்குத் தாண்டிச் செல்க"`,
  );
});

it('I can see a headline - Canonical', () => {
  const headline = canonical.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(`"பிபிசி தமிழோசை"`);
});

it('I can see the summary - AMP', () => {
  const summaryEl = amp.document.querySelector('main p');

  expect(summaryEl).toBeInTheDocument();
  expect(summaryEl.textContent).toMatchInlineSnapshot(
    `"சர்வதேச, இந்திய, இலங்கை செய்திகள் மற்றும் நடப்புத் தகவல்களை வழங்கும் ஓர் நிகழ்ச்சி. அறிவியல், விளையாட்டு, கலை, கலாச்சாரம் மற்றும் பொழுதுபோக்கு தொடர்பான செய்திகளும் இதில் இடம்பெறும். சிற்றலை வானொலியிலும் பிபிசிதமிழ்.காம் இணையதளத்திலும் இதைக் கேட்கலாம்."`,
  );
});

it('I can see the summary - Canonical', () => {
  const summaryEl = canonical.document.querySelector('main p');

  expect(summaryEl).toBeInTheDocument();
  expect(summaryEl.textContent).toMatchInlineSnapshot(
    `"சர்வதேச, இந்திய, இலங்கை செய்திகள் மற்றும் நடப்புத் தகவல்களை வழங்கும் ஓர் நிகழ்ச்சி. அறிவியல், விளையாட்டு, கலை, கலாச்சாரம் மற்றும் பொழுதுபோக்கு தொடர்பான செய்திகளும் இதில் இடம்பெறும். சிற்றலை வானொலியிலும் பிபிசிதமிழ்.காம் இணையதளத்திலும் இதைக் கேட்கலாம்."`,
  );
});

it('I can see an audio player embed - Canonical', () => {
  const audioPlayerIframe = canonical.document.querySelector('iframe');

  expect(audioPlayerIframe).toBeInTheDocument();
  expect(audioPlayerIframe.getAttribute('src')).toMatchInlineSnapshot(
    `"https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_tamil_radio/liveradio/ta"`,
  );
});

it('I can see an audio player image placeholder - AMP', () => {
  const audioPlaceholderImage = amp.document.querySelector(
    'amp-img[src="http://localhost:7080/images/amp_audio_placeholder.png"]',
  );

  expect(audioPlaceholderImage).toBeInTheDocument();
});

it('I can see an audio player embed - AMP', () => {
  const audioPlayerIframe = amp.document.querySelector('amp-iframe');

  expect(audioPlayerIframe.getAttribute('src')).toMatchInlineSnapshot(
    `"https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_tamil_radio/liveradio/ta/amp"`,
  );
});

it('I can see the footer copyright - AMP', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020 பிபிசி. வெளியார் இணைய தளங்களின் உள்ளடக்கத்துக்கு பிபிசி பொறுப்பாகாது. வெளியார் இணைப்புகள் தொடர்பான எங்கள் அணுகுமுறையைப் பற்றி படிக்கவும்."`,
  );
});

it('I can see the footer copyright - Canonical', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020 பிபிசி. வெளியார் இணைய தளங்களின் உள்ளடக்கத்துக்கு பிபிசி பொறுப்பாகாது. வெளியார் இணைப்புகள் தொடர்பான எங்கள் அணுகுமுறையைப் பற்றி படிக்கவும்."`,
  );
});
