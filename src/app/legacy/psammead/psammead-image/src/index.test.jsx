import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import Image, { Img } from '.';
import { landscape } from './testHelpers/fixtureData';
import snapshotTests from './testHelpers/snapshotTests';

describe("Image - imported as default 'Image'", () => {
  const props = {
    ...landscape,
    width: null,
  };
  shouldMatchSnapshot(
    'should render image correctly without width',
    <Image {...props} />,
  );
  snapshotTests(Img);
});

describe("Image - imported as '{ Img }'", () => {
  const props = {
    ...landscape,
    width: null,
  };
  shouldMatchSnapshot(
    'should render image correctly without width',
    <Img {...props} />,
  );
  snapshotTests(Image);
});

describe("Image - with Fade-in effect'", () => {
  const props = {
    ...landscape,
    width: null,
    fade: true,
  };
  shouldMatchSnapshot(
    'should render image correctly without width',
    <Img {...props} />,
  );
  snapshotTests(Image);
});
