Feature('Page Furniture');

Before(I => {
  I.amOnPage('/pidgin');
});

// Metadata
Scenario('renders structured data', I => {
  I.seeTagHasValue('script', 'type', 'application/ld+json');
});

Scenario('renders canonical and amp links', I => {
  I.seeTagHasValue(
    'link[rel=canonical]',
    'href',
    'http://localhost:7080/pidgin',
  );
  I.seeTagHasValue(
    'link[rel=amphtml]',
    'href',
    'http://localhost:7080/pidgin.amp',
  );
});

Scenario('has opengraph meta data', I => {
  I.seeTagExists('meta[property="og:image"]');
  I.seeTagExists('meta[property="og:image:alt"]');
  I.seeTagExists('meta[property="og:locale"]');
  I.seeTagExists('meta[property="og:site_name"]');
  I.seeTagExists('meta[property="og:title"]');
  I.seeTagExists('meta[property="og:type"]');
  I.seeTagExists('meta[property="og:url"]');
});

Scenario('has twitter card meta data', I => {
  I.seeTagExists('meta[name="twitter:card"]');
  I.seeTagExists('meta[name="twitter:description"]');
  I.seeTagExists('meta[name="twitter:creator"]');
  I.seeTagExists('meta[name="twitter:image:alt"]');
  I.seeTagExists('meta[name="twitter:image:src"]');
  I.seeTagExists('meta[name="twitter:site"]');
  I.seeTagExists('meta[name="twitter:title"]');
});

// Page Header
Scenario('shows bbc brand logo', I => {
  I.seeElement('=brand-banner');
});

Scenario('header brand has a link to the homepage', () => {
  within('=brand-banner', () => {
    locate('a').withAttr({ href: '/pidgin' });
  });
});

Scenario('has a skip to content link', I => {
  within('=brand-banner', () => {
    locate('SkipLink').withAttr({ href: '#content' });
  });
});

Scenario('has navigation', I => {
  within('[role=banner]', () => {
    I.seeElement('nav');
  });
});

Scenario('has a body with a main element', I => {
  within('body', () => {
    I.seeElement('main[role=main]');
  });
});

// Page Footer
Scenario('shows footer', I => {
  I.seeElement('=page-footer');
});

Scenario('shows brand container inside the footer', I => {
  within('=page-footer', () => {
    I.seeElement('=footer-brand');
  });
});

Scenario('footer brand has a link to the homepage', () => {
  within('=footer-brand', () => {
    locate('a').withAttr({ href: '/pidgin' });
  });
});
