import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
import {
  VideoCanonicalWithPlaceholder,
  VideoCanonicalNoPlaceholder,
  VideoAmp,
  VideoCanonicalNoVersionId,
  VideoCanonicalToggledOff,
  VideoCanonicalWithCaption,
  VideoAmpWithCaption,
} from './fixtureData';

describe('MediaPlayer', () => {
  shouldMatchSnapshot(
    'Calls the canonical placeholder when platform is canonical and showPlaceholder is true',
    VideoCanonicalWithPlaceholder,
  );

  shouldMatchSnapshot(
    'Does not Call the canonical placeholder when platform is canonical but showPlaceholder is false',
    VideoCanonicalNoPlaceholder,
  );

  shouldMatchSnapshot('Renders the AMP player when platform is AMP', VideoAmp);

  shouldMatchSnapshot(
    'Renders the canonical player with a caption',
    VideoCanonicalWithCaption,
  );

  shouldMatchSnapshot(
    'Renders the AMP player with a caption',
    VideoAmpWithCaption,
  );

  describe('Fails and returns early when', () => {
    isNull('there is no versionId', VideoCanonicalNoVersionId);
    isNull('component is toggled off', VideoCanonicalToggledOff);
  });
});

it('should display the media caption', () => {
  const { getByText } = render(VideoAmpWithCaption);

  const message = getByText('Media Player With Caption');
  expect(message).toBeInTheDocument();
});
