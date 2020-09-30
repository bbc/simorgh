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
      { strapline: { name: 'blah' } },
      { strapline: { name: 'blahblah' } },
    ];
    expect(flattenGroups(groups)).toStrictEqual([
      { strapline: { name: 'blah' } },
      { strapline: { name: 'blahblah' } },
    ]);
  });
  it('should move items from a group without a strapline into a group with a strapline', () => {
    const groups = [
      { strapline: { name: 'blah' }, items: [123, 122] },
      { items: [2323, 212] },
    ];
    expect(flattenGroups(groups)).toStrictEqual([
      { strapline: { name: 'blah' }, items: [123, 122, 2323, 212] },
    ]);
  });

  it('should move items from multiple groups without a strapline into groups with a strapline', () => {
    const groups = [
      { strapline: { name: 'blah' }, items: [123, 122] },
      { items: [2323, 212] },
      { strapline: { name: 'blahasasa' }, items: [1723, 1228] },
      { items: [23223, 2121] },
    ];
    expect(flattenGroups(groups)).toStrictEqual([
      { strapline: { name: 'blah' }, items: [123, 122, 2323, 212] },
      { strapline: { name: 'blahasasa' }, items: [1723, 1228, 23223, 2121] },
    ]);
  });
});
