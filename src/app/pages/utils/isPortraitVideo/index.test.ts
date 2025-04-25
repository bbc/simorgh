import isPortraitVideo from '.';
import {
  mediaBlockWithPV,
  mediaBlockWithMultipleVersionsTypes,
  mediaBlockWithoutPV,
  mediaBlockWithInvalidOrientation,
} from './fixtures';

describe('isPortraitVideo', () => {
  it(`Should return true if media block includes a portrait video`, () => {
    expect(isPortraitVideo(mediaBlockWithPV)).toBe(true);
  });

  it(`Should return true if media block includes a versions block that has the 'Portrait' type amongst other types`, () => {
    expect(isPortraitVideo(mediaBlockWithMultipleVersionsTypes)).toBe(true);
  });

  it(`Should return false if media block includes landscape media`, () => {
    expect(isPortraitVideo(mediaBlockWithoutPV)).toBe(false);
  });

  it(`Should return false if media block includes an Ares media block with an invalid orientation`, () => {
    expect(isPortraitVideo(mediaBlockWithInvalidOrientation)).toBe(false);
  });

  it('Should return false if media block does not include an Ares media block', () => {
    expect(isPortraitVideo([])).toBe(false);
  });
});
