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

  shouldMatchSnapshot('Calls the AMP player when platform is AMP', VideoAmp);

  shouldMatchSnapshot(
    'Calls the canonical player with a caption',
    VideoCanonicalWithCaption,
  );

  shouldMatchSnapshot(
    'Calls the AMP player with a caption',
    VideoAmpWithCaption,
  );

  describe('Fails and returns early when', () => {
    isNull('there is no versionId', VideoCanonicalNoVersionId);
    isNull('component is toggled off', VideoCanonicalToggledOff);
  });
});
