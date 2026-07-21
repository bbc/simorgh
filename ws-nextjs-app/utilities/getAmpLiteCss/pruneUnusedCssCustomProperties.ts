/**
 * Public API for this module: pruneUnusedCssCustomProperties (default export)
 *
 * Removes `:root` custom property declarations that are not referenced by
 * `var(--name)` anywhere else in the supplied CSS.
 *
 * Context: theme SCSS emits the entire design-token set (e.g. the full
 * font-size/line-height scale across every size group) into `:root` on every
 * AMP/Lite request, regardless of which components are actually rendered on
 * that page. Since AMP/Lite CSS is inlined per-request (rather than cached as
 * an external stylesheet), unused tokens are pure dead weight in every
 * response. This strips them before the CSS is inlined.
 */

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ROOT_BLOCK_REGEX = /:root\{([^}]*)\}/g;

const isCustomPropertyUsed = (name: string, cssWithoutRootBlocks: string): boolean =>
  new RegExp(`var\\(\\s*${escapeRegExp(name)}\\s*[,)]`).test(cssWithoutRootBlocks);

const pruneUnusedCssCustomProperties = (css: string): string => {
  const declarations = [...css.matchAll(ROOT_BLOCK_REGEX)].flatMap(([, body]) =>
    body
      .split(';')
      .map(declaration => declaration.trim())
      .filter(Boolean),
  );

  if (declarations.length === 0) return css;

  const cssWithoutRootBlocks = css.replace(ROOT_BLOCK_REGEX, '');

  const usedDeclarations = declarations.filter(declaration => {
    const name = declaration.slice(0, declaration.indexOf(':')).trim();
    return isCustomPropertyUsed(name, cssWithoutRootBlocks);
  });

  if (usedDeclarations.length === 0) return cssWithoutRootBlocks;

  return `:root{${usedDeclarations.join(';')}}${cssWithoutRootBlocks}`;
};

export default pruneUnusedCssCustomProperties;
