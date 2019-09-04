import filterUnknownContentTypes from './filterContentType';
import azeriFixtureData from '../../../../../../data/azeri/frontpage/index.json';
import igboFixtureData from '../../../../../../data/igbo/frontpage/index.json';

const cpsItems = [
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
];

const assetTypeCodeItems = [
  {
    name: 'Test standard link promo',
    summary: 'This is a standard link promo',
    indexImage: {},
    indexThumbnail: {},
    uri: 'http://this.is.a.test.com/',
    contentType: 'Text',
    assetTypeCode: 'PRO',
    timestamp: 1527598380040,
    type: 'link',
  },
  {
    name: 'Test standard feature promo',
    summary: 'This is a standard feature promo',
    indexImage: {},
    indexThumbnail: {},
    uri: 'http://this.is.a.test.com/',
    contentType: 'Feature',
    assetTypeCode: 'PRO',
    timestamp: 1527598380040,
    type: 'link',
  },
];

describe('filterUnknownContentTypes', () => {
  it('should no-op when no groups', () => {
    const data = {
      content: {},
    };

    expect(filterUnknownContentTypes(data)).toEqual(data);
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

    expect(filterUnknownContentTypes(data)).toEqual(data);
  });

  it('should no-op when items are not an array', () => {
    const data = {
      content: {
        groups: [
          {
            items: 42,
          },
        ],
      },
    };

    expect(filterUnknownContentTypes(data)).toEqual(data);
  });

  it('should handle both CPS and AssetTypeCode types', () => {
    const data = {
      content: {
        groups: [
          {
            items: cpsItems.concat(assetTypeCodeItems),
          },
        ],
      },
    };
    const expected = {
      content: {
        groups: [
          {
            items: cpsItems.concat(assetTypeCodeItems),
          },
        ],
      },
    };
    expect(filterUnknownContentTypes(data)).toEqual(expected);
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

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should leave items with known CPS types alone', () => {
      const data = {
        content: {
          groups: [
            {
              items: cpsItems,
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              items: cpsItems,
            },
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(expected);
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

      expect(filterUnknownContentTypes(data)).toEqual(expected);
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

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should handle "real" data', () => {
      expect(filterUnknownContentTypes(igboFixtureData)).toMatchSnapshot();
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

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should leave items with known assetTypeCode alone', () => {
      const data = {
        content: {
          groups: [
            {
              items: assetTypeCodeItems,
            },
          ],
        },
      };
      const expected = {
        content: {
          groups: [
            {
              items: assetTypeCodeItems,
            },
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(expected);
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
            },
            {
              name: 'Test featureTypeCode 2',
              summary: 'This is a test feature',
              indexImage: {},
              indexThumbnail: {},
              uri: 'http://this.is.a.test.com/',
              contentType: 'Feature',
              assetTypeCode: 'PRO',
              timestamp: 1527598380030,
              type: 'link',
            },
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
            },
            {
              name: 'Test featureTypeCode 2',
              summary: 'This is a test feature',
              indexImage: {},
              indexThumbnail: {},
              uri: 'http://this.is.a.test.com/',
              contentType: 'Feature',
              assetTypeCode: 'PRO',
              timestamp: 1527598380030,
              type: 'link',
            },
          ],
        },
      };

      expect(filterUnknownContentTypes(data)).toEqual(expected);
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

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should leave items with known assetTypeCode and contentType', () => {
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
                {
                  name: 'Test standard link promo',
                  summary: 'This is a standard link promo',
                  indexImage: {},
                  indexThumbnail: {},
                  uri: 'http://this.is.a.test.com/',
                  contentType: 'Text',
                  assetTypeCode: 'PRO',
                  timestamp: 1527598380040,
                  type: 'link',
                },
                {
                  name: 'Test audio link promo',
                  summary: 'This is an audio link promo',
                  indexImage: {},
                  indexThumbnail: {},
                  uri: 'http://this.is.a.test.com/',
                  contentType: 'Audio',
                  assetTypeCode: 'PRO',
                  timestamp: 1469005433000,
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
                  name: 'Test standard link promo',
                  summary: 'This is a standard link promo',
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

      expect(filterUnknownContentTypes(data)).toEqual(expected);
    });

    it('should handle "real" data', () => {
      expect(filterUnknownContentTypes(azeriFixtureData)).toMatchSnapshot();
    });
  });
});
