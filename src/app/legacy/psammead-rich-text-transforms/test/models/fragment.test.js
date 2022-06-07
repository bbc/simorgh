import fragment from '../../src/models/fragment';

test('returns a block from a text XML node', () => {
  const mockFragment = fragment('One two three four!');

  expect(mockFragment).toStrictEqual({
    type: 'fragment',
    model: {
      text: 'One two three four!',
      attributes: [],
    },
  });
});
