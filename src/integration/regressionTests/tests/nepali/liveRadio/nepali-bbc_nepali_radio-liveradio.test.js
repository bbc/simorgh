/**
 * @pathname /nepali/bbc_nepali_radio/liveradio
 */

it('I can see a page title - AMP', () => {
  const pageTitle = amp.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(
    `"बीबीसी नेपाली रेडियो - BBC News नेपाली"`,
  );
});

it('I can see a page title - Canonical', () => {
  const pageTitle = canonical.document.querySelector('title').textContent;

  expect(pageTitle).toBeTruthy();
  expect(pageTitle).toMatchInlineSnapshot(
    `"बीबीसी नेपाली रेडियो - BBC News नेपाली"`,
  );
});

it(`I can see the brand logo in the header - AMP`, () => {
  const logo = amp.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(
    `"BBC News, नेपाली"`,
  );
});

it(`I can see the brand logo in the header - Canonical`, () => {
  const logo = canonical.document.querySelector('header svg');

  expect(logo).toBeInTheDocument();
  expect(logo.parentNode.textContent).toMatchInlineSnapshot(
    `"BBC News, नेपाली"`,
  );
});

it('I can see a skip to content link that links to the main content of the page - AMP', () => {
  const skipToContentEl = amp.document.querySelector('[href="#content"]');
  const h1El = amp.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(
    `"सामग्रीमा जानुहोस्"`,
  );
});

it('I can see a headline - AMP', () => {
  const headline = amp.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(`"बीबीसी नेपाली रेडियो"`);
});

it('I can see a skip to content link that links to the main content of the page - Canonical', () => {
  const skipToContentEl = canonical.document.querySelector('[href="#content"]');
  const h1El = canonical.document.querySelector('h1');

  expect(skipToContentEl.getAttribute('href')).toBe('#content');
  expect(h1El.getAttribute('id')).toBe('content');
  expect(h1El.getAttribute('tabindex')).toBe('-1');
  expect(skipToContentEl.textContent).toMatchInlineSnapshot(
    `"सामग्रीमा जानुहोस्"`,
  );
});

it('I can see a headline - Canonical', () => {
  const headline = canonical.document.querySelector('h1').textContent;

  expect(headline).toBeTruthy();
  expect(headline).toMatchInlineSnapshot(`"बीबीसी नेपाली रेडियो"`);
});

it('I can see the summary - AMP', () => {
  const summaryEl = amp.document.querySelector('main p');

  expect(summaryEl).toBeInTheDocument();
  expect(summaryEl.textContent).toMatchInlineSnapshot(
    `"नेपाली भाषामा बीबीसी विश्व सेवाको राष्ट्रिय तथा अन्तर्राष्ट्रिय समाचार तथा समसामयिक चर्चा, राष्ट्रिय तथा अन्तर्राष्ट्रिय समाचार विश्लेषण, समाचारमा रहेका व्यक्तित्वहरुसंगको अन्तर्वार्ता, साप्ताहिक बहस तथा छलफल, विज्ञान, स्वास्थ्य."`,
  );
});

it('I can see the summary - Canonical', () => {
  const summaryEl = canonical.document.querySelector('main p');

  expect(summaryEl).toBeInTheDocument();
  expect(summaryEl.textContent).toMatchInlineSnapshot(
    `"नेपाली भाषामा बीबीसी विश्व सेवाको राष्ट्रिय तथा अन्तर्राष्ट्रिय समाचार तथा समसामयिक चर्चा, राष्ट्रिय तथा अन्तर्राष्ट्रिय समाचार विश्लेषण, समाचारमा रहेका व्यक्तित्वहरुसंगको अन्तर्वार्ता, साप्ताहिक बहस तथा छलफल, विज्ञान, स्वास्थ्य."`,
  );
});

it('I can see an audio player embed - Canonical', () => {
  const audioPlayerIframe = canonical.document.querySelector('iframe');

  expect(audioPlayerIframe).toBeInTheDocument();
  expect(audioPlayerIframe.getAttribute('src')).toMatchInlineSnapshot(
    `"https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_nepali_radio/liveradio/ne"`,
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
    `"https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_nepali_radio/liveradio/ne/amp"`,
  );
});

it('I can see the footer copyright - AMP', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020 २०१९ बीबीसी। अन्य वेबसाइटका सामग्रीहरूका लागि बीबीसी जिम्मेवार छैन। बाह्य वेबसाइटको लिङ्क प्रयोग सम्बन्धमा हाम्रो नीति पढ्नुहोस्।"`,
  );
});

it('I can see the footer copyright - Canonical', () => {
  const footerCopyright = amp.document.querySelector('footer div p')
    .textContent;

  expect(footerCopyright).toBeTruthy();
  expect(footerCopyright).toMatchInlineSnapshot(
    `"© 2020 २०१९ बीबीसी। अन्य वेबसाइटका सामग्रीहरूका लागि बीबीसी जिम्मेवार छैन। बाह्य वेबसाइटको लिङ्क प्रयोग सम्बन्धमा हाम्रो नीति पढ्नुहोस्।"`,
  );
});
