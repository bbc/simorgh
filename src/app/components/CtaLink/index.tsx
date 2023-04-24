/** @jsx jsx */
import { jsx } from '@emotion/react';
import Text from '../Text';
import styles from './index.styles';

interface CtaLinkProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

const CtaLink = ({ href, className, children }: CtaLinkProps) => {
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

export default CtaLink;
