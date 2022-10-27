import React from 'react';
import Text from '../../../src/app/components/Text';
import { Confirm, Close, ExternalLink, Help } from '../Icons/icons';
import styles from './index.styles';

const SingleDoc = ({
  docTitle,
  docLocation,
  announce,
  missingAnnounce,
  missingLink,
}: {
  docTitle: string;
  docLocation?: string;
  announce: string;
  missingAnnounce: string;
  missingLink: string;
}) => {
  return (
    <li css={styles.documentationContainer}>
      <div css={[styles.documentationContainer, styles.documentationType]}>
        <span
          css={[
            styles.iconContainer,
            styles.statusIconContainer,
            docLocation ? styles.positiveStatusIcon : styles.negativeStatusIcon,
            styles.sidebarColumn,
          ]}
        >
          {docLocation ? (
            <Confirm css={styles.icon} />
          ) : (
            <Close css={styles.icon} />
          )}
        </span>

        <Text
          css={styles.sidebarColumn}
          size="bodyCopy"
          fontVariant="sansRegular"
        >
          {docTitle}
        </Text>
      </div>
      <div css={styles.documentationLink}>
        <a href={docLocation || missingLink} css={styles.link}>
          <Text css={styles.link} size="brevier" fontVariant="sansBold">
            {docLocation ? announce : missingAnnounce}
          </Text>
        </a>
        <span css={[styles.iconContainer, styles.linkIconContainer]}>
          {docLocation ? (
            <ExternalLink css={styles.icon} />
          ) : (
            <Help css={styles.icon} />
          )}
        </span>
      </div>
    </li>
  );
};

export default SingleDoc;
