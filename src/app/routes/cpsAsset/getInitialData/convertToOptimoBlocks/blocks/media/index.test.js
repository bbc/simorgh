import assocPath from 'ramda/src/assocPath';
import pipe from 'ramda/src/pipe';
import loggerMock from '#testHelpers/loggerMock';
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
    expect(loggerMock.warn).not.toHaveBeenCalled();
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
    const missingFormat = assocPath(['format'], false, CPSMediaBlock);
    expect(convertMedia(missingFormat)).toEqual(false);

    const missingId = assocPath(['id'], false, CPSMediaBlock);
    expect(convertMedia(missingId)).toEqual(false);

    const missingVersionId = assocPath(
      ['versions', 0, 'versionId'],
      false,
      CPSMediaBlock,
    );
    expect(convertMedia(missingVersionId)).toEqual(false);
    expect(loggerMock.warn).toHaveBeenCalledTimes(3);
  });

  it('provides a default placeholder image if one is not defined', () => {
    const placeholderUrl = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}images/media_placeholder.png`;

    const input = assocPath(['imageUrl'], null, CPSMediaBlock);

    const expected = pipe(
      assocPath([...IMAGE_MODEL_PATH, 'locator'], placeholderUrl),
      assocPath([...METADATA_MODEL_PATH, 'imageUrl'], placeholderUrl),
    )(optimoVideoBlock);

    const fixtureAresResponse = {
      metadata: {
        id: 'fixture-id',
        locators: {
          assetUri: 'fixture-url',
        },
      },
    };

    expect(convertMedia(input, fixtureAresResponse)).toEqual(expected);
    expect(loggerMock.warn).toHaveBeenCalledWith('cps_media_without_image', {
      url: 'fixture-url',
      id: 'fixture-id',
    });
  });
});
