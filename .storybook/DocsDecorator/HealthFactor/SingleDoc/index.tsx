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
  return (
    <li css={styles.documentationContainer}>
      <div css={[styles.documentationContainer, styles.documentationType]}>
        <span
          css={[
            styles.iconContainer,
            styles.statusIconContainer,
            typeof status === 'boolean'
              ? status
                ? styles.positive
                : styles.negative
              : styles.missing,
            styles.sidebarColumn,
          ]}
        >
          {typeof status === 'boolean' ? (
            status ? (
              <Confirm />
            ) : (
              <Close />
            )
          ) : (
            <Help />
          )}
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
            <span css={[styles.iconContainer, styles.linkIconContainer]}>
              {status ? <ExternalLink /> : <Help />}
            </span>
          </Text>
        </a>
      </div>
    </li>
  );
};

export default SingleDoc;
