import postcss, { AtRule, ChildNode, Rule } from 'postcss';
import selectorParser from 'postcss-selector-parser';
import nodeLogger from '#lib/logger.node';
import logCodes from '#app/lib/logger.const';

/**
 * Public API for this module: mergeCssMediaQueries (default export)
 *
 * The AMP/Lite inline stylesheet concatenates many component chunks, so the same
 * media query is repeated once per component. A typical article ships over 200
 * `@media` blocks covering only ~35 distinct queries, and each repeat re-sends
 * the query text. Folding repeats into a single block is a meaningful saving
 * against AMP's 75KB inline-CSS limit.
 *
 * Merging moves rules, which can change the cascade, so only blocks whose rules
 * are built entirely from per-component hashed class names are merged. Those
 * cannot collide with another component's rules, so their relative order to
 * everything else does not matter. Blocks containing element or global selectors
 * are left exactly where they are.
 */

const logger = nodeLogger(__filename);

// Emotion emits "(min-width: 37.5rem)" and the Next CSS pipeline emits
// "(min-width:37.5rem)". Identical queries never merge unless spacing is normalised.
const normaliseParams = (params: string) =>
  params
    .replace(/\s*([:,])\s*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

// Emotion (.css-<hash>, .emotion-N) and CSS Modules (.Name_key__hash).
const HASHED_CLASS_NAME =
  /^(?:css-[a-z0-9]+|emotion-\d+|[A-Za-z][\w]*_[\w]+__[\w-]+)$/;

const isSafeSelectorNode = (node: selectorParser.Node): boolean => {
  if (node.type === 'class') {
    return HASHED_CLASS_NAME.test(node.value);
  }

  if (node.type === 'combinator') return true;

  if (node.type === 'pseudo') {
    return node.nodes.every(isSafeSelectorNode);
  }

  if (node.type === 'root' || node.type === 'selector') {
    return node.nodes.every(isSafeSelectorNode);
  }

  return false;
};

const isHashedSelector = (selector: string) => {
  try {
    return selectorParser().astSync(selector).nodes.every(isSafeSelectorNode);
  } catch {
    return false;
  }
};

const isSafeToMove = (node: ChildNode): node is Rule =>
  node.type === 'rule' && node.selectors.every(isHashedSelector);

const canMerge = (atRule: AtRule) =>
  Boolean(atRule.nodes?.length) &&
  (atRule.nodes as ChildNode[]).every(isSafeToMove);

const mergeCssMediaQueries = (css: string): string => {
  try {
    const root = postcss.parse(css);
    const mergeTargets = new Map<string, AtRule>();

    root.each(node => {
      if (node.type !== 'atrule' || node.name !== 'media') return;
      if (!canMerge(node)) return;

      // Keyed on the normalised query so spacing variants collapse together,
      // while the surviving block keeps whatever params it was written with.
      const key = normaliseParams(node.params);
      const target = mergeTargets.get(key);

      if (target) {
        target.append(node.nodes);
        node.remove();
        return;
      }
      mergeTargets.set(key, node);
    });

    return root.toString();
  } catch (e) {
    logger.error(logCodes.AMP_LITE_CSS_MEDIA_QUERY_MERGE_ERROR, {
      message: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    });
    return css;
  }
};

export default mergeCssMediaQueries;
