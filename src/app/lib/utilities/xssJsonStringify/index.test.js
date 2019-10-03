import xssJsonStringify from '.';

describe('xssJsonStringify', () => {
  it('should cleanup json', () => {
    const json = {
      name: 'Attacker',
      bio: '<img src=x onerror=alert(1)//>',
    };
    const clean = xssJsonStringify(json);
    expect(clean).toBe('{"name":"Attacker","bio":"<img src />"}');
  });
});
