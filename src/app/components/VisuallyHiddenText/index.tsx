/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren } from 'react';
import styles from './index.styles';

interface VisuallyHiddenTextProps<T extends React.ElementType> {
  id?: string;
  tabIndex?: number;
  as?: T;
  lang?: string;
}

const VisuallyHiddenText = <T extends React.ElementType>({
  children,
  id,
  tabIndex,
  as,
  lang,
  ...htmlAttributes
}: PropsWithChildren<VisuallyHiddenTextProps<T>>) => {
  const Component = as || 'span';
  return (
    <Component
      css={styles.visuallyHiddenText}
      id={id}
      tabIndex={tabIndex}
      lang={lang}
      {...htmlAttributes}
    >
      {children}
    </Component>
  );
};

export default VisuallyHiddenText;
