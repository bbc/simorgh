import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import nodeLogger from '#lib/logger.node';
import logCodes from '#app/lib/logger.const';
import { browserslist as targetBrowsers } from '../../package.json';

/**
 * Public API for this module: optimiseCssPrefixes (default export)
 *
 * Removes vendor-prefixed CSS that isn't needed for the project's real target
 * browsers (see `browserslist` in package.json), using Autoprefixer's own
 * caniuse-backed compatibility data rather than a hand-rolled pattern match.
 * This correctly keeps properties with no standard equivalent (e.g.
 * `-webkit-overflow-scrolling`) regardless of target, since Autoprefixer only
 * removes prefixes it knows are safe to remove for the given browser list.
 */

const logger = nodeLogger(__filename);

const autoprefixerPlugin = autoprefixer({
  overrideBrowserslist: targetBrowsers,
  remove: true,
});

const optimiseCssPrefixes = (css: string): string => {
  try {
    return postcss([autoprefixerPlugin]).process(css, { from: undefined }).css;
  } catch (e) {
    logger.error(logCodes.AMP_LITE_CSS_AUTOPREFIXER_ERROR, {
      message: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    });
    return css;
  }
};

export default optimiseCssPrefixes;
