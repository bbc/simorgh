import assetsFilter from './index';
import { localBaseUrl } from '../../../testHelpers/config';

describe('assetsFilter', () => {
  describe('production build', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    it('should order assets service bundle, vendor, main on local', () => {
      const input = [
        `${localBaseUrl}/static/js/yoruba-31ecd969.d4952cef.js`,
        `${localBaseUrl}/static/js/main-d0ae3f07.e24ffe78.js`,
        `${localBaseUrl}/static/js/vendor-f9ca8911.836b5376.js`,
        `${localBaseUrl}/static/js/pidgin-31ecd969.652d66cc.js`,
        `${localBaseUrl}/static/js/news-31ecd969.c141cfdc.js`,
        `${localBaseUrl}/static/js/vendor-b23bnb22.nmn32mn2.js`,
        `${localBaseUrl}/static/js/vendor-1f20a385.ff6d3f55.js`,
      ];

      const output = [
        `${localBaseUrl}/static/js/yoruba-31ecd969.d4952cef.js`,
        `${localBaseUrl}/static/js/vendor-f9ca8911.836b5376.js`,
        `${localBaseUrl}/static/js/vendor-b23bnb22.nmn32mn2.js`,
        `${localBaseUrl}/static/js/vendor-1f20a385.ff6d3f55.js`,
        `${localBaseUrl}/static/js/main-d0ae3f07.e24ffe78.js`,
      ];

      expect(assetsFilter(input, 'yoruba')).toEqual(output);
    });

    it('should order assets service bundle, vendor, main on test', () => {
      const input = [
        'https://news.test.files.bbci.co.uk/include/articles/public/static/js/yoruba-31ecd969.d4952cef.js',
        'https://news.test.files.bbci.co.uk/include/articles/public/static/js/main-d0ae3f07.e24ffe78.js',
        'https://news.test.files.bbci.co.uk/include/articles/public/static/js/vendor-f9ca8911.836b5376.js',
        'https://news.test.files.bbci.co.uk/include/articles/public/static/js/pidgin-31ecd969.652d66cc.js',
        'https://news.test.files.bbci.co.uk/include/articles/public/static/js/news-31ecd969.c141cfdc.js',
        'https://news.test.files.bbci.co.uk/include/articles/public/static/js/vendor-b23bnb22.nmn32mn2.js',
        'https://news.test.files.bbci.co.uk/include/articles/public/static/js/vendor-1f20a385.ff6d3f55.js',
      ];

      const output = [
        'https://news.test.files.bbci.co.uk/include/articles/public/static/js/yoruba-31ecd969.d4952cef.js',
        'https://news.test.files.bbci.co.uk/include/articles/public/static/js/vendor-f9ca8911.836b5376.js',
        'https://news.test.files.bbci.co.uk/include/articles/public/static/js/vendor-b23bnb22.nmn32mn2.js',
        'https://news.test.files.bbci.co.uk/include/articles/public/static/js/vendor-1f20a385.ff6d3f55.js',
        'https://news.test.files.bbci.co.uk/include/articles/public/static/js/main-d0ae3f07.e24ffe78.js',
      ];

      expect(assetsFilter(input, 'yoruba')).toEqual(output);
    });

    it('should order assets when url contains service', () => {
      const input = [
        'https://pidgin.com/static/js/yoruba-31ecd969.d4952cef.js',
        'https://pidgin.com/static/js/main-d0ae3f07.e24ffe78.js',
        'https://pidgin.com/static/js/vendor-f9ca8911.836b5376.js',
        'https://pidgin.com/static/js/pidgin-31ecd969.652d66cc.js',
        'https://pidgin.com/static/js/news-31ecd969.c141cfdc.js',
        'https://pidgin.com/static/js/vendor-b23bnb22.nmn32mn2.js',
        'https://pidgin.com/static/js/vendor-1f20a385.ff6d3f55.js',
      ];

      const output = [
        'https://pidgin.com/static/js/pidgin-31ecd969.652d66cc.js',
        'https://pidgin.com/static/js/vendor-f9ca8911.836b5376.js',
        'https://pidgin.com/static/js/vendor-b23bnb22.nmn32mn2.js',
        'https://pidgin.com/static/js/vendor-1f20a385.ff6d3f55.js',
        'https://pidgin.com/static/js/main-d0ae3f07.e24ffe78.js',
      ];

      expect(assetsFilter(input, 'pidgin')).toEqual(output);
    });

    it('should order assets correctly with multiple of each bundle type', () => {
      const input = [
        `${localBaseUrl}/static/js/yoruba-31ecd969.d4952cef.js`,
        `${localBaseUrl}/static/js/main-bh32bjhb.jhjkh423.js`,
        `${localBaseUrl}/static/js/vendor-f9ca8911.836b5376.js`,
        `${localBaseUrl}/static/js/pidgin-31ecd969.652d66cc.js`,
        `${localBaseUrl}/static/js/main-d0ae3f07.e24ffe78.js`,
        `${localBaseUrl}/static/js/yoruba-q2eq22q2.awdawdaw.js`,
        `${localBaseUrl}/static/js/main-n32bnb23.jk2k2jk2.js`,
        `${localBaseUrl}/static/js/news-31ecd969.c141cfdc.js`,
        `${localBaseUrl}/static/js/vendor-b23bnb22.nmn32mn2.js`,
        `${localBaseUrl}/static/js/main-lkkl21k2.mklk2l1l.js`,
        `${localBaseUrl}/static/js/vendor-1f20a385.ff6d3f55.js`,
      ];

      const output = [
        `${localBaseUrl}/static/js/yoruba-31ecd969.d4952cef.js`,
        `${localBaseUrl}/static/js/yoruba-q2eq22q2.awdawdaw.js`,
        `${localBaseUrl}/static/js/vendor-f9ca8911.836b5376.js`,
        `${localBaseUrl}/static/js/vendor-b23bnb22.nmn32mn2.js`,
        `${localBaseUrl}/static/js/vendor-1f20a385.ff6d3f55.js`,
        `${localBaseUrl}/static/js/main-bh32bjhb.jhjkh423.js`,
        `${localBaseUrl}/static/js/main-d0ae3f07.e24ffe78.js`,
        `${localBaseUrl}/static/js/main-n32bnb23.jk2k2jk2.js`,
        `${localBaseUrl}/static/js/main-lkkl21k2.mklk2l1l.js`,
      ];

      expect(assetsFilter(input, 'yoruba')).toEqual(output);
    });

    it('should remove any duplicates', () => {
      const input = [
        `${localBaseUrl}/static/js/yoruba-31ecd969.d4952cef.js`,
        `${localBaseUrl}/static/js/yoruba-31ecd969.d4952cef.js`,
        `${localBaseUrl}/static/js/main-bh32bjhb.jhjkh423.js`,
        `${localBaseUrl}/static/js/main-bh32bjhb.jhjkh423.js`,
        `${localBaseUrl}/static/js/yoruba-31ecd969.d4952cef.js`,
        `${localBaseUrl}/static/js/vendor-f9ca8911.836b5376.js`,
        `${localBaseUrl}/static/js/vendor-f9ca8911.836b5376.js`,
        `${localBaseUrl}/static/js/yoruba-31ecd969.d4952cef.js`,
        `${localBaseUrl}/static/js/main-bh32bjhb.jhjkh423.js`,
        `${localBaseUrl}/static/js/main-bh32bjhb.jhjkh423.js`,
        `${localBaseUrl}/static/js/vendor-f9ca8911.836b5376.js`,
      ];

      const output = [
        `${localBaseUrl}/static/js/yoruba-31ecd969.d4952cef.js`,
        `${localBaseUrl}/static/js/vendor-f9ca8911.836b5376.js`,
        `${localBaseUrl}/static/js/main-bh32bjhb.jhjkh423.js`,
      ];

      expect(assetsFilter(input, 'yoruba')).toEqual(output);
    });
  });

  describe('dev build', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('should allow and order dev bundles', () => {
      const input = [
        'http://localhost:1124/static/js/yoruba-._n.js',
        'http://localhost:1124/static/js/vendor-._node_modules_react-dom_cjs_react-dom.development.js-61bb2bf2.js',
        'http://localhost:1124/static/js/vendor-._node_modules_r.js',
        'http://localhost:1124/static/js/vendor-._node_modules_p.js',
        'http://localhost:1124/static/js/main-._m.js',
        'http://localhost:1124/static/js/vendor-._node_modules_@.js',
        'http://localhost:1124/static/js/pidgin-._n.js',
        'http://localhost:1124/static/js/persian-._n.js',
        'http://localhost:1124/static/js/news-._n.js',
        'http://localhost:1124/static/js/igbo-._n.js',
        'http://localhost:1124/static/js/vendor-._node_modules_h.js',
      ];

      const output = [
        'http://localhost:1124/static/js/yoruba-._n.js',
        'http://localhost:1124/static/js/vendor-._node_modules_react-dom_cjs_react-dom.development.js-61bb2bf2.js',
        'http://localhost:1124/static/js/vendor-._node_modules_r.js',
        'http://localhost:1124/static/js/vendor-._node_modules_p.js',
        'http://localhost:1124/static/js/vendor-._node_modules_@.js',
        'http://localhost:1124/static/js/vendor-._node_modules_h.js',
        'http://localhost:1124/static/js/main-._m.js',
      ];

      expect(assetsFilter(input, 'yoruba')).toEqual(output);
    });
  });
});
