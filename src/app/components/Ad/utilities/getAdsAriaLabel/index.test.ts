import getAdsAriaLabel from '.';
import { SLOT_TYPES } from '../../types';

describe('getAdsAriaLabel', () => {
  it('should return correct aria label for leaderboard', () => {
    const leaderboardLabel = getAdsAriaLabel({
      label: 'Publicités',
      dir: 'ltr',
      slotType: SLOT_TYPES.LEADERBOARD,
    });
    expect(leaderboardLabel).toEqual('Publicités');
  });

  it('should return correct aria label for MPU', () => {
    const leaderboardLabel = getAdsAriaLabel({
      label: 'Publicités',
      dir: 'ltr',
      slotType: SLOT_TYPES.MPU,
    });
    expect(leaderboardLabel).toEqual('Publicités 2');
  });

  it('should return correct aria label for MPU for RTL', () => {
    const leaderboardLabel = getAdsAriaLabel({
      label: 'إعلان',
      dir: 'rtl',
      slotType: SLOT_TYPES.MPU,
    });
    expect(leaderboardLabel).toEqual('2 إعلان');
  });
});
