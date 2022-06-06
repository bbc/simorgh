import detokenise from '@bbc/psammead-detokeniser';
import durationDictionary from '.';

describe('durationDictionary', () => {
  describe('creates a valid duration dictionary', () => {
    it('when duration and locale are valid', () => {
      expect(
        durationDictionary({ duration: 'PT1H30M', locale: 'en-gb' }),
      ).toEqual({
        '%duration%': '1,30,00',
      });
    });
    it('and maps token to key correctly when detokenised', () => {
      expect(
        detokenise(
          'Duration %duration%',
          durationDictionary({ duration: 'PT1H30M', locale: 'en-gb' }),
        ),
      ).toEqual('Duration 1,30,00');
    });
    it('and displays duration with a specified separator', () => {
      expect(
        detokenise(
          'Duration %duration%',
          durationDictionary({
            duration: 'PT1H30M',
            separator: ':',
            locale: 'en-gb',
          }),
        ),
      ).toEqual('Duration 1:30:00');
    });
    it('but sets duration as 00,00 when a duration string is invalid', () => {
      expect(
        detokenise(
          'Duration %duration%',
          durationDictionary({ duration: '3minutes', locale: 'en-gb' }),
        ),
      ).toEqual('Duration 00,00');
    });
    it('but uses an empty string as duration fallback', () => {
      expect(
        detokenise(
          'Duration %duration%',
          durationDictionary({ locale: 'en-gb' }),
        ),
      ).toEqual('Duration 00,00');
    });
  });
});
