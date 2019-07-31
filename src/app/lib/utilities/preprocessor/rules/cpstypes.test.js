import applyFilterCpsTypes from './cpstypes';
import igboFixtureData from '../../../../../../data/igbo/frontpage/index.json';

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
                  headline: 'Who wants to see a LIV anyway',
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
            items: [],
          },
        ],
      },
    };

    expect(applyFilterCpsTypes(data)).toEqual(expected);
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
            ],
          },
        ],
      },
    };

    expect(applyFilterCpsTypes(data)).toEqual(expected);
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
                  headline: 'Group 1 - LIV',
                },
                cpsType: 'LIV',
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

    expect(applyFilterCpsTypes(data)).toEqual(expected);
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

    expect(applyFilterCpsTypes(data)).toEqual(expected);
  });

  it('should no-op when no groups', () => {
    const data = {
      content: {},
    };

    expect(applyFilterCpsTypes(data)).toEqual(data);
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

    expect(applyFilterCpsTypes(data)).toEqual(data);
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

    expect(applyFilterCpsTypes(data)).toEqual(data);
  });

  it('should handle "real" data', () => {
    expect(applyFilterCpsTypes(igboFixtureData)).toMatchSnapshot();
  });
});
