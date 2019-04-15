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
        items: [{ name: 'item4' }, { name: 'item5' }, { name: 'item6' }],
      },
      {
        type: 'secondary-top-story',
        items: [{ name: 'item7' }, { name: 'item8' }, { name: 'item9' }],
      },
    ],
  },
};

const expected = {
  content: {
    groups: [
      {
        type: 'top-story',
        items: [{ name: 'item1' }],
      },
      {
        type: 'other-top-stories',
        items: [{ name: 'item4' }, { name: 'item5' }, { name: 'item6' }],
      },
      {
        type: 'secondary-top-story',
        items: [{ name: 'item7' }, { name: 'item8' }, { name: 'item9' }],
      },
    ],
  },
};

describe('Timestamp rules', () => {
  it('should put Timestamp block first if no headline', () => {
    expect(applySquashTopstories(data)).toEqual(expected);
  });
});
