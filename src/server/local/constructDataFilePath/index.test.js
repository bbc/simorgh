import constructDataFilePath from '.';

describe('constructDataFilePath', () => {
  const DATA_PATH = '/path/to';
  const spy = jest.spyOn(process, 'cwd');
  spy.mockReturnValue(DATA_PATH);

  describe('Front Page', () => {
    it('should construct correct data file path', () => {
      expect(
        constructDataFilePath({ pageType: 'frontpage', service: 'igbo' }),
      ).toEqual(`${DATA_PATH}/data/igbo/frontpage/index.json`);
    });

    it('should construct correct data file path with variant', () => {
      expect(
        constructDataFilePath({
          pageType: 'frontpage',
          service: 'ukchina',
          variant: '/simp',
        }),
      ).toEqual(`${DATA_PATH}/data/ukchina/frontpage/simp.json`);
    });
  });

  describe('Home Page', () => {
    it('should construct correct data file path', () => {
      expect(
        constructDataFilePath({ pageType: 'homePage', service: 'kyrgyz' }),
      ).toEqual(`${DATA_PATH}/data/kyrgyz/homePage/index.json`);
    });
  });

  describe('Most Read', () => {
    it('should construct correct data file path', () => {
      expect(
        constructDataFilePath({ pageType: 'mostRead', service: 'igbo' }),
      ).toEqual(`${DATA_PATH}/data/igbo/mostRead/index.json`);
    });

    it('should construct correct data file path with variant', () => {
      expect(
        constructDataFilePath({
          pageType: 'mostRead',
          service: 'ukchina',
          variant: '/simp',
        }),
      ).toEqual(`${DATA_PATH}/data/ukchina/mostRead/simp.json`);
    });
  });

  describe('Secondary Column', () => {
    it('should construct correct data file path', () => {
      expect(
        constructDataFilePath({ pageType: 'secondaryColumn', service: 'igbo' }),
      ).toEqual(`${DATA_PATH}/data/igbo/secondaryColumn/index.json`);
    });

    it('should construct correct data file path with variant', () => {
      expect(
        constructDataFilePath({
          pageType: 'secondaryColumn',
          service: 'ukchina',
          variant: '/simp',
        }),
      ).toEqual(`${DATA_PATH}/data/ukchina/secondaryColumn/simp.json`);
    });
  });

  describe('Recommendations', () => {
    it('should construct correct data file path', () => {
      expect(
        constructDataFilePath({ pageType: 'recommendations', service: 'igbo' }),
      ).toEqual(`${DATA_PATH}/data/igbo/recommendations/index.json`);
    });

    it('should construct correct data file path with variant', () => {
      expect(
        constructDataFilePath({
          pageType: 'recommendations',
          service: 'ukchina',
          variant: '/simp',
        }),
      ).toEqual(`${DATA_PATH}/data/ukchina/recommendations/simp.json`);
    });
  });

  describe('CPS Assets', () => {
    it('should construct correct data file path', () => {
      expect(
        constructDataFilePath({
          pageType: 'cpsAssets',
          service: 'igbo',
          assetUri: 'map-12345678',
        }),
      ).toEqual(`${DATA_PATH}/data/igbo/cpsAssets/map-12345678.json`);
    });

    it('should construct correct data file path with variant', () => {
      expect(
        constructDataFilePath({
          pageType: 'cpsAssets',
          service: 'ukchina',
          assetUri: 'map-12345678',
          variant: '/simp',
        }),
      ).toEqual(`${DATA_PATH}/data/ukchina/cpsAssets/simp/map-12345678.json`);
    });
  });

  describe('Legacy Assets', () => {
    it('should construct correct data file path', () => {
      expect(
        constructDataFilePath({
          pageType: 'legacyAssets',
          service: 'igbo',
          assetUri: 'legacy/map-12345678',
        }),
      ).toEqual(`${DATA_PATH}/data/igbo/legacyAssets/legacy/map-12345678.json`);
    });

    it('should construct correct data file path with variant', () => {
      expect(
        constructDataFilePath({
          pageType: 'legacyAssets',
          service: 'ukchina',
          assetUri: 'legacy/map-12345678',
          variant: '/simp',
        }),
      ).toEqual(
        `${DATA_PATH}/data/ukchina/legacyAssets/simp/legacy/map-12345678.json`,
      );
    });
  });

  describe('Articles', () => {
    it('should construct correct data file path', () => {
      expect(
        constructDataFilePath({
          pageType: 'articles',
          service: 'igbo',
          id: '12345678',
        }),
      ).toEqual(`${DATA_PATH}/data/igbo/articles/12345678.json`);
    });

    it('should construct correct data file path with variant', () => {
      expect(
        constructDataFilePath({
          pageType: 'articles',
          service: 'ukchina',
          id: '12345678',
          variant: '/simp',
        }),
      ).toEqual(`${DATA_PATH}/data/ukchina/articles/12345678/simp.json`);
    });
  });

  describe('Africa Eye TV', () => {
    it('should construct correct data file path', () => {
      expect(
        constructDataFilePath({
          pageType: 'africa_eye',
          episodeId: '12345678',
        }),
      ).toEqual(`${DATA_PATH}/data/worldservice/tv/africa_eye/12345678.json`);
    });
  });

  describe('Live Radio', () => {
    it('should construct correct data file path', () => {
      expect(
        constructDataFilePath({
          pageType: 'liveRadio',
          service: 'korean',
          masterBrand: 'bbc_korean_radio',
        }),
      ).toEqual(`${DATA_PATH}/data/korean/bbc_korean_radio/liveradio.json`);
    });
  });
});
