import { filterEmptyGroupItems } from './groups';

describe('Group rules', () => {
  it('should filter out empty items', () => {
    const data = {
      content: {
        groups: [
          {
            type: 'top-story',
            items: [{ name: 'item1' }],
          },
          { type: 'must-see', items: [] },
          { type: 'must-see', items: null },
          { type: 'must-see', items: 'dummy string' },
          { type: 'must-see', items: {} },
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
        ],
      },
    };

    expect(filterEmptyGroupItems(data)).toEqual(expected);
  });
});
