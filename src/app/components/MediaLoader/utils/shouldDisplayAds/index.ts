export default ({
  adsEnabled,
  showAdsBasedOnLocation,
  duration,
}: {
  adsEnabled: boolean;
  showAdsBasedOnLocation: boolean;
  duration: number;
}) => {
  const MIN_DURATION_FOR_PREROLLS = 30;

  const videoDurationSupportsPrerollAds = duration >= MIN_DURATION_FOR_PREROLLS;

  return [
    adsEnabled,
    showAdsBasedOnLocation,
    videoDurationSupportsPrerollAds,
  ].every(Boolean);
};
