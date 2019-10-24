import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
import {
  VideoCanonical,
  VideoAmp,
  VideoCanonicalWithOverrides,
  VideoCanonicalNoPlaceHolder,
  VideoCanonicalNoVersionId,
  VideoCanonicalToggledOff,
} from './fixtureData';

describe('MediaPlayer', () => {
  shouldMatchSnapshot(
    'Calls the canonical placeholder when platform is canonical',
    VideoCanonical,
  );

  shouldMatchSnapshot(
    'Calls the canonical player when platform is canonical and placeholder is false',
    VideoCanonicalNoPlaceHolder,
  );

  shouldMatchSnapshot(
    'Calls the canonical placeholder when platform is canonical with CPS overrides',
    VideoCanonicalWithOverrides,
  );

  shouldMatchSnapshot('Calls the AMP player when platform is AMP', VideoAmp);

  describe('Fails and returns early when', () => {
    isNull('there is no versionId', VideoCanonicalNoVersionId);
    isNull('component is toggled off', VideoCanonicalToggledOff);
  });
});
