import convertMedia from '.';
import { CPSMediaBlock, optimoVideoBlock } from './fixtures';

describe('convertMedia', () => {
  it('should convert a CPS `media` block format to Optimo `video` block format', () => {
    expect(convertMedia(CPSMediaBlock)).toEqual(optimoVideoBlock);
  });
});
