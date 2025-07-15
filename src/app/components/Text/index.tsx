import {
  ElementType,
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardedRef,
} from 'react';
import { GelFontSize, FontVariant } from '../../models/types/theming';

interface Props<T extends React.ElementType> {
  as?: T;
  className?: string;
  size?: GelFontSize;
  fontVariant?: FontVariant;
}

// Font size mapping to Tailwind classes
const fontSizeMap: Record<GelFontSize, string> = {
  atlas: 'text-atlas',
  elephant: 'text-elephant',
  imperial: 'text-imperial',
  royal: 'text-royal',
  foolscap: 'text-foolscap',
  canon: 'text-canon',
  trafalgar: 'text-trafalgar',
  paragon: 'text-paragon',
  doublePica: 'text-double-pica',
  greatPrimer: 'text-great-primer',
  bodyCopy: 'text-body-copy',
  pica: 'text-pica',
  longPrimer: 'text-long-primer',
  brevier: 'text-brevier',
  minion: 'text-minion',
};

// Font variant mapping to Tailwind classes
const fontVariantMap: Record<FontVariant, string> = {
  sansRegular: 'font-sans font-normal',
  sansBold: 'font-sans font-bold',
  sansItalic: 'font-sans italic',
  sansBoldItalic: 'font-sans font-bold italic',
  serifRegular: 'font-serif font-normal',
  serifBold: 'font-serif font-bold',
  serifItalic: 'font-serif italic',
  serifBoldItalic: 'font-serif font-bold italic',
};

// This is a strongly typed polymorphic component inspired by https://itnext.io/react-polymorphic-components-with-typescript-f7ce72ea7af2
const Text = forwardRef(function Text<T extends ElementType = 'span'>(
  {
    as,
    children,
    className,
    size = 'pica',
    fontVariant = 'sansRegular',
    ...htmlAttributes
  }: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>,
  ref: ForwardedRef<HTMLElement>,
) {
  const Component: React.ElementType = as || 'span';
  
  const sizeClass = fontSizeMap[size];
  const variantClass = fontVariantMap[fontVariant];
  
  const combinedClassName = [
    'text-grey-10', // Default text color
    sizeClass,
    variantClass,
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <Component
      {...(ref && { ref })}
      className={combinedClassName}
      {...htmlAttributes}
    >
      {children}
    </Component>
  );
});

export default Text;
