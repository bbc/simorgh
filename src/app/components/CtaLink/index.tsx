/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import { LeftChevron, RightChevron } from '../icons';
import Text from '../Text';
import styles from './index.styles';

interface CtaLinkProps {
  href?: string;
  className?: string;
  linkText?: string;
  backgroundColor?: string;
  textColor?: string;
}

const CtaLink = ({
  href,
  linkText,
  className,
  backgroundColor,
  textColor,
}: CtaLinkProps) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';
  return (
    <a href={href} className={className}>
      <div css={styles.linkAndChevron}>
        <Text size="pica" fontVariant="sansBold" css={styles.link}>
          {linkText}
          {isRtl ? (
            <LeftChevron css={styles.chevron} />
          ) : (
            <RightChevron css={styles.chevron} />
          )}
        </Text>
      </div>
    </a>
  );
};

export default CtaLink;
