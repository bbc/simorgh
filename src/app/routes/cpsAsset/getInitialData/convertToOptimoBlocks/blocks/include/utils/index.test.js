import { isAmpSupported, getIncludeBlockIndex } from '.';
import pageData from '../fixtures';

describe('isAmpSupported', () => {
  const truthyTestCases = [
    'idt2-canonical',
    'idt2-amp',
    'vj-canonical',
    'vj-supports-amp',
  ];

  const falsyTestCases = ['vj-amp-not-supported', 'idt1-amp', 'idt1-canonical'];

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

describe('getIncludeIndex', () => {
  it('should correctly return include indexes', () => {
    const [idt1Block, idt2Block, vjBlock] = pageData.content.blocks;

    const { blocks } = pageData.content;

    expect(getIncludeBlockIndex(blocks, vjBlock)).toEqual(2);
    expect(getIncludeBlockIndex(blocks, idt1Block)).toEqual(0);
    expect(getIncludeBlockIndex(blocks, idt2Block)).toEqual(1);
  });
});
