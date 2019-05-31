import React from 'react';
import TestRenderer from 'react-test-renderer';
import { isNull } from '../../helpers/tests/testHelpers';
import { DialContextProvider } from '../../contexts/DialContext';
import MPulseBeaconContainer from './index';
import MPulseBeacon from '../../components/MPulseBeacon';

jest.mock('../../components/MPulseBeacon', () => () => <script>mPulse</script>);

// eslint-disable-next-line react/prop-types
const beaconContainerWithContext = dials => (
  <DialContextProvider dials={dials}>
    <MPulseBeaconContainer />
  </DialContextProvider>
);

describe('MPulseBeacon', () => {
  const context = { mpulse: true };
  const apiKey = 'XXXXX-XXXXX-XXXXX-XXXXX-XXXX';

  beforeEach(() => {
    context.mpulse = true;
    process.env.MPULSE_API_KEY = apiKey;
  });

  describe('env has mPulse api key and mpulse dial is enabled', () => {
    it('should render a beacon component with the api key', () => {
      const testRenderer = TestRenderer.create(
        beaconContainerWithContext(context),
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(MPulseBeacon)).toHaveLength(1);
      expect(testInstance.findByType(MPulseBeacon).props.apiKey).toEqual(
        apiKey,
      );
    });
  });

  describe('mpulse dial is disabled', () => {
    beforeEach(() => {
      context.mpulse = false;
    });

    isNull('should not render the beacon', beaconContainerWithContext(context));
  });

  describe('env does not have mPulse api key', () => {
    beforeEach(() => {
      delete process.env.MPULSE_API_KEY;
    });

    isNull('should not render the beacon', beaconContainerWithContext(context));
  });
});
