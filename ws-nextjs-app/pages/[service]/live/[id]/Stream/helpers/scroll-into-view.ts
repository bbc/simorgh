// @ts-expect-error spike any types
const scrollIntoView = (componentToScrollTo, hasScrolled, isReducedMotion) => {
  if (componentToScrollTo && !hasScrolled.current) {
    componentToScrollTo.scrollIntoView({
      behavior: isReducedMotion ? 'auto' : 'smooth',
    });
    // to investigate further.
    setTimeout(() => {
      // eslint-disable-next-line no-param-reassign
      componentToScrollTo.firstChild.tabIndex = '-1';
      // componentToScrollTo.firstChild.focus();
      componentToScrollTo.focus();
      // eslint-disable-next-line no-param-reassign
      hasScrolled.current = true;
    }, 1000);
  }
};

export default scrollIntoView;
