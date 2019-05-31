import { getElement } from './bodyTestHelper';

export const testResponseCode = (path, responseCode) => {
  cy.request({ url: path, failOnStatusCode: false }).then(({ status }) => {
    expect(status).to.eq(responseCode);
  });
};

export const mozartFallbackStatus = path => {
  cy.request(path).then(({ headers }) => {
    expect(headers).not.to.have.property('x-mfa');
  });
};

export const assertCookieValue = (cookieName, value) => {
  cy.getCookie(cookieName).should('have.property', 'value', value);
};

export const assertCookieExpiryDate = (cookieName, timestamp) => {
  const testBuffer = 60;
  cy.getCookie(cookieName).then(c => {
    expect(c.expiry).to.be.within(
      timestamp - testBuffer,
      timestamp + testBuffer,
    );
  });
};

export const testContentTypeContains = (path, contentType) => {
  cy.request(path).then(({ headers }) => {
    expect(headers['content-type']).to.include(contentType);
  });
};

export const retrieveMetaDataContent = (metaDataTag, content) => {
  const metaElement = getElement(metaDataTag);
  metaElement.should('have.attr', 'content', content);
};

export const facebookMeta = (fbAdmins, appID, articleAuthor) => {
  it('should have Facebook meta data', () => {
    retrieveMetaDataContent('head meta[name="fb:admins"]', fbAdmins);
    retrieveMetaDataContent('head meta[name="fb:app_id"]', appID);
    retrieveMetaDataContent('head meta[name="article:author"]', articleAuthor);
  });
};

export const openGraphMeta = (
  description, // eslint-disable-line no-unused-vars
  imageUrl,
  altText,
  locale,
  siteName,
  title, // eslint-disable-line no-unused-vars
  type,
  url,
) => {
  it('should have OpenGraph meta data', () => {
    // retrieveMetaDataContent('head meta[name="og:description"]', description); // !!! Remove eslint-disabling comment above when un-commenting this test.
    retrieveMetaDataContent('head meta[name="og:image"]', imageUrl);
    retrieveMetaDataContent('head meta[name="og:image:alt"]', altText);
    retrieveMetaDataContent('head meta[name="og:locale"]', locale);
    retrieveMetaDataContent('head meta[name="og:site_name"]', siteName);
    // retrieveMetaDataContent('head meta[name="og:title"]', title); // !!! Remove eslint-disabling comment above when un-commenting this test.
    retrieveMetaDataContent('head meta[name="og:type"]', type);
    retrieveMetaDataContent('head meta[name="og:url"]', url);
  });
};

export const twitterMeta = (
  card,
  creator,
  description, // eslint-disable-line no-unused-vars
  imageAlt,
  imageSrc,
  site,
  title, // eslint-disable-line no-unused-vars
) => {
  it('should have Twitter meta data', () => {
    retrieveMetaDataContent('head meta[name="twitter:card"]', card);
    retrieveMetaDataContent('head meta[name="twitter:creator"]', creator);
    // retrieveMetaDataContent(
    //   'head meta[name="twitter:description"]',
    //   description,
    // ); // !!! Remove eslint-disabling comment above when un-commenting this test.
    retrieveMetaDataContent('head meta[name="twitter:image:alt"]', imageAlt);
    retrieveMetaDataContent('head meta[name="twitter:image:src"]', imageSrc);
    retrieveMetaDataContent('head meta[name="twitter:site"]', site);
    // retrieveMetaDataContent('head meta[name="twitter:title"]', title); // !!! Remove eslint-disabling comment above when un-commenting this test.
  });
};

export const checkCanonicalURL = URL => {
  const canonical = getElement('head link[rel="canonical"]');
  canonical.should('have.attr', 'href', URL);
};

export const checkAmpHTML = amphtml => {
  const ampHtml = getElement('head link[rel="amphtml"]');
  ampHtml.should('have.attr', 'href', amphtml);
};

export const retrieve404BodyResponse = (url, bodyResponse) => {
  cy.request({ url, failOnStatusCode: false })
    .its('body')
    .should('include', bodyResponse);
};

export const checkDataMatchesMetadata = data => {
  const description = data.promo.summary || data.promo.headlines.seoHeadline;
  const title = data.promo.headlines.seoHeadline;
  const { language } = data.metadata.passport;
  const { type } = data.metadata;
  const firstPublished = new Date(data.metadata.firstPublished).toISOString();
  const lastPublished = new Date(data.metadata.lastPublished).toISOString();

  retrieveMetaDataContent('head meta[name="description"]', description);
  retrieveMetaDataContent('head meta[name="og:title"]', title);
  retrieveMetaDataContent('head meta[name="og:type"]', type);
  retrieveMetaDataContent(
    'head meta[name="article:published_time"]',
    firstPublished,
  );
  retrieveMetaDataContent(
    'head meta[name="article:modified_time"]',
    lastPublished,
  );
  getElement('html').should('have.attr', 'lang', language);
};
export const metadataAssertion = () => {
  cy.window().then(win => {
    const windowData = win.SIMORGH_DATA.pageData;
    checkDataMatchesMetadata(windowData);
  });
};

// This will only work if you visit the matching canonical
// url prior to running this.

export const metadataAssertionAMP = AMPURL => {
  cy.window().then(win => {
    const windowData = win.SIMORGH_DATA.pageData;
    cy.visit(AMPURL);
    checkDataMatchesMetadata(windowData);
  });
};

// AMP overrides the Window data in window.SIMORGH_DATA. In order to get
// around this we visit the canonical page first to retrieve
// window.SIMORGH_DATA and use this to compare against the metadata
// served in the head of an AMP page.
