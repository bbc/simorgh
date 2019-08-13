import {
  filterUnknownCpsTypes,
  filterUnknownAssetTypeCodes,
  getRelevantGroup,
} from './cpstypes';
import azeriFixtureData from '../../../../../../data/azeri/frontpage/index.json';
import igboFixtureData from '../../../../../../data/igbo/frontpage/index.json';

describe('filterContent' , () => {
  describe('getRelevantGroup', () => {
    it('should no-op when no groups', () => {
      const data = {
        content: {},
      };
  
      expect(getRelevantGroup(data)).toEqual(data);
    });
  
    it('should no-op when no items', () => {
      const data = {
        content: {
          groups: [
            {
              items: [],
            },
          ],
        },
      };
  
      expect(getRelevantGroup(data)).toEqual(data);
    });
  
    it('should no-op when items is not an array', () => {
      const data = {
        content: {
          groups: [
            {
              items: 42,
            },
          ],
        },
      };
  
      expect(getRelevantGroup(data)).toEqual(data);
    });
  });
  
  describe('cpsTypes rules', () => {
    it('should filter items with unknown CPS types', () => {
      const data = {
        content: {
          groups: [
            {
              items: [
                {
                  headlines: {
                    headline: 'An item of unknown type',
                  },
                  cpsType: '😎',
                },
                {
                  headlines: {
                    headline: 'Who wants to see a OOO anyway',
                  },
                  cpsType: 'OOO',
                },
              ],
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              items: [],
            },
          ],
        },
      };
  
      expect(filterUnknownCpsTypes(data)).toEqual(expected);
    });
  
    it('should leave items with known CPS types alone', () => {
      const data = {
        content: {
          groups: [
            {
              items: [
                {
                  headlines: {
                    headline: 'A very important story',
                  },
                  cpsType: 'STY',
                },
                {
                  headlines: {
                    headline: 'A very important map',
                  },
                  cpsType: 'MAP',
                },
                {
                  headlines: {
                    headline: 'A very important live',
                  },
                  cpsType: 'LIV',
                },
              ],
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              items: [
                {
                  headlines: {
                    headline: 'A very important story',
                  },
                  cpsType: 'STY',
                },
                {
                  headlines: {
                    headline: 'A very important map',
                  },
                  cpsType: 'MAP',
                },
                {
                  headlines: {
                    headline: 'A very important live',
                  },
                  cpsType: 'LIV',
                },
              ],
            },
          ],
        },
      };
  
      expect(filterUnknownCpsTypes(data)).toEqual(expected);
    });
  
    it('should work on all groups in the data', () => {
      const data = {
        content: {
          groups: [
            {
              items: [
                {
                  headlines: {
                    headline: 'Group 1 - STY',
                  },
                  cpsType: 'STY',
                },
                {
                  headlines: {
                    headline: 'Group 1 - OOO',
                  },
                  cpsType: 'OOO',
                },
              ],
            },
            {
              items: [
                {
                  headlines: {
                    headline: 'Group 2 - PGL',
                  },
                  cpsType: 'PGL',
                },
                {
                  headlines: {
                    headline: 'Group 2 - MAP',
                  },
                  cpsType: 'MAP',
                },
              ],
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              items: [
                {
                  headlines: {
                    headline: 'Group 1 - STY',
                  },
                  cpsType: 'STY',
                },
              ],
            },
            {
              items: [
                {
                  headlines: {
                    headline: 'Group 2 - PGL',
                  },
                  cpsType: 'PGL',
                },
                {
                  headlines: {
                    headline: 'Group 2 - MAP',
                  },
                  cpsType: 'MAP',
                },
              ],
            },
          ],
        },
      };
  
      expect(filterUnknownCpsTypes(data)).toEqual(expected);
    });
  
    it('should remove items without any CPS type', () => {
      const data = {
        content: {
          groups: [
            {
              items: [
                {
                  headlines: {
                    headline: "What's a cpsType?",
                  },
                },
              ],
            },
          ],
        },
      };
  
      const expected = {
        content: {
          groups: [
            {
              items: [],
            },
          ],
        },
      };
  
      expect(filterUnknownCpsTypes(data)).toEqual(expected);
    });
  
    it('should handle "real" data', () => {
      expect(filterUnknownCpsTypes(igboFixtureData)).toMatchSnapshot();
    });
  });
  
  describe('assetTypeCode rules', () => {
    it('should filter items with unknown assetTypeCode', () => {
      const data = {
        content: {
          groups: [
            {
              items: [
                {
                  name: 'Test assetTypeCode',
                  summary: 'This is a test',
                  indexImage: {},
                  indexThumbnail: {},
                  uri: 'http://this.is.a.test.com/',
                  contentType: 'Text',
                  assetTypeCode: 'OOO',
                  timestamp: 1527598380040,
                  type: 'link',
                },
              ],
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              items: [],
            },
          ],
        },
      };
  
      expect(filterUnknownAssetTypeCodes(data)).toEqual(expected);
    });
  
    it('should leave items with known assetTypeCode alone', () => {
      const data = {
        content: {
          groups: [
            {
              items: [
                {
                  name: 'Test assetTypeCode',
                  summary: 'This is a test',
                  indexImage: {},
                  indexThumbnail: {},
                  uri: 'http://this.is.a.test.com/',
                  contentType: 'Text',
                  assetTypeCode: 'PRO',
                  timestamp: 1527598380040,
                  type: 'link',
                },
              ],
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              items: [
                {
                  name: 'Test assetTypeCode',
                  summary: 'This is a test',
                  indexImage: {},
                  indexThumbnail: {},
                  uri: 'http://this.is.a.test.com/',
                  contentType: 'Text',
                  assetTypeCode: 'PRO',
                  timestamp: 1527598380040,
                  type: 'link',
                },
              ],
            },
          ],
        },
      };
  
      expect(filterUnknownAssetTypeCodes(data)).toEqual(expected);
    });
  
    it('should work on all groups in the data', () => {
      const data = {
        content: {
          groups: [
            {
              name: 'Test assetTypeCode 1',
              summary: 'This is the first test',
              indexImage: {},
              indexThumbnail: {},
              uri: 'http://this.is.a.test.com/',
              contentType: 'Text',
              assetTypeCode: 'PRO',
              timestamp: 1527598380090,
              type: 'link',
            },
            {
              name: 'Test assetTypeCode 2',
              summary: 'This is another test',
              indexImage: {},
              indexThumbnail: {},
              uri: 'http://this.is.a.test.com/',
              contentType: 'Text',
              assetTypeCode: 'PRO',
              timestamp: 1527598380040,
              type: 'link',
            }
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              name: 'Test assetTypeCode 1',
              summary: 'This is the first test',
              indexImage: {},
              indexThumbnail: {},
              uri: 'http://this.is.a.test.com/',
              contentType: 'Text',
              assetTypeCode: 'PRO',
              timestamp: 1527598380090,
              type: 'link',
            },
            {
              name: 'Test assetTypeCode 2',
              summary: 'This is another test',
              indexImage: {},
              indexThumbnail: {},
              uri: 'http://this.is.a.test.com/',
              contentType: 'Text',
              assetTypeCode: 'PRO',
              timestamp: 1527598380040,
              type: 'link',
            }
          ],
        },
      };
  
      expect(filterUnknownAssetTypeCodes(data)).toEqual(expected);
    });
  
    it('should remove items without any assetTypeCode', () => {
      const data = {
        content: {
          groups: [
            {
              items: [
                {
                  name: 'Test assetTypeCode 1',
                  summary: 'This is the first test',
                  indexImage: {},
                  indexThumbnail: {},
                },
              ],
            },
          ],
        },
      };
  
      const expected = {
        content: {
          groups: [
            {
              items: [],
            },
          ],
        },
      };
  
      expect(filterUnknownAssetTypeCodes(data)).toEqual(expected);
    });

    it('should handle "real" data', () => {
      expect(filterUnknownAssetTypeCodes(azeriFixtureData)).toMatchSnapshot();
    });
  });
})
