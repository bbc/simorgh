/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, useContext } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import VisuallyHiddenText from '../VisuallyHiddenText';
import Text from '../Text';
import styles from './index.styles';

const CopyrightContainer = ({ children }: PropsWithChildren) => {
  const { imageCopyrightOffscreenText, lang } = useContext(ServiceContext);

  return (
    <Text as="p" fontVariant="sansRegular" size="minion" css={styles.copyright}>
      {imageCopyrightOffscreenText ? (
        <VisuallyHiddenText>{imageCopyrightOffscreenText}</VisuallyHiddenText>
      ) : null}
      {lang === 'en-GB' ? children : <span lang="en-GB">{children}</span>}
    </Text>
  );
};

export default CopyrightContainer;
