// @ts-expect-error spike any types
const scrollIntoView = (componentToScrollTo, hasScrolled, isReducedMotion) => {
  console.log("I'm calling scrolling into view helper");
  console.log('componentToScrollTo', componentToScrollTo);
  if (componentToScrollTo && !hasScrolled.current) {
    console.log('The if statement is true');
    componentToScrollTo.scrollIntoView({
      behavior: isReducedMotion ? 'auto' : 'smooth',
    });
    setTimeout(() => {
      // eslint-disable-next-line no-param-reassign
      componentToScrollTo.firstChild.tabIndex = '-1';
      componentToScrollTo.firstChild.focus();
      // eslint-disable-next-line no-param-reassign
      hasScrolled.current = true;
    }, 1000);
  }
};

export default scrollIntoView;
