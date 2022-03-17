import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import snapshotTests from './testHelpers/snapshotTests';
import { landscape } from './testHelpers/fixtureData';
import Image, { Img } from '.';

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

describe("Image - should have mime-types set'", () => {
  const props = {
    ...landscape,
    width: null,
  };

  const { container } = render(<Img {...props} />);

  const sourceTags = container.querySelectorAll('source');

  expect(sourceTags).toHaveLength(2);
  expect(sourceTags[0].type).toEqual('image/webp');
  expect(sourceTags[1].type).toEqual('image/jpeg');
});

describe("Image - should have no mime-types set'", () => {
  const props = {
    ...landscape,
    width: null,
    primaryMimeType: null,
    fallbackMimeType: null,
  };

  const { container } = render(<Img {...props} />);

  const sourceTags = container.querySelectorAll('source');

  expect(sourceTags).toHaveLength(2);
  expect(sourceTags[0].type).toEqual('');
  expect(sourceTags[1].type).toEqual('');
});
