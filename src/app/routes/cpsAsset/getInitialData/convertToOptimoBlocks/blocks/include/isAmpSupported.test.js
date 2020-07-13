import isAmpSupported from './isAmpSupported';

const truthyTestCases = [
  'idt2-canonical',
  'idt2-amp',
  'vj-canonical',
  'vj-supports-amp',
];

const falsyTestCases = ['vj-amp-not-supported', 'idt1-amp', 'idt1-canonical'];

describe('isAmpSupported', () => {
  truthyTestCases.forEach(classification => {
    it(`should return true if classification is ${classification}`, () => {
      expect(isAmpSupported(classification)).toEqual(true);
    });
  });
  falsyTestCases.forEach(classification => {
    it(`should return false if classification is ${classification}`, () => {
      expect(isAmpSupported(classification)).toEqual(false);
    });
  });
});
