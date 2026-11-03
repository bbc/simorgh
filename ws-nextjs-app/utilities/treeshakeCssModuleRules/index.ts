import postcss, { AtRule } from 'postcss';
import selectorParser from 'postcss-selector-parser';
import nodeLogger from '#lib/logger.node';
import logCodes from '#app/lib/logger.const';

const CSS_MODULE_CLASS = /^[A-Za-z_][\w-]*_[\w-]+__[\w-]+$/;
const logger = nodeLogger(__filename);

const treeshakeCssModuleRules = (css: string, renderedHtml: string): string => {
  // Include all HTML tokens, not just class attributes, to retain classes used
  // in AMP bindings. Extra matches only retain CSS; they cannot remove styles.
  const renderedTokens = new Set(renderedHtml.match(/[\w-]+/g) ?? []);

  try {
    const root = postcss.parse(css);

    root.walkRules(rule => {
      if (!rule.selector.includes('__')) return;

      const selectors = selectorParser().astSync(rule.selector);
      let changed = false;

      selectors.each(selector => {
        // Only direct class nodes are required matches. Classes inside :not(),
        // :is(), :has(), etc. do not prove that a selector is unused.
        const hasMissingClass = selector.nodes.some(
          node =>
            node.type === 'class' &&
            CSS_MODULE_CLASS.test(node.value) &&
            !renderedTokens.has(node.value),
        );

        if (hasMissingClass) {
          selector.remove();
          changed = true;
        }
      });

      if (!selectors.nodes.length) {
        rule.remove();
      } else if (changed) {
        rule.assign({ selector: selectors.toString() });
      }
    });

    const atRules: AtRule[] = [];
    root.walkAtRules(atRule => {
      atRules.push(atRule);
    });
    atRules.reverse().forEach(atRule => {
      if (
        ['media', 'supports', 'container'].includes(atRule.name) &&
        atRule.nodes?.length === 0
      ) {
        atRule.remove();
      }
    });

    return root.toString();
  } catch (e) {
    logger.error(logCodes.AMP_LITE_CSS_TREE_SHAKE_ERROR, {
      message: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    });
    return css;
  }
};

export default treeshakeCssModuleRules;
