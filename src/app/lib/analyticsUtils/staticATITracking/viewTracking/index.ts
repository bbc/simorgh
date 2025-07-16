/* istanbul ignore next */
export default () => {
  const MIN_VIEWED_PERCENT = 0.5;
  const VIEWED_DURATION_MS = 1000;
  const options = { threshold: MIN_VIEWED_PERCENT };
  const STATIC_ATI_VIEW_TRACKING = 'data-static-ati-view';
  const STATIC_REVERB_VIEW_TRACKING = 'data-static-reverb-view';
  const firedURLs: string[] = [];

  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const { target } = entry;
          const atiURL = target.getAttribute(
            STATIC_ATI_VIEW_TRACKING,
          ) as string;
          const reverbURL = target.getAttribute(
            STATIC_REVERB_VIEW_TRACKING,
          ) as string;
          const primaryTrackingUrl = reverbURL ?? atiURL;

          setTimeout(() => {
            if (!firedURLs.includes(primaryTrackingUrl)) {
              window.processClientDeviceAndSendStaticBeacon(atiURL, reverbURL);
              firedURLs.push(primaryTrackingUrl);
            }
            observer.unobserve(target);
          }, VIEWED_DURATION_MS);
        }
      });
    }, options);

    const targets = document.querySelectorAll(
      `[${STATIC_REVERB_VIEW_TRACKING}], [${STATIC_ATI_VIEW_TRACKING}]`,
    );
    targets.forEach(target => observer.observe(target));
  }
};
