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
    'Renders the canonical player placeholder when platform is canonical',
    VideoCanonical,
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
