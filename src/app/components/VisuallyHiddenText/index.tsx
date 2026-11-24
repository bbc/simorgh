import type { ElementType, ReactNode } from 'react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './index.module.scss';

interface VisuallyHiddenTextProps<T extends ElementType> {
  id?: string;
  tabIndex?: number;
  as?: T;
  lang?: string;
  children?: ReactNode;
}

// `const T` preserves the chosen element type, e.g. `as="h1"` for the home page heading.
// Without `as`, the type defaults to span, matching the rendered element.
const VisuallyHiddenText = <const T extends ElementType = 'span'>({
  children,
  id,
  tabIndex,
  as,
  ...htmlAttributes
}: VisuallyHiddenTextProps<T> &
  Omit<
    ComponentPropsWithoutRef<T>,
    keyof VisuallyHiddenTextProps<T> | 'className'
  >) => {
  const Component: ElementType = as || 'span';
  return (
    <Component
      id={id}
      tabIndex={tabIndex}
      {...htmlAttributes}
      className={styles.visuallyHiddenText}
    >
      {children}
    </Component>
  );
};

export default VisuallyHiddenText;
