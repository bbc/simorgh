import getVideoOrientation from '.';
import {
  mediaBlockWithPV,
  mediaBlockWithoutPV,
  mediaBlockWithInvalidOrientation,
} from './fixtures';

describe('getVideoOrientation', () => {
  it(`Should return 'Portrait' if media block includes a portrait video`, () => {
    expect(getVideoOrientation(mediaBlockWithPV)).toEqual('Portrait');
  });

  it(`Should return 'Original' if media block includes landscape media`, () => {
    expect(getVideoOrientation(mediaBlockWithoutPV)).toEqual('Original');
  });

  it(`Should return 'Original' if media block includes an Ares media block with an invalid orientation`, () => {
    expect(getVideoOrientation(mediaBlockWithInvalidOrientation)).toEqual(
      'Original',
    );
  });

  it('Should return null if media block does not include an Ares media block', () => {
    expect(getVideoOrientation([])).toBe(null);
  });
});
