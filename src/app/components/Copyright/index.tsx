// biome-ignore-all lint/a11y/useValidAriaRole: we want this
import { type PropsWithChildren, use } from 'react';

import { ServiceContext } from '../../contexts/ServiceContext';
import Text from '../Text';
import VisuallyHiddenText from '../VisuallyHiddenText';
import styles from './index.styles';

const CopyrightContainer = ({ children }: PropsWithChildren) => {
  const { imageCopyrightOffscreenText, lang } = use(ServiceContext);

  return (
    <Text
      as="p"
      role="text"
      fontVariant="sansRegular"
      size="minion"
      css={styles.copyright}
    >
      {imageCopyrightOffscreenText ? (
        <VisuallyHiddenText>{imageCopyrightOffscreenText}</VisuallyHiddenText>
      ) : null}
      {lang === 'en-GB' ? children : <span lang="en-GB">{children}</span>}
    </Text>
  );
};

export default CopyrightContainer;
