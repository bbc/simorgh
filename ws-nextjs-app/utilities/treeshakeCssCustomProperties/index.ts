const CUSTOM_PROPERTY_USAGE = /var\(\s*(--[\w-]+)/g;
const ROOT_BLOCK = /:root\s*\{([^{}]*)\}/g;
const CUSTOM_PROPERTY_DECLARATION = /(--[\w-]+)\s*:\s*[^;}]+;?/g;

const matchNames = (input: string, pattern: RegExp): string[] =>
  [...input.matchAll(new RegExp(pattern.source, pattern.flags))].map(
    match => match[1],
  );

const collectUsedProperties = (
  css: string,
  usageSource: string,
): Set<string> => {
  const used = new Set<string>([
    ...matchNames(css, CUSTOM_PROPERTY_USAGE),
    ...matchNames(usageSource, CUSTOM_PROPERTY_USAGE),
  ]);

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

// usageSource carries the rendered HTML so custom properties referenced only from
// inline style attributes, such as runtime typography, are not treated as unused.
const treeshakeCssCustomProperties = (
  css: string,
  usageSource = '',
): string => {
  const usedProperties = collectUsedProperties(css, usageSource);

  return css.replace(ROOT_BLOCK, (_match, body) => {
    const remainingBody = body.replace(
      CUSTOM_PROPERTY_DECLARATION,
      (declaration: string, name: string) =>
        usedProperties.has(name) ? declaration : '',
    );

    return remainingBody.trim() === '' ? '' : `:root{${remainingBody.trim()}}`;
  });
};

export default treeshakeCssCustomProperties;
