import React from 'react';
import { shallow } from 'enzyme';
import { isNull } from '../../helpers/tests/testHelpers';
import MPulseBeaconContainer from './index';
import MPulseBeacon from '../../components/MPulseBeacon';

jest.mock('../../components/MPulseBeacon', () => () => <script>mPulse</script>);

describe('MPulseBeacon', () => {
  describe('env has mPulse api key', () => {
    const apiKey = 'XXXXX-XXXXX-XXXXX-XXXXX-XXXX';
    beforeEach(() => {
      process.env.MPULSE_API_KEY = apiKey;
    });

    it('should render a beacon component with the api key', () => {
      const wrapper = shallow(<MPulseBeaconContainer />);
      expect(wrapper.find(MPulseBeacon)).toHaveLength(1);
      expect(wrapper.find(MPulseBeacon).prop('apiKey')).toEqual(apiKey);
    });
  });

  describe('env does not have mPulse api key', () => {
    beforeEach(() => {
      delete process.env.MPULSE_API_KEY;
    });

    isNull('should not render the beacon', <MPulseBeaconContainer />);
  });
});
