import type { CSSProperties } from 'react';

import type { FontVariant, GelFontSize } from '#app/models/types/theming';

export type TypographyStyles = CSSProperties & {
  [property: `--gel-typography-${string}`]: string;
};

const toKebabCase = (value: string) =>
  value.replace(/[A-Z]/g, character => `-${character.toLowerCase()}`);

export const getTypographyStyles = ({
  size,
  fontVariant,
}: {
  size?: GelFontSize;
  fontVariant?: FontVariant;
}): TypographyStyles => {
  const styles: TypographyStyles = {};

  if (size) {
    const scale = toKebabCase(size);
    styles['--gel-typography-font-size-group-a'] =
      `var(--font-size-${scale}-group-a, inherit)`;
    styles['--gel-typography-line-height-group-a'] =
      `var(--line-height-${scale}-group-a, inherit)`;
    styles['--gel-typography-font-size-group-b'] =
      `var(--font-size-${scale}-group-b, inherit)`;
    styles['--gel-typography-line-height-group-b'] =
      `var(--line-height-${scale}-group-b, inherit)`;
    styles['--gel-typography-font-size-group-d'] =
      `var(--font-size-${scale}-group-d, inherit)`;
    styles['--gel-typography-line-height-group-d'] =
      `var(--line-height-${scale}-group-d, inherit)`;
  }

  if (fontVariant) {
    const variant = toKebabCase(fontVariant);
    styles['--gel-typography-font-family'] =
      `var(--gel-font-variant-${variant}-font-family, inherit)`;
    styles['--gel-typography-font-style'] =
      `var(--gel-font-variant-${variant}-font-style, inherit)`;
    styles['--gel-typography-font-weight'] =
      `var(--gel-font-variant-${variant}-font-weight, inherit)`;
  }

  return styles;
};
