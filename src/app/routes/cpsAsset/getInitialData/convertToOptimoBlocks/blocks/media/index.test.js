import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';
import convertMedia from '.';
import { CPSMediaBlock, optimoVideoBlock } from './fixtures';

describe('convertMedia', () => {
  it('should convert a CPS `media` block format to Optimo `video` block format', () => {
    expect(convertMedia(CPSMediaBlock)).toEqual(optimoVideoBlock);
  });

  it('handles audio type', () => {
    const input = set(lensPath(['format']), 'audio', CPSMediaBlock);
    const expected = set(
      lensPath(['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'format']),
      'audio',
      optimoVideoBlock,
    );

    expect(convertMedia(input)).toEqual(expected);
  });

  it('returns false if resulting data seems invalid', () => {
    const inputA = set(lensPath(['format']), false, CPSMediaBlock);
    expect(convertMedia(inputA)).toEqual(false);

    const inputB = set(lensPath(['imageUrl']), false, CPSMediaBlock);
    expect(convertMedia(inputB)).toEqual(false);

    const inputC = set(
      lensPath(['versions', 0, 'versionId']),
      false,
      CPSMediaBlock,
    );
    expect(convertMedia(inputC)).toEqual(false);
  });
});
