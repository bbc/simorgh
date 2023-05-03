/** @jsx jsx */
import { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import Text from '../Text';
import styles from './index.styles';
import { CallToActionLinkProps } from './types';

const CallToActionLink = ({
  href,
  className,
  children,
}: PropsWithChildren<CallToActionLinkProps>) => {
  return (
    <a href={href} className={className} css={styles.linkBackground}>
      <div css={styles.linkTextWrapper}>
        <Text size="pica" fontVariant="sansBold" css={styles.linkText}>
          {children}
        </Text>
      </div>
    </a>
  );
};

export default CallToActionLink;
