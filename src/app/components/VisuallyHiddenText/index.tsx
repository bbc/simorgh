/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from '@emotion/react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './index.styles';

interface VisuallyHiddenTextProps<T extends React.ElementType> {
  id?: string;
  tabIndex?: number;
  as?: T;
}

const VisuallyHiddenText = <T extends React.ElementType>({
  children,
  id,
  tabIndex,
  as,
  ...htmlAttributes
}: VisuallyHiddenTextProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof VisuallyHiddenTextProps<T>>) => {
  const Component = as || 'span';
  return (
    <Component id={id} tabIndex={tabIndex} {...htmlAttributes}>
      {children}
    </Component>
  );
};

export default VisuallyHiddenText;
