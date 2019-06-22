import config from '../../support/config';
import { describeForLocalAndTest } from '../../support/limitEnvRuns';
import {
  facebookMeta,
  metadataAssertion,
  metadataAssertionAMP,
  openGraphMeta,
  retrieveMetaDataContent,
  twitterMeta,
} from '../../support/metaTestHelper';

describeForLocalAndTest('Persian Article Meta Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/persian/articles/${config.assets.persian}`);
  });

  it('should have the correct lang & dir attributes', () => {
    cy.hasHtmlLangDirAttributes({ lang: 'fa', dir: 'rtl' });
  });

  it('should have a nofollow meta tag', () => {
    retrieveMetaDataContent('head meta[name="robots"]', 'noodp,noydir');
  });

  facebookMeta(
    '100004154058350',
    '1609039196070050',
    'https://www.facebook.com/bbcpersian',
  );

  // it('should have description meta data', () => {
  //   metaDataDescription(
  //     'شاید خیلی طول نکشد که زمانی برسد که وقتی خسته هستید و مثلا هوس فنجان قهوه‌ای را کردید، پهپادی را ببینید که با قهوه سراغتان می‌آید.',
  //   );
  // });

  openGraphMeta(
    'شاید خیلی طول نکشد که زمانی برسد که وقتی خسته هستید و مثلا هوس فنجان قهوه‌ای را کردید، پهپادی را ببینید که با قهوه سراغتان می‌آید.',
    'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
    'BBC News فارسی',
    'fa',
    'BBC News فارسی',
    'پهپادی که برایتان قهوه می‌آورد',
    'article',
    `https://www.bbc.com/persian/articles/${config.assets.persian}`,
  );

  twitterMeta(
    'summary_large_image',
    '@bbcpersian',
    'شاید خیلی طول نکشد که زمانی برسد که وقتی خسته هستید و مثلا هوس فنجان قهوه‌ای را کردید، پهپادی را ببینید که با قهوه سراغتان می‌آید.',
    'BBC News فارسی',
    'https://news.files.bbci.co.uk/ws/img/logos/og/persian.png',
    '@bbcpersian',
    'پهپادی که برایتان قهوه می‌آورد',
  );

  it('should include the canonical URL & ampHTML', () => {
    const canonicalOrigin = 'https://www.bbc.com';
    const currentOrigin = window.location.origin;
    cy.get('head link[rel="canonical"]').should(
      'have.attr',
      'href',
      `${canonicalOrigin}/persian/articles/${config.assets.persian}`,
    );
    cy.get('head link[rel="amphtml"]').should(
      'have.attr',
      'href',
      `${currentOrigin}/persian/articles/${config.assets.persian}.amp`,
    );
  });

  it('should include metadata that matches the JSON data', () => {
    metadataAssertion();
  });

  it('should include metadata in the head on AMP pages', () => {
    metadataAssertionAMP(`/persian/articles/${config.assets.persian}.amp`);
  });
});
