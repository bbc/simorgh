import * as numerals from '.';

describe('Numeral systems', () => {
  const numeralSystems = Object.keys(numerals).filter(key =>
    Array.isArray(numerals[key]),
  );
  numeralSystems.forEach(numeralSystem => {
    it(`should return ${numeralSystem} numerals`, () => {
      expect(numerals[numeralSystem]).toMatchSnapshot();
    });
  });
});

describe('makeNumeralTranslator', () => {
  it('should return a function', () => {
    const translate = numerals.makeNumeralTranslator();
    expect(typeof translate).toBe('function');
  });

  describe('valid numeral system', () => {
    const RomanNumerals = 'N_Ⅰ_Ⅱ_Ⅲ_Ⅳ_Ⅴ_Ⅵ_Ⅶ_Ⅷ_Ⅸ_X'.split('_');
    const examples = [
      ['0 1 2 3', 'N Ⅰ Ⅱ Ⅲ'],
      ['9', 'Ⅸ'],
      ['10', 'ⅠN'], // Only first 10 symbols are currently used
      ['The Magnificent 7', 'The Magnificent Ⅶ'],
    ];
    const translate = numerals.makeNumeralTranslator(RomanNumerals);

    it.each(examples)('should translate input %s', (input, expected) => {
      expect(translate(input)).toBe(expected);
    });
  });

  describe('invalid numeral systems', () => {
    const invalidSystems = [
      '0_1_2_3_4_5_6_7_8'.split('_'), // too small
      'potato', // wrong type
      undefined, // missing arg
    ];

    it('should return the input unchanged', () => {
      invalidSystems.forEach(invalidSystem => {
        const translate = numerals.makeNumeralTranslator(invalidSystem);
        const input = 'Test 123';
        expect(translate(input)).toBe(input);
      });
    });
  });
});
