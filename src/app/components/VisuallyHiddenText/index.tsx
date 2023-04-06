/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren } from 'react';
import styles from './index.styles';

interface VisuallyHiddenTextProps {
  id?: string;
  tabIndex?: number;
  as?: React.ElementType;
  lang?: string;
}

const VisuallyHiddenText = ({
  children,
  id,
  tabIndex,
  as,
  lang,
  ...htmlAttributes
}: PropsWithChildren<VisuallyHiddenTextProps>) => {
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
