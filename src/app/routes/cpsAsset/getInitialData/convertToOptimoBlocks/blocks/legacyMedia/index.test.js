import convertMedia from '.';
import {
  legacyMedia,
  legacyMediaBlock,
  legacyOptimoVideoBlock,
} from './fixtures';

describe('convertMedia', () => {
  it('should convert a legacy `media` block format to Optimo `video` block format', () => {
    expect(convertMedia(legacyMediaBlock, legacyMedia)).toEqual(
      legacyOptimoVideoBlock,
    );
  });
});
