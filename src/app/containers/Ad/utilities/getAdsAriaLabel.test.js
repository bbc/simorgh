import getAdsAriaLabel from './getAdsAriaLabel';

describe('getAdsAriaLabel', () => {
  it('should return correct aria label for leaderboard', () => {
    const leaderboardLabel = getAdsAriaLabel(
      'Publicités',
      'ltr',
      'leaderboard',
    );
    expect(leaderboardLabel).toEqual('Publicités');
  });

  it('should return correct aria label for MPU', () => {
    const leaderboardLabel = getAdsAriaLabel('Publicités', 'ltr', 'MPU');
    expect(leaderboardLabel).toEqual('Publicités 2');
  });

  it('should return correct aria label for MPU for RTL', () => {
    const leaderboardLabel = getAdsAriaLabel('إعلان', 'rtl', 'MPU');
    expect(leaderboardLabel).toEqual('2 إعلان');
  });
});
