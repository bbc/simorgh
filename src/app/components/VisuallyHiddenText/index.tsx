import { ComponentPropsWithoutRef } from 'react';
import styles from './index.module.css';

interface VisuallyHiddenTextProps<T extends React.ElementType> {
  id?: string;
  tabIndex?: number;
  as?: T;
  lang?: string;
  children?: React.ReactNode;
}

const VisuallyHiddenText = <T extends React.ElementType>({
  children,
  id,
  tabIndex,
  as,
  ...htmlAttributes
}: VisuallyHiddenTextProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof VisuallyHiddenTextProps<T>>) => {
  const Component: React.ElementType = as || 'span';
  return (
    <Component
      className={styles.visuallyHiddenText}
      id={id}
      tabIndex={tabIndex}
      {...htmlAttributes}
    >
      {children}
    </Component>
  );
};

export default VisuallyHiddenText;
