/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import React, { PropsWithChildren } from 'react';
import styles from './index.styles';
import LiteButton from '../LiteButton';

function script(this: Element) {
  const parentEl = this.parentElement;
  const templateEl = parentEl?.querySelector('template');

  if (!templateEl) return;

  parentEl?.prepend(templateEl.content.cloneNode(true));

  templateEl.remove();
  this.remove();
}

const LiteImageLoader = ({ children }: PropsWithChildren) => {
  return (
    <>
      <LiteButton css={styles.liteImageOverlayButton} script={script}>
        <Text css={styles.liteImageButtonText} fontVariant="sansBold">
          Load Image
        </Text>
      </LiteButton>
      <template>{children}</template>
    </>
  );
};

export default LiteImageLoader;
