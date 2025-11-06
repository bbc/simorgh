/* istanbul ignore next */
export default () => {
  const MIN_VIEWED_PERCENT = 0.5;
  const VIEWED_DURATION_MS = 1000;
  const options = { threshold: MIN_VIEWED_PERCENT };
  const STATIC_REVERB_VIEW_TRACKING = 'data-static-reverb-view';
  const firedURLs: string[] = [];

  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const { target } = entry;
          const reverbUrl = target.getAttribute(
            STATIC_REVERB_VIEW_TRACKING,
          ) as string;

          setTimeout(() => {
            if (!firedURLs.includes(reverbUrl)) {
              window.processClientDeviceAndSendStaticBeacon({ reverbUrl });
              firedURLs.push(reverbUrl);
            }
            observer.unobserve(target);
          }, VIEWED_DURATION_MS);
        }
      });
    }, options);

    const targets = document.querySelectorAll(
      `[${STATIC_REVERB_VIEW_TRACKING}]`,
    );
    targets.forEach(target => observer.observe(target));
  }
};
