import React, { PropsWithChildren } from 'react';
import defaultServiceVariants from '../../lib/config/services/defaultServiceVariants';
import { Services, Variants } from '../../models/types/global';
import themes from '../ThemeProvider/themes/loadableConfig';
import fallBackTheme from '../ThemeProvider/themes/news';

interface Props {
  service: Services;
  variant?: Variants | null;
}

// Utility to convert a theme object to CSS custom properties
const themeToCSSVars = (themeObj: Record<string, string | number>) =>
  Object.entries(themeObj)
    .map(([key, value]) => `--${key}: ${value};`)
    .join(' ');

// This assumes each theme exports a `cssVars` object with key-value pairs for CSS variables
export const ThemeVariables = ({
  children,
  service,
  variant,
}: PropsWithChildren<Props>) => {
  let LoadableTheme: any = fallBackTheme;
  const serviceVariant: Variants = variant || defaultServiceVariants[service];

  if (serviceVariant === 'default' || !serviceVariant) {
    LoadableTheme = themes[service];
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - TODO: come back to this
    LoadableTheme = themes[service][serviceVariant];
  }

  if (!LoadableTheme) {
    return null;
  }

  // Expect the theme to have a cssVars export (object of CSS variable key/values)
  const cssVars = LoadableTheme.cssVars || {};
  // Convert cssVars keys to CSS custom property format for inline style
  const cssVarStyle = Object.entries(cssVars).reduce(
    (acc, [key, value]) => ({ ...acc, [`--${key}`]: value }),
    {},
  );

  return (
    <div style={cssVarStyle}>
      {/* Optionally inject a <style> tag for global variables */}
      {Object.keys(cssVars).length > 0 && (
        <style>{`:root { ${themeToCSSVars(cssVars)} }`}</style>
      )}
      {children}
    </div>
  );
};

export default ThemeVariables;
