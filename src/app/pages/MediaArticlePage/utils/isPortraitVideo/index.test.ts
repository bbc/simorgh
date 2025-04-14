import isPortraitVideo from '.';
import { mediaBlockWithPV, mediaBlockWithoutPV } from './fixtures';

describe('isPortraitVideo', () => {
  it('Should return true if media block includes a portrait video', () => {
    expect(isPortraitVideo(mediaBlockWithPV)).toBe(true);
  });

  it('Should return false if media block does not include a portrait video', () => {
    expect(isPortraitVideo(mediaBlockWithoutPV)).toBe(false);
  });

  it('Should return false if media block does not include an Ares media block', () => {
    expect(isPortraitVideo([])).toBe(false);
  });
});
