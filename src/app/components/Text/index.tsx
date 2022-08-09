import { FC } from 'react';
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

interface Props {
  as?: React.ComponentType;
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

const Text: FC<Props> = ({
  as,
  children,
  className,
  fontFamilyVariant = 'primary',
  size = 'pica',
}: Props) => {
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
};

export default Text;
