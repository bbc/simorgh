import Image, { Img } from './index';
import snapshotTests from './testHelpers/snapshotTests';

describe("Image - imported as '{ Img }'", () => {
  snapshotTests(Img);
});

describe("Image - imported as default 'Image'", () => {
  snapshotTests(Image);
});
