import { getElement, metaDataTags } from '../support/testHelper';

describe('Persian Article Meta Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c0000000025o' & 'c0000000027o' are available within the PROD enviroment
    cy.visit('/persian/articles/c0000000028o');
  });

  it('should have a nofollow meta tag', () => {
    const metaElement = getElement('head meta[name="robots"]');
    metaElement.should('have.attr', 'content', 'nofollow');
  });

  it('should have Facebook meta data', () => {
    metaDataTags(
      'head meta[name="article:author"]',
      'https://www.facebook.com/bbcnews',
    );
  });

  it('should have OpenGraph meta data', () => {
    metaDataTags(
      'head meta[name="og:description"]',
      'شاید خیلی طول نکشد که زمانی برسد که وقتی خسته هستید و مثلا هوس فنجان قهوه‌ای را کردید، پهپادی را ببینید که با قهوه سراغتان می‌آید.',
    );
    metaDataTags(
      'head meta[name="og:image"]',
      'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
    );
    metaDataTags('head meta[name="og:image:alt"]', 'BBC News فارسی');
    metaDataTags('head meta[name="og:locale"]', 'fa');
    metaDataTags('head meta[name="og:site_name"]', 'BBC News فارسی');
    metaDataTags(
      'head meta[name="og:title"]',
      'پهپادی که برایتان قهوه می‌آورد',
    );
    metaDataTags('head meta[name="og:type"]', 'article');
    metaDataTags(
      'head meta[name="og:url"]',
      'https://www.bbc.com/persian/articles/c0000000028o',
    );
  });

  it('should have Twitter meta data', () => {
    metaDataTags('head meta[name="twitter:card"]', 'summary_large_image');
    metaDataTags('head meta[name="twitter:creator"]', '@bbcpersian');
    metaDataTags(
      'head meta[name="twitter:description"]',
      'شاید خیلی طول نکشد که زمانی برسد که وقتی خسته هستید و مثلا هوس فنجان قهوه‌ای را کردید، پهپادی را ببینید که با قهوه سراغتان می‌آید.',
    );
    metaDataTags('head meta[name="twitter:image:alt"]', 'BBC News فارسی');
    metaDataTags(
      'head meta[name="twitter:image:src"]',
      'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
    );
    metaDataTags('head meta[name="twitter:site"]', '@bbcpersian');
    metaDataTags(
      'head meta[name="twitter:title"]',
      'پهپادی که برایتان قهوه می‌آورد',
    );
  });
});
