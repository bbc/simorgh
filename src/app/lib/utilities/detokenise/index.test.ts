import detokenise from '.';

describe('detokenise', () => {
  it('replaces tokens found in the dictionary', () => {
    expect(detokenise('Foo %token%', { '%token%': 'Bar' })).toBe('Foo Bar');
  });

  it('leaves tokens missing from the dictionary untouched', () => {
    expect(detokenise('Foo %token%', {})).toBe('Foo %token%');
  });

  it('replaces every occurrence of every token', () => {
    expect(detokenise('%a% %b% %a%', { '%a%': 'one', '%b%': 'two' })).toBe(
      'one two one',
    );
  });

  it('replaces tokens in non-Latin text', () => {
    expect(detokenise('اذهب إلى %section%', { '%section%': 'المحتوى' })).toBe(
      'اذهب إلى المحتوى',
    );
  });

  it('returns null given invalid arguments', () => {
    expect(detokenise()).toBeNull();
    expect(detokenise('Foo')).toBeNull();
  });
});
