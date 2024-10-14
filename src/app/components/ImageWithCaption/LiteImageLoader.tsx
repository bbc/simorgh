/** @jsx jsx */
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import styles from './index.styles';
import LiteButton from '../LiteButton';

const script = function script(this: Element) {
  const parentEl = this.parentElement;
  const noScriptEl = parentEl?.querySelector('noscript');

  parentEl?.insertAdjacentHTML('afterbegin', noScriptEl?.innerHTML || '');

  noScriptEl?.remove();
  this.remove();
};

const LiteImageLoader = () => {
  return (
    <LiteButton css={styles.liteImageOverlayButton} script={script}>
      <Text css={styles.liteImageButtonText} fontVariant="sansBold">
        Load Image
      </Text>
    </LiteButton>
  );
};

export default LiteImageLoader;
