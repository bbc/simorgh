import embedUrl from './embedUrl';

const ASSET_ID = 'foo';
const VPID = 'bar';

describe('Media Player: Embed URL', () => {
  describe('Canonical', () => {
    it('builds a URL for LIVE environment on .co.uk', () => {
      const expectedUrl = `https://www.bbc.co.uk/ws/av-embeds/${ASSET_ID}/${VPID}`;
      const result = embedUrl('https://www.bbc.co.uk', ASSET_ID, VPID);

      expect(result).toEqual(expectedUrl);
    });

    it('builds a URL for TEST environment on .com', () => {
      const expectedUrl = `https://www.test.bbc.com/ws/av-embeds/${ASSET_ID}/${VPID}`;
      const result = embedUrl('https://www.test.bbc.com', ASSET_ID, VPID);

      expect(result).toEqual(expectedUrl);
    });

    it('builds a URL for LOCAL environment that has a base of test.bbc.co.uk', () => {
      const expectedUrl = `https://www.test.bbc.co.uk/ws/av-embeds/${ASSET_ID}/${VPID}`;
      const result = embedUrl(
        'http://localhost.bbc.co.uk:7080',
        ASSET_ID,
        VPID,
      );

      expect(result).toEqual(expectedUrl);
    });

    it('builds a URL for LOCAL environment that has a base of test.bbc.com', () => {
      const expectedUrl = `https://www.test.bbc.com/ws/av-embeds/${ASSET_ID}/${VPID}`;
      const result = embedUrl('http://localhost.bbc.com:7080', ASSET_ID, VPID);

      expect(result).toEqual(expectedUrl);
    });
  });

  describe('AMP', () => {
    it('builds a URL for LIVE environment on .co.uk', () => {
      const expectedUrl = `https://www.bbc.co.uk/ws/av-embeds/${ASSET_ID}/${VPID}/amp`;
      const result = embedUrl('https://www.bbc.co.uk', ASSET_ID, VPID, true);

      expect(result).toEqual(expectedUrl);
    });

    it('builds a URL for TEST environment on .com', () => {
      const expectedUrl = `https://www.test.bbc.com/ws/av-embeds/${ASSET_ID}/${VPID}/amp`;
      const result = embedUrl('https://www.test.bbc.com', ASSET_ID, VPID, true);

      expect(result).toEqual(expectedUrl);
    });

    it('builds a URL for LOCAL environment that has a base of test.bbc.co.uk', () => {
      const expectedUrl = `https://www.test.bbc.co.uk/ws/av-embeds/${ASSET_ID}/${VPID}/amp`;
      const result = embedUrl(
        'http://localhost.bbc.co.uk:7080',
        ASSET_ID,
        VPID,
        true,
      );

      expect(result).toEqual(expectedUrl);
    });
  });
});
