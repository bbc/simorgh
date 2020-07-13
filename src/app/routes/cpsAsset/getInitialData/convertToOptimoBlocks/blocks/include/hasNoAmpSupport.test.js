import hasNoAmpSupport from './hasNoAmpSupport';

const truthyTestCases = ['vj-amp-not-supported', 'idt1-amp'];

const falsyTestCases = [
  'idt1-canonical',
  'idt2-canonical',
  'idt2-amp',
  'vj-canonical',
  'vj-supports-amp',
];

describe('hasNoAmpSupport', () => {
  truthyTestCases.forEach(classification => {
    it(`should return true if classification is ${classification}`, () => {
      expect(hasNoAmpSupport(classification)).toEqual(true);
    });
  });
  falsyTestCases.forEach(classification => {
    it(`should return false if classification is ${classification}`, () => {
      expect(hasNoAmpSupport(classification)).toEqual(false);
    });
  });
});
