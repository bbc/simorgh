import type { ElementType, ReactNode } from 'react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './index.styles';

interface VisuallyHiddenTextProps<T extends ElementType> {
  id?: string;
  tabIndex?: number;
  as?: T;
  lang?: string;
  children?: ReactNode;
}

const VisuallyHiddenText = <T extends ElementType>({
  children,
  id,
  tabIndex,
  as,
  ...htmlAttributes
}: VisuallyHiddenTextProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof VisuallyHiddenTextProps<T>>) => {
  const Component: ElementType = as || 'span';
  return (
    <Component
      css={styles.visuallyHiddenText}
      id={id}
      tabIndex={tabIndex}
      {...htmlAttributes}
    >
      {children}
    </Component>
  );
};

export default VisuallyHiddenText;
