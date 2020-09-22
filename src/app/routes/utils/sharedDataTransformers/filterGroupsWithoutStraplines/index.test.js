import filterGroupsWithoutStraplines from '.';

describe('strapline rules', () => {
  it('should keep groups with a strapline', () => {
    const data = {
      content: {
        groups: [
          {
            items: [
              {
                headlines: {
                  headline: 'This is a headline',
                },
              },
              {
                headlines: {
                  headline: 'This is another headline',
                },
              },
            ],
            strapline: {
              name: 'Strapline name',
            },
          },
        ],
      },
    };

    expect(filterGroupsWithoutStraplines(data)).toEqual(data);
  });

  it('should remove groups without a strapline', () => {
    const data = {
      content: {
        groups: [
          {
            items: [
              {
                headlines: {
                  headline: 'This is a headline',
                },
              },
              {
                headlines: {
                  headline: 'This is another headline',
                },
              },
            ],
          },
        ],
      },
    };

    const expected = {
      content: {
        groups: [],
      },
    };

    expect(filterGroupsWithoutStraplines(data)).toEqual(expected);
  });

  it('should search for straplines in all groups in the data', () => {
    const data = {
      content: {
        groups: [
          {
            items: [
              {
                headlines: {
                  headline: 'This is a headline',
                },
              },
              {
                headlines: {
                  headline: 'This is another headline',
                },
              },
            ],
            strapline: {
              name: 'Strapline',
            },
          },
          {
            items: [
              {
                headlines: {
                  headline: 'Headline without strapline',
                },
              },
              {
                headlines: {
                  headline: 'Another headline without strapline',
                },
              },
            ],
          },
          {
            items: [
              {
                headlines: {
                  headline: 'Good headline',
                },
              },
              {
                headlines: {
                  headline: 'Another good headline',
                },
              },
            ],
            strapline: {
              name: 'Strapline number 2',
            },
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
                  headline: 'This is a headline',
                },
              },
              {
                headlines: {
                  headline: 'This is another headline',
                },
              },
            ],
            strapline: {
              name: 'Strapline',
            },
          },
          {
            items: [
              {
                headlines: {
                  headline: 'Good headline',
                },
              },
              {
                headlines: {
                  headline: 'Another good headline',
                },
              },
            ],
            strapline: {
              name: 'Strapline number 2',
            },
          },
        ],
      },
    };

    expect(filterGroupsWithoutStraplines(data)).toEqual(expected);
  });

  it('should not work when there are no groups', () => {
    const data = {
      content: {},
    };

    expect(filterGroupsWithoutStraplines(data)).toEqual(data);
  });
});
