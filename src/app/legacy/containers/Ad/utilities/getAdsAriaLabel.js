const getAdsAriaLabel = (adsLabel, dir, slotType) => {
  const mpuLabel =
    dir === 'ltr' || adsLabel === 'Advertisement'
      ? `${adsLabel} 2`
      : `2 ${adsLabel}`;
  const ariaLabel = slotType === 'leaderboard' ? adsLabel : mpuLabel;
  return ariaLabel;
};

export default getAdsAriaLabel;
