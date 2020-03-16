import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';
import convertMedia from '.';
import { CPSVersionBlock, optimoVersionBlock } from './fixtures';

describe('convertVersion', () => {
  it('should convert a CPS `version` block format to Optimo `version` block format', () => {
    expect(convertMedia(CPSVersionBlock)).toEqual(optimoVersionBlock);
  });

  it('handles audio type', () => {
    const input = set(lensPath(['format']), 'audio', CPSVersionBlock);
    const expected = set(
      lensPath(['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'format']),
      'audio',
      optimoVersionBlock,
    );

    expect(convertMedia(input)).toEqual(expected);
  });

  it('returns false if resulting data seems invalid', () => {
    const inputA = set(lensPath(['format']), false, CPSVersionBlock);
    expect(convertMedia(inputA)).toEqual(false);

    const inputB = set(lensPath(['image', 'href']), false, CPSVersionBlock);
    expect(convertMedia(inputB)).toEqual(false);

    const inputC = set(lensPath(['externalId']), false, CPSVersionBlock);
    expect(convertMedia(inputC)).toEqual(false);
  });
});
