import type { CSSProperties } from 'react';

import type { FontVariant, GelFontSize } from '#app/models/types/theming';

export type TypographyStyles = CSSProperties & {
  [property: `--gel-typography-${string}`]: string;
};

const fontVariantFallbacks: Record<FontVariant, FontVariant[]> = {
  sansRegular: [],
  sansRegularItalic: ['sansRegular'],
  sansBold: ['sansRegular'],
  sansBoldItalic: ['sansBold', 'sansRegular'],
  sansLight: ['sansRegular'],
  serifRegular: ['serifMedium', 'sansRegular'],
  serifMedium: ['sansBold', 'sansRegular'],
  serifMediumItalic: ['sansBoldItalic', 'sansBold', 'sansRegular'],
  serifBold: ['sansBold', 'sansRegular'],
  serifLight: ['serifMedium', 'sansRegular'],
};

const toKebabCase = (value: string) =>
  value.replace(/[A-Z]/g, character => `-${character.toLowerCase()}`);

const getVariableFallback = (
  variableNames: string[],
  property: string,
): string =>
  variableNames.reduceRight(
    (fallback, variableName) =>
      `var(--${toKebabCase(variableName)}-${property}, ${fallback})`,
    'inherit',
  );

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
    const variants = [fontVariant, ...fontVariantFallbacks[fontVariant]];
    styles['--gel-typography-font-family'] = getVariableFallback(
      variants,
      'font-family',
    );
    styles['--gel-typography-font-style'] = getVariableFallback(
      variants,
      'font-style',
    );
    styles['--gel-typography-font-weight'] = getVariableFallback(
      variants,
      'font-weight',
    );
  }

  return styles;
};
