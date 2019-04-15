import applySquashTopstories from './topstories';
// import data from '../../../../data/prod/thai/frontpage/index.json';

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
    ],
  },
};

describe('Timestamp rules', () => {
  it('should put Timestamp block first if no headline', () => {
    expect(applySquashTopstories(data)).toEqual(expected);
  });
});
