export const testNonHTMLResponseCode = (path, responseCode) => {
  cy.request(path).then(({ status }) => {
    expect(status).to.eq(responseCode);
  });
};

export const getElement = element => cy.get(element);

export const getSecondElement = element => cy.get(element).eq(1);

export const shouldContainText = (element, text) => {
  element.should('contain', text);
};

export const shouldContainStyles = (element, css, styling) => {
  element.should(el => {
    expect(el).to.have.css(css, styling);
  });
};

export const checkElementStyles = (elementString, text, color, fontFamily) => {
  const el = getElement(elementString);
  shouldContainText(el, text);
  shouldContainStyles(el, 'color', color);
  shouldContainStyles(el, 'font-family', fontFamily);
};

export const checkFooterLinks = (position, url) => {
  cy.get('a')
    .eq(position)
    .should('have.attr', 'href')
    .and('contain', url);
};

export const checkLinkStyling = position => {
  const link = cy.get('a').eq(position);
  shouldContainStyles(link, 'color', 'rgb(255, 255, 255)');
  link.focus();
  const linkSpan = link.get('span').eq(position);
  shouldContainStyles(
    linkSpan,
    'border-bottom',
    '2px solid rgb(255, 255, 255)',
  );
  link.invoke('mouseover');
  shouldContainStyles(
    linkSpan,
    'border-bottom',
    '2px solid rgb(255, 255, 255)',
  );
};

export const clickInlineLinkAndTestPageHasHTML = (link, url) => {
  getElement(link).click();
  cy.url().should('contain', url);
  const anchorElement = getElement('header a');
  shouldContainText(anchorElement, 'BBC News');
};

export const figureVisibility = figure => {
  figure.should('be.visible');
  figure.should('to.have.descendants', 'img');
};

export const retrieveMetaDataContent = (metaDataTag, content) => {
  const metaElement = getElement(metaDataTag);
  metaElement.should('have.attr', 'content', content);
};

export const openGraphMeta = (
  description,
  imageUrl,
  altText,
  locale,
  siteName,
  title,
  type,
  url,
) => {
  it('should have OpenGraph meta data', () => {
    retrieveMetaDataContent('head meta[name="og:description"]', description);
    retrieveMetaDataContent('head meta[name="og:image"]', imageUrl);
    retrieveMetaDataContent('head meta[name="og:image:alt"]', altText);
    retrieveMetaDataContent('head meta[name="og:locale"]', locale);
    retrieveMetaDataContent('head meta[name="og:site_name"]', siteName);
    retrieveMetaDataContent('head meta[name="og:title"]', title);
    retrieveMetaDataContent('head meta[name="og:type"]', type);
    retrieveMetaDataContent('head meta[name="og:url"]', url);
  });
};

export const twitterMeta = (
  card,
  creator,
  description,
  imageAlt,
  imageSrc,
  site,
  title,
) => {
  it('should have Twitter meta data', () => {
    retrieveMetaDataContent('head meta[name="twitter:card"]', card);
    retrieveMetaDataContent('head meta[name="twitter:creator"]', creator);
    retrieveMetaDataContent(
      'head meta[name="twitter:description"]',
      description,
    );
    retrieveMetaDataContent('head meta[name="twitter:image:alt"]', imageAlt);
    retrieveMetaDataContent('head meta[name="twitter:image:src"]', imageSrc);
    retrieveMetaDataContent('head meta[name="twitter:site"]', site);
    retrieveMetaDataContent('head meta[name="twitter:title"]', title);
  });
};

export const visibleImageNoCaption = figure => {
  figureVisibility(figure);
  figure.should('not.to.have.descendants', 'figcaption');
};

export const visibleImageWithCaption = figure => {
  figureVisibility(figure);
  figure.should('to.have.descendants', 'figcaption');
};
