import detokeniseSkipText from './detokeniseSkipText';

describe('detokeniseSkipText', () => {
  it('detokenises the given text correctly', () => {
    expect(detokeniseSkipText('Foo %token%', { '%token%': 'Bar' })).toEqual(
      'Foo Bar',
    );
    expect(detokeniseSkipText('Foo %token%', {})).toEqual('Foo %token%');
  });

  it('returns null given invalid arguments', () => {
    expect(detokeniseSkipText()).toBeNull();
    expect(detokeniseSkipText('Foo')).toBeNull();
  });
});
