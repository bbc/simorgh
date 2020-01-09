import { isNull, shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import {
  VideoAmp,
  VideoAmpWithCaption,
  VideoCanonicalNoPlaceholder,
  VideoCanonicalNoVersionId,
  VideoCanonicalToggledOff,
  VideoCanonicalWithCaption,
  VideoCanonicalWithPlaceholder,
} from './fixtureData';

describe('MediaPlayer', () => {
  beforeEach(() => {
    process.env.SIMORGH_EMBEDS_BASE_URL = 'https://embed-host.bbc.com';
  });

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
