import { FC, HTMLAttributes } from 'react';

import { FontVariant, GelFontSize } from '../../models/types/theming';
import Text from '../Text';

interface Props extends HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
  fontVariant?: FontVariant;
  size?: GelFontSize;
}

const Paragraph: FC<Props> = ({
  children,
  className,
  fontVariant,
  size,
  ...htmlAttributes
}: Props) => {
  // Combine margin-0 with any additional className
  const combinedClassName = ['m-0', className].filter(Boolean).join(' ');
  
  return (
    <Text
      as="p"
      className={combinedClassName}
      fontVariant={fontVariant}
      size={size || 'bodyCopy'}
      {...htmlAttributes}
    >
      {children}
    </Text>
  );
};

export default Paragraph;
