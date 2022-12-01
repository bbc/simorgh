import React from 'react';
import Text from '../../../../src/app/components/Text';
import { Confirm, Close, ExternalLink, Help } from '../Icons/icons';
import styles from './index.styles';

const SingleDoc = ({
  label,
  status,
  url,
  urlLabel,
}: {
  label: string;
  url: string;
  urlLabel: string;
  status?: boolean;
}) => {
  const iconStatusStyle = status ? styles.positive : styles.negative;
  const hasIcon = status ? <Confirm /> : <Close />;
  const statusIcon = typeof status === 'boolean' ? hasIcon : <Help />;

  return (
    <li css={styles.documentationContainer}>
      <div css={[styles.documentationContainer, styles.documentationType]}>
        <span
          aria-hidden
          css={[
            styles.iconContainer,
            styles.statusIconContainer,
            typeof status === 'boolean' ? iconStatusStyle : styles.missing,
            styles.sidebarColumn,
          ]}
        >
          {statusIcon}
        </span>

        <Text
          css={styles.sidebarColumn}
          size="bodyCopy"
          fontVariant="sansRegular"
        >
          {label}
        </Text>
      </div>
      <div css={styles.documentationLink}>
        <a href={url} css={styles.link}>
          <Text css={styles.link} size="brevier" fontVariant="sansBold">
            {urlLabel}
            <span
              aria-hidden
              css={[styles.iconContainer, styles.linkIconContainer]}
            >
              {status ? <ExternalLink /> : <Help />}
            </span>
          </Text>
        </a>
      </div>
    </li>
  );
};

export default SingleDoc;
