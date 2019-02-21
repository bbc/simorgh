import { getElement } from './bodyTestHelper';

export const testResponseCode = (path, responseCode) => {
  cy.request({ url: path, failOnStatusCode: false }).then(({ status }) => {
    expect(status).to.eq(responseCode);
  });
};

export const testContentType = (path, contentType) => {
  cy.request(path).then(({ headers }) => {
    expect(headers).to.have.property('content-type', contentType);
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

export const metaDataDescription = description => {
  retrieveMetaDataContent('head meta[name="description"]', description);
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

export const retrieve404BodyResponse = (url, bodyResponse) => {
  cy.request({ url, failOnStatusCode: false })
    .its('body')
    .should('include', bodyResponse);
};
