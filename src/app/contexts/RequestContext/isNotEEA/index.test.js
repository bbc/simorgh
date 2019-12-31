import isNotEEA from './index';

describe('isNotEEA', () => {
  it('should return false', () => {
    expect(isNotEEA('gb')).toEqual(false);
    expect(isNotEEA('fr')).toEqual(false);
  });

  it('should return true', () => {
    expect(isNotEEA('ng')).toEqual(true);
  });
});
