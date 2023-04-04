/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren } from 'react';
import Text from '../Text';
import styles from './index.styles';

interface VisuallyHiddenTextProps {
  id?: string;
  tabIndex?: number;
  as?: React.ElementType;
}

const VisuallyHiddenText = ({
  children,
  id,
  tabIndex,
  as,
}: PropsWithChildren<VisuallyHiddenTextProps>) => {
  return (
    <Text css={styles.visuallyHiddenText} id={id} tabIndex={tabIndex} as={as}>
      {children}
    </Text>
  );
};

export default VisuallyHiddenText;
