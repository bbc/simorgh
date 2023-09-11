/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, useContext } from 'react';
import { string } from 'prop-types';
import { ServiceContext } from '../../contexts/ServiceContext';
import VisuallyHiddenText from '../VisuallyHiddenText';
import Text from '../Text';
import styles from './index.styles';

const CopyrightContainer = ({ children }: PropsWithChildren) => {
  const { dir, imageCopyrightOffscreenText, lang } = useContext(ServiceContext);
  const copyrightProps = {
    position: dir === 'rtl' ? 'right' : 'left',
  };

  return (
    <Text
      as="p"
      fontVariant="sansRegular"
      size="minion"
      css={styles.copyright}
      {...copyrightProps}
    >
      {imageCopyrightOffscreenText ? (
        <VisuallyHiddenText>{imageCopyrightOffscreenText}</VisuallyHiddenText>
      ) : null}
      {lang === 'en-GB' ? children : <span lang="en-GB">{children}</span>}
    </Text>
  );
};

CopyrightContainer.propTypes = {
  children: string.isRequired,
};

export default CopyrightContainer;
