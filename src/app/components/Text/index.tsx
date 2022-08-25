/** @jsx jsx */

import React, { ElementType, ComponentPropsWithoutRef } from 'react';
import { jsx } from '@emotion/react';

import { GelFontSize, FontVariant } from '../../interfaces';
import {
  getBaseStyles,
  getAtlasSize,
  getElephantSize,
  getImperialSize,
  getRoyalSize,
  getFoolscapSize,
  getCanonSize,
  getTrafalgarSize,
  getParagonSize,
  getDoublePicaSize,
  getGreatPrimerSize,
  getBodyCopySize,
  getPicaSize,
  getLongPrimerSize,
  getBrevierSize,
  getMinionSize,
  getSansRegular,
  getSansRegularItalic,
  getSansBold,
  getSansBoldItalic,
  getSansLight,
  getSerifRegular,
  getSerifMedium,
  getSerifMediumItalic,
  getSerifBold,
  getSerifLight,
} from './index.styled';

interface Props<T extends React.ElementType> {
  as?: T;
  className?: string;
  children: React.ReactNode;
  size?: GelFontSize;
  fontVariant?: FontVariant;
}

const fontVariants = {
  sansRegular: getSansRegular,
  sansRegularItalic: getSansRegularItalic,
  sansBold: getSansBold,
  sansBoldItalic: getSansBoldItalic,
  sansLight: getSansLight,
  serifRegular: getSerifRegular,
  serifMedium: getSerifMedium,
  serifMediumItalic: getSerifMediumItalic,
  serifBold: getSerifBold,
  serifLight: getSerifLight,
};

const sizes = {
  atlas: getAtlasSize,
  elephant: getElephantSize,
  imperial: getImperialSize,
  royal: getRoyalSize,
  foolscap: getFoolscapSize,
  canon: getCanonSize,
  trafalgar: getTrafalgarSize,
  paragon: getParagonSize,
  doublePica: getDoublePicaSize,
  greatPrimer: getGreatPrimerSize,
  bodyCopy: getBodyCopySize,
  pica: getPicaSize,
  longPrimer: getLongPrimerSize,
  brevier: getBrevierSize,
  minion: getMinionSize,
};

// This is a strongly typed polymorphic component inspired by https://itnext.io/react-polymorphic-components-with-typescript-f7ce72ea7af2
function Text<T extends ElementType = 'span'>({
  as,
  children,
  className,
  size = 'pica',
  fontVariant = 'sansRegular',
  ...htmlAttributes
}: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>) {
  const Component = as || 'span';

  return (
    <Component
      css={[getBaseStyles, sizes[size], fontVariants[fontVariant]]}
      className={className}
      {...htmlAttributes}
    >
      {children}
    </Component>
  );
}

export default Text;
