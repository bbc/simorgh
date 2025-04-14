export default () => {
  const MIN_VIEWED_PERCENT = 0.5;
  const VIEWED_DURATION_MS = 1000;
  const options = { threshold: MIN_VIEWED_PERCENT };

  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const { target } = entry;
          const atiURL = target.getAttribute('data-lite-ati-view-tracking');
          setTimeout(() => {
            window.processClientDeviceAndSendLite(atiURL as string);
            observer.unobserve(target);
          }, VIEWED_DURATION_MS);
        }
      });
    }, options);

    const targets = document.querySelectorAll('[data-lite-ati-view-tracking]');
    targets.forEach(target => observer.observe(target));
  }
};
