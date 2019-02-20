import config from '../support/config';
import {
  facebookMeta,
  openGraphMeta,
  retrieveMetaDataContent,
  twitterMeta,
} from '../support/metaTestHelper';

describe('Persian Article Meta Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/persian/articles/${config.assets.persian}`);
  });

  it('should have a nofollow meta tag', () => {
    retrieveMetaDataContent('head meta[name="robots"]', 'noindex,nofollow');
  });

  facebookMeta(
    '100004154058350',
    '1609039196070050',
    'https://www.facebook.com/bbcnews',
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
});
