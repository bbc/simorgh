/* istanbul ignore next */
export default () => {
  const MIN_VIEWED_PERCENT = 0.5;
  const VIEWED_DURATION_MS = 1000;
  const options = { threshold: MIN_VIEWED_PERCENT };
  const LITE_ATI_VIEW_TRACKING = 'data-lite-ati-view';
  const firedURLs: string[] = [];

  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const { target } = entry;
          const atiURL = target.getAttribute(LITE_ATI_VIEW_TRACKING) as string;
          setTimeout(() => {
            if (!firedURLs.includes(atiURL)) {
              window.processClientDeviceAndSendLite(atiURL);
              firedURLs.push(atiURL);
            }
            observer.unobserve(target);
          }, VIEWED_DURATION_MS);
        }
      });
    }, options);

    const targets = document.querySelectorAll(`[${LITE_ATI_VIEW_TRACKING}]`);
    targets.forEach(target => observer.observe(target));
  }
};
