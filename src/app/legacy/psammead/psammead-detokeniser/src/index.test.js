import detokenise from '.';

describe('detokenise', () => {
  it('detokenises the given text correctly', () => {
    expect(detokenise('Foo %token%', { '%token%': 'Bar' })).toEqual('Foo Bar');
    expect(detokenise('Foo %token%', {})).toEqual('Foo %token%');
  });

  it('returns null given invalid arguments', () => {
    expect(detokenise()).toBeNull();
    expect(detokenise('Foo')).toBeNull();
  });
});
