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
    });

    it('an object with a less-than symbol in a property name', () => {
      expect(serialiseForScript({ '<blink>': 'hello!' })).toBe(
        '{"\\u003cblink>":"hello!"}',
      );
    });
  });

  describe('unexpected input', () => {
    it('null', () => {
      expect(serialiseForScript(undefined)).toBeUndefined();
    });

    it('undefined', () => {
      expect(serialiseForScript(undefined)).toBeUndefined();
    });
  });
});
