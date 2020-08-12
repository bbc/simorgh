import htmlUnescape from '.';

const escapedString = '🦄 &amp; 🐐';

describe('htmlUnescape', () => {
  it('should return unescaped html characters', () => {
    const unescapedString = htmlUnescape(escapedString);
    expect(htmlUnescape(unescapedString)).toEqual('🦄 & 🐐');
  });
});
