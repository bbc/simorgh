import canAdvertise from '.';

describe('canAdvertise', () => {
  it('should return true if isAdvertiseCombine is defined and equals `yes`', () => {
    const headers = {
      'x-ip_is_advertise_combined': 'yes',
    };
    expect(canAdvertise(headers)).toBeTruthy();
  });

  it('should return false if isAdvertiseCombined is defined and equals `no`', () => {
    const headers = {
      'x-ip_is_advertise_combined': 'no',
    };
    expect(canAdvertise(headers)).toBeFalsy();
  });

  it('should return true when isAdvertiseCombined is not defined and isUk equals `no`', () => {
    const headers = {
      'x-bbc-edge-isuk': 'no',
    };
    expect(canAdvertise(headers)).toBeTruthy();
  });

  it('should return false when isAdvertiseCombined is not defined and isUk equals `yes`', () => {
    const headers = {
      'x-bbc-edge-isuk': 'yes',
    };
    expect(canAdvertise(headers)).toBeFalsy();
  });

  it('should return false when neither isAdvertiseCombined nor isUk header is defined', () => {
    const headers = {};
    expect(canAdvertise(headers)).toBeFalsy();
  });
});
