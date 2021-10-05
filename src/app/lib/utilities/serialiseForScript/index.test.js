import serialiseForScript from '.';

describe('serialiseForScript', () => {
  describe('objects', () => {
    it('an empty object', () => {
      expect(serialiseForScript({})).toBe('{}');
    });

    it('an example object with no special characters', () => {
      expect(serialiseForScript({ a: 1, b: 'foo', c: '' })).toBe(
        '{"a":1,"b":"foo","c":""}',
      );
    });

    it('an object with a less-than symbol in a property value', () => {
      expect(serialiseForScript({ text: 'me < you' })).toBe(
        '{"text":"me \\u003c you"}',
      );

      expect(
        serialiseForScript({
          html: "<div>An include</div><script>console.log('An include');</script>",
        }),
      ).toBe(
        '{"html":"\\u003cdiv>An include\\u003c/div>\\u003cscript>console.log(\'An include\');\\u003c/script>"}',
      );
    });

    it('an object with a less-than symbol in a property name', () => {
      expect(serialiseForScript({ '<blink>': 'hello!' })).toBe(
        '{"\\u003cblink>":"hello!"}',
      );
    });
  });

  describe('unexpected input', () => {
    it('null', () => {
      expect(serialiseForScript(null)).toBeNull();
    });

    it('undefined', () => {
      expect(serialiseForScript(undefined)).toBeUndefined();
    });
  });
});
