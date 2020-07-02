import canAdvertise from '.';

describe('canAdvertise', () => {
  it('should return true when isAdvertiseCombine equals `yes`', () => {
    const headers = {
      'x-ip_is_advertise_combined': 'yes',
    };
    expect(canAdvertise(headers)).toBeTruthy();
  });

  it('should return false isAdvertiseCombined equals `no`', () => {
    const headers = {
      'x-ip_is_advertise_combined': 'no',
    };
    expect(canAdvertise(headers)).toBeFalsy();
  });

  it('should return false when isUk equals yes', () => {
    const headers = {
      'x-bbc-edge-isuk': 'yes',
    };
    expect(canAdvertise(headers)).toBeFalsy();
  });

  it('should return true when isUk equals no', () => {
    const headers = {
      'x-bbc-edge-isuk': 'no',
    };
    expect(canAdvertise(headers)).toBeTruthy();
  });

  it('should return false when neither isUk nor isAdvertiseCombined header is present', () => {
    const headers = {};
    expect(canAdvertise(headers)).toBeFalsy();
  });
});
