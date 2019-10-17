import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
import {
  VideoFixture,
  VideoAmpFixture,
  VideoFixtureNoPlaceHolder,
  VideoFixtureNoVersionId,
  VideoFixtureToggledOff,
} from './fixtureData';

describe('MediaPlayer', () => {
  describe('is called correctly', () => {
    shouldMatchSnapshot(
      'Calls the canonical placeholder when platform is canonical',
      VideoFixture,
    );

    shouldMatchSnapshot(
      'Calls the canonical player when platform is canonical and placeholder is false',
      VideoFixtureNoPlaceHolder,
    );

    shouldMatchSnapshot(
      'Calls the AMP player when platform is AMP',
      VideoAmpFixture,
    );
  });

  describe('Fails and returns early when', () => {
    isNull('there is no versionId', VideoFixtureNoVersionId);
    isNull('component is toggled off', VideoFixtureToggledOff);
  });
});
