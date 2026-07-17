/**
 * Removes unused CSS custom properties from `:root {}` blocks in a stylesheet.
 *
 * Intended for the AMP/Lite inline `<style>` where every rule is concatenated
 * into one string, so the complete usage picture is available. Service themes
 * declare their full palette and font-variant token sets on `:root`, but any
 * given page references only a fraction of them, so the rest are dead weight
 * against AMP's 75KB inline-CSS limit.
 *
 * Safe because Simorgh never references custom properties from inline `style`
 * attributes (only from stylesheets) and AMP runs no custom JS, so the final
 * CSS string is the single source of truth for what is used.
 */

const CUSTOM_PROPERTY_USAGE = /var\(\s*(--[\w-]+)/g;
const ROOT_BLOCK = /:root\s*\{([^{}]*)\}/g;
const CUSTOM_PROPERTY_DECLARATION = /(--[\w-]+)\s*:\s*[^;}]+;?/g;

const matchNames = (input: string, pattern: RegExp): string[] =>
  [...input.matchAll(new RegExp(pattern.source, pattern.flags))].map(
    match => match[1],
  );

const collectUsedProperties = (css: string): Set<string> => {
  const used = new Set<string>(matchNames(css, CUSTOM_PROPERTY_USAGE));

  const declarationDependencies = new Map<string, string[]>();
  [...css.matchAll(ROOT_BLOCK)].forEach(([, body]) => {
    [...body.matchAll(CUSTOM_PROPERTY_DECLARATION)].forEach(([declaration]) => {
      const [name] = matchNames(declaration, CUSTOM_PROPERTY_DECLARATION);
      declarationDependencies.set(
        name,
        matchNames(declaration, CUSTOM_PROPERTY_USAGE),
      );
    });
  });

  const pending = [...used];
  while (pending.length) {
    const current = pending.pop() as string;
    (declarationDependencies.get(current) ?? []).forEach(dependency => {
      if (!used.has(dependency)) {
        used.add(dependency);
        pending.push(dependency);
      }
    });
  }

  return used;
};

const treeshakeCssCustomProperties = (css: string): string => {
  const usedProperties = collectUsedProperties(css);

  return css.replace(ROOT_BLOCK, (block, body) => {
    const remainingBody = body.replace(
      CUSTOM_PROPERTY_DECLARATION,
      (declaration: string, name: string) =>
        usedProperties.has(name) ? declaration : '',
    );

    return remainingBody.trim() === '' ? '' : `:root{${remainingBody.trim()}}`;
  });
};

export default treeshakeCssCustomProperties;
