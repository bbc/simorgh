import assocPath from 'ramda/src/assocPath';
import pipe from 'ramda/src/pipe';
import convertMedia from '.';
import { CPSMediaBlock, optimoVideoBlock } from './fixtures';

const METADATA_MODEL_PATH = [
  'model',
  'blocks',
  0,
  'model',
  'blocks',
  0,
  'model',
];

const IMAGE_MODEL_PATH = [
  'model',
  'blocks',
  0,
  'model',
  'blocks',
  1,
  'model',
  'blocks',
  0,
  'model',
];

describe('convertMedia', () => {
  it('should convert a CPS `media` block format to Optimo `video` block format', () => {
    expect(convertMedia(CPSMediaBlock)).toEqual(optimoVideoBlock);
  });

  it('handles audio type', () => {
    const input = assocPath(['format'], 'audio', CPSMediaBlock);
    const expected = assocPath(
      [...METADATA_MODEL_PATH, 'format'],
      'audio',
      optimoVideoBlock,
    );

    expect(convertMedia(input)).toEqual(expected);
  });

  it('returns false if resulting data seems invalid', () => {
    const inputA = assocPath(['format'], false, CPSMediaBlock);
    expect(convertMedia(inputA)).toEqual(false);

    const inputB = assocPath(['imageUrl'], false, CPSMediaBlock);
    expect(convertMedia(inputB)).toEqual(false);

    const inputC = assocPath(
      ['versions', 0, 'versionId'],
      false,
      CPSMediaBlock,
    );
    expect(convertMedia(inputC)).toEqual(false);
  });

  it('provides a default placeholder image if one is not defined', () => {
    const placeholderUrl = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}images/media_placeholder.png`;

    const input = assocPath(['imageUrl'], null, CPSMediaBlock);

    const expected = pipe(
      assocPath([...IMAGE_MODEL_PATH, 'locator'], placeholderUrl),
      assocPath([...METADATA_MODEL_PATH, 'imageUrl'], placeholderUrl),
    )(optimoVideoBlock);

    expect(convertMedia(input)).toEqual(expected);
  });
});
