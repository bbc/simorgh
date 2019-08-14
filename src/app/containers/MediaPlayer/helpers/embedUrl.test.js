import embedUrl from './embedUrl';

const ASSET_ID = 'foo';
const VPID = 'bar';

describe('Media Player: Embed URL', () => {
  describe('Canonical', () => {
    it('builds a URL for LIVE environment on .co.uk', () => {
      const expectedUrl = `https://www.bbc.co.uk/ws/av-embeds/${ASSET_ID}/${VPID}`;
      const embedObject = {
        origin: 'https://www.bbc.co.uk',
        assetId: ASSET_ID,
        vpid: VPID,
      };

      expect(embedUrl(embedObject)).toEqual(expectedUrl);
    });

    it('builds a URL for TEST environment on .com', () => {
      const expectedUrl = `https://www.test.bbc.com/ws/av-embeds/${ASSET_ID}/${VPID}`;
      const embedObject = {
        origin: 'https://www.test.bbc.com',
        assetId: ASSET_ID,
        vpid: VPID,
      };

      expect(embedUrl(embedObject)).toEqual(expectedUrl);
    });

    it('builds a URL for LOCAL environment that has a base of test.bbc.co.uk', () => {
      const expectedUrl = `https://www.test.bbc.co.uk/ws/av-embeds/${ASSET_ID}/${VPID}`;
      const embedObject = {
        origin: 'http://localhost.bbc.co.uk:7080',
        assetId: ASSET_ID,
        vpid: VPID,
      };

      expect(embedUrl(embedObject)).toEqual(expectedUrl);
    });

    it('builds a URL for LOCAL environment that has a base of test.bbc.com', () => {
      const expectedUrl = `https://www.test.bbc.com/ws/av-embeds/${ASSET_ID}/${VPID}`;
      const embedObject = {
        origin: 'https://www.localhost.bbc.com:7080',
        assetId: ASSET_ID,
        vpid: VPID,
      };

      expect(embedUrl(embedObject)).toEqual(expectedUrl);
    });
  });

  describe('AMP', () => {
    it('builds a URL for LIVE environment on .co.uk', () => {
      const expectedUrl = `https://www.bbc.co.uk/ws/av-embeds/${ASSET_ID}/${VPID}/amp`;
      const embedObject = {
        origin: 'https://www.bbc.co.uk',
        assetId: ASSET_ID,
        vpid: VPID,
        amp: true,
      };

      expect(embedUrl(embedObject)).toEqual(expectedUrl);
    });

    it('builds a URL for TEST environment on .com', () => {
      const expectedUrl = `https://www.test.bbc.com/ws/av-embeds/${ASSET_ID}/${VPID}/amp`;
      const embedObject = {
        origin: 'https://www.test.bbc.com',
        assetId: ASSET_ID,
        vpid: VPID,
        amp: true,
      };

      expect(embedUrl(embedObject)).toEqual(expectedUrl);
    });

    it('builds a URL for LOCAL environment that has a base of test.bbc.co.uk', () => {
      const expectedUrl = `https://www.test.bbc.co.uk/ws/av-embeds/${ASSET_ID}/${VPID}/amp`;
      const embedObject = {
        origin: 'http://localhost.bbc.co.uk:7080',
        assetId: ASSET_ID,
        vpid: VPID,
        amp: true,
      };

      expect(embedUrl(embedObject)).toEqual(expectedUrl);
    });
  });
});
