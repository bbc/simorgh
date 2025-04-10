export default () => {
  const MIN_VIEWED_PERCENT = 0.5;
  const VIEWED_DURATION_MS = 1000;
  const options = { threshold: MIN_VIEWED_PERCENT };
  const firedURLs: string[] = [];

  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const { target } = entry;
          const atiURL = target.getAttribute('data-lite-ati-view') as string;
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

    const targets = document.querySelectorAll('[data-lite-ati-view]');
    targets.forEach(target => observer.observe(target));
  }
};
