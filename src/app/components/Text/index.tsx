import { ElementType, ComponentPropsWithoutRef } from 'react';
import { Theme } from '@emotion/react';
import {
  baseStyles,
  primaryFontFamilyStyles,
  secondaryFontFamilyStyles,
  atlasStyles,
  elephantStyles,
  imperialStyles,
  royalStyles,
  foolscapStyles,
  canonStyles,
  trafalgarStyles,
  paragonStyles,
  doublePicaStyles,
  greatPrimerStyles,
  bodyCopyStyles,
  picaStyles,
  longPrimerStyles,
  brevierStyles,
  minionStyles,
} from './index.styled';

interface Props<T extends React.ElementType> {
  as?: T;
  className: string;
  children: JSX.Element | JSX.Element[];
  fontFamilyVariant?: 'primary' | 'secondary';
  size?:
    | 'atlas'
    | 'elephant'
    | 'imperial'
    | 'royal'
    | 'foolscap'
    | 'canon'
    | 'trafalgar'
    | 'paragon'
    | 'doublePica'
    | 'greatPrimer'
    | 'bodyCopy'
    | 'pica'
    | 'longPrimer'
    | 'brevier'
    | 'minion';
}

const sizes = {
  atlas: atlasStyles,
  elephant: elephantStyles,
  imperial: imperialStyles,
  royal: royalStyles,
  foolscap: foolscapStyles,
  canon: canonStyles,
  trafalgar: trafalgarStyles,
  paragon: paragonStyles,
  doublePica: doublePicaStyles,
  greatPrimer: greatPrimerStyles,
  bodyCopy: bodyCopyStyles,
  pica: picaStyles,
  longPrimer: longPrimerStyles,
  brevier: brevierStyles,
  minion: minionStyles,
};

const fontFamilyVariants = {
  primary: primaryFontFamilyStyles,
  secondary: secondaryFontFamilyStyles,
};

// This is a strongly typed polymorphic component inspired by https://itnext.io/react-polymorphic-components-with-typescript-f7ce72ea7af2

function Text<T extends ElementType = 'span'>({
  as,
  children,
  className,
  fontFamilyVariant = 'primary',
  size = 'pica',
}: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>) {
  const Component = as || 'span';

  return (
    <Component
      css={(theme: Theme) => [
        baseStyles(theme),
        sizes[size](theme),
        fontFamilyVariants[fontFamilyVariant]
          ? fontFamilyVariants[fontFamilyVariant](theme)
          : fontFamilyVariants.primary(theme),
      ]}
      className={className}
    >
      {children}
    </Component>
  );
}

export default Text;
