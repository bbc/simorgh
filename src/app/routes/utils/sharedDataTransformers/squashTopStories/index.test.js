import applySquashTopstories from '.';

describe('Topstories rules', () => {
  it('should squash known blocks in received order and leave other blocks alone', () => {
    const data = {
      content: {
        groups: [
          {
            type: 'top-story',
            items: [{ name: 'item1' }],
          },
          {
            type: 'other-top-stories',
            items: [{ name: 'item2' }, { name: 'item3' }, { name: 'item4' }],
            strapline: {
              name: 'First availible strapline',
            },
          },
          {
            type: 'secondary-top-story',
            items: [{ name: 'item5' }, { name: 'item6' }, { name: 'item7' }],
            strapline: {
              name: 'Second availible strapline',
            },
          },
          {
            type: 'must-see',
            items: [{ name: 'item8' }, { name: 'item9' }, { name: 'item10' }],
          },
        ],
      },
    };

    const expected = {
      content: {
        groups: [
          {
            type: 'top-stories',
            title: 'Top stories',
            items: [
              { name: 'item1' },
              { name: 'item2' },
              { name: 'item3' },
              { name: 'item4' },
              { name: 'item5' },
              { name: 'item6' },
              { name: 'item7' },
            ],
            strapline: {
              name: 'First availible strapline',
            },
          },
          {
            type: 'must-see',
            items: [{ name: 'item8' }, { name: 'item9' }, { name: 'item10' }],
          },
        ],
      },
    };

    expect(applySquashTopstories(data)).toEqual(expected);
  });

  it('should not manipulate data when no known blocks found', () => {
    const data = {
      content: {
        groups: [
          {
            type: 'foobar',
            items: [{ name: 'item1' }, { name: 'item2' }, { name: 'item3' }],
          },
          {
            type: 'barfoo',
            items: [{ name: 'item4' }, { name: 'item5' }],
          },
          {
            type: 'foobarfoo',
            items: [{ name: 'item6' }, { name: 'item7' }, { name: 'item8' }],
          },
        ],
      },
    };

    expect(applySquashTopstories(data)).toEqual(data);
  });

  it('should find topstories blocks anywhere in data and bring to top', () => {
    const data = {
      content: {
        groups: [
          {
            type: 'foobar',
            items: [{ name: 'item1' }, { name: 'item2' }, { name: 'item3' }],
          },
          {
            type: 'barfoo',
            items: [{ name: 'item4' }, { name: 'item5' }],
          },
          {
            type: 'responsive-top-stories',
            items: [{ name: 'item6' }, { name: 'item7' }, { name: 'item8' }],
            strapline: {
              name: 'Top Stories Name',
            },
          },
        ],
      },
    };

    const expected = {
      content: {
        groups: [
          {
            type: 'top-stories',
            title: 'Top stories',
            items: [{ name: 'item6' }, { name: 'item7' }, { name: 'item8' }],
            strapline: {
              name: 'Top Stories Name',
            },
          },
          {
            type: 'foobar',
            items: [{ name: 'item1' }, { name: 'item2' }, { name: 'item3' }],
          },
          {
            type: 'barfoo',
            items: [{ name: 'item4' }, { name: 'item5' }],
          },
        ],
      },
    };

    expect(applySquashTopstories(data)).toEqual(expected);
  });

  it('should not add strapline to output if not found', () => {
    const data = {
      content: {
        groups: [
          {
            type: 'top-story',
            items: [{ name: 'item1' }],
          },
          {
            type: 'other-top-stories',
            items: [{ name: 'item2' }, { name: 'item3' }, { name: 'item4' }],
          },
          {
            type: 'secondary-top-story',
            items: [{ name: 'item5' }, { name: 'item6' }, { name: 'item7' }],
          },
          {
            type: 'must-see',
            items: [{ name: 'item8' }, { name: 'item9' }, { name: 'item10' }],
          },
        ],
      },
    };

    const expected = {
      content: {
        groups: [
          {
            type: 'top-stories',
            title: 'Top stories',
            items: [
              { name: 'item1' },
              { name: 'item2' },
              { name: 'item3' },
              { name: 'item4' },
              { name: 'item5' },
              { name: 'item6' },
              { name: 'item7' },
            ],
          },
          {
            type: 'must-see',
            items: [{ name: 'item8' }, { name: 'item9' }, { name: 'item10' }],
          },
        ],
      },
    };

    expect(applySquashTopstories(data)).toEqual(expected);
  });
});
