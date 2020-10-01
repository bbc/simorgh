import flattenGroups from './flattenGroups';

describe('flattenGroups', () => {
  it('should return an empty array when groups is an empty array', () => {
    expect(flattenGroups([])).toStrictEqual([]);
  });

  it('should return an array when groups has 1 item', () => {
    const groups = [{}];
    expect(flattenGroups(groups)).toStrictEqual([{}]);
  });

  it('should return an array when all groups have a strapline', () => {
    const groups = [
      { strapline: { name: 'strapline 1' } },
      { strapline: { name: 'strapline 2' } },
    ];
    expect(flattenGroups(groups)).toStrictEqual([
      { strapline: { name: 'strapline 1' } },
      { strapline: { name: 'strapline 2' } },
    ]);
  });

  it('should move items from a group without a strapline into a group with a strapline', () => {
    const groups = [
      { strapline: { name: 'strapline 1' }, items: [{ id: 1 }, { id: 2 }] },
      { items: [{ id: 3 }, { id: 4 }] },
    ];
    expect(flattenGroups(groups)).toStrictEqual([
      {
        strapline: { name: 'strapline 1' },
        items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    ]);
  });

  it('should move items from multiple groups without a strapline into groups with a strapline', () => {
    const groups = [
      { items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] },
      { items: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      { strapline: { name: 'strapline 3' }, items: [{ id: 10 }, { id: 15 }] },
      { items: [{ id: 20 }, { id: 25 }] },
      { strapline: { name: 'strapline 5' }, items: [{ id: 30 }, { id: 40 }] },
      { items: [{ id: 100 }, { id: 200 }] },
    ];
    expect(flattenGroups(groups)).toStrictEqual([
      {
        items: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
      {
        strapline: { name: 'strapline 3' },
        items: [{ id: 10 }, { id: 15 }, { id: 20 }, { id: 25 }],
      },
      {
        strapline: { name: 'strapline 5' },
        items: [{ id: 30 }, { id: 40 }, { id: 100 }, { id: 200 }],
      },
    ]);
  });
});
