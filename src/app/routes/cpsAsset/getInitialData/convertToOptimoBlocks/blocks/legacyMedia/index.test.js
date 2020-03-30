import convertMedia from '.';
import { legacyMediaBlock, legacyOptimoVideoBlock } from './fixtures';

describe('convertMedia', () => {
  it('should convert a legacy `media` block format to Optimo `video` block format', () => {
    expect(convertMedia(legacyMediaBlock)).toEqual(legacyOptimoVideoBlock);
  });
});
