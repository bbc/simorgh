/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, useContext } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import VisuallyHiddenText from '../VisuallyHiddenText';
import Text from '../Text';
import styles from './index.styles';

const CopyrightContainer = ({ children }: PropsWithChildren) => {
  const { dir, imageCopyrightOffscreenText, lang } = useContext(ServiceContext);

  return (
    <Text
      as="p"
      fontVariant="sansRegular"
      size="minion"
      css={[
        styles.copyright,
        { ...(dir === 'rtl' ? { right: 0 } : { left: 0 }) },
      ]}
    >
      {imageCopyrightOffscreenText ? (
        <VisuallyHiddenText>{imageCopyrightOffscreenText}</VisuallyHiddenText>
      ) : null}
      {lang === 'en-GB' ? children : <span lang="en-GB">{children}</span>}
    </Text>
  );
};

export default CopyrightContainer;
