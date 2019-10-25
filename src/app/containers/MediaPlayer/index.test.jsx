import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
import {
  VideoCanonical,
  VideoAmp,
  VideoCanonicalNoVersionId,
  VideoCanonicalToggledOff,
  VideoCanonicalWithCaption,
  VideoAmpWithCaption,
} from './fixtureData';

describe('MediaPlayer', () => {
  shouldMatchSnapshot(
    'Calls the canonical placeholder when platform is canonical',
    VideoCanonical,
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
