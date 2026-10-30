import postcss from 'postcss';

const MODULE_CLASS_NAME = '[A-Za-z][\\w-]*__[\\w-]+';
const LEADING_MODULE_CLASS = new RegExp(
  `^(?:[a-z][\\w-]*)?\\.(${MODULE_CLASS_NAME})(?=[\\s.:#>+~\\[]|$)`,
);

const treeshakeCssModuleRules = (css: string, renderedHtml: string): string => {
  const referencedClasses = new Set(
    renderedHtml.match(new RegExp(MODULE_CLASS_NAME, 'g')) ?? [],
  );
  const root = postcss.parse(css);

  root.walkRules(rule => {
    const selectors = rule.selectors.filter(selector => {
      // Only a leading class is guaranteed to be required, unlike :not() or :is().
      const requiredClass = selector.match(LEADING_MODULE_CLASS)?.[1];
      return !requiredClass || referencedClasses.has(requiredClass);
    });

    if (selectors.length === 0) {
      rule.remove();
    } else if (selectors.length !== rule.selectors.length) {
      rule.replaceWith(rule.clone({ selector: selectors.join(',') }));
    }
  });

  root.walkAtRules('container', rule => {
    if (rule.nodes?.length === 0) rule.remove();
  });

  return root.toString();
};

export default treeshakeCssModuleRules;
