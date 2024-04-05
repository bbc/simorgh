/** @jsx jsx */
import { jsx } from '@emotion/react';
import Text from '../../../../src/app/components/Text';
import { Confirm, Close, ExternalLink, Help } from '../Icons';
import styles from './index.styles';
import VisuallyHiddenText from '../../../../src/app/components/VisuallyHiddenText';
import idSanitiser from '../../../../src/app/lib/utilities/idSanitiser';

interface SingleDocProps {
  label: string;
  url: string;
  urlLabel: string;
  status?: boolean;
}

const SingleDoc = ({ label, status, url, urlLabel }: SingleDocProps) => {
  const iconStatusStyle = status ? styles.positive : styles.negative;
  const hasIcon = status ? (
    <Confirm css={styles.icon} />
  ) : (
    <Close css={styles.icon} />
  );
  const statusIcon =
    typeof status === 'boolean' ? hasIcon : <Help css={styles.icon} />;

  const hasIconText = status ? 'Complete' : 'Outstanding';

  const iconText = typeof status === 'boolean' ? hasIconText : 'Missing data';

  const ariaLabelId = idSanitiser(label);

  return (
    <li css={styles.documentationContainer}>
      <div css={[styles.documentationContainer, styles.documentationType]}>
        <span
          aria-hidden
          css={[
            styles.iconContainer,
            styles.statusIconContainer,
            typeof status === 'boolean' ? iconStatusStyle : styles.missing,
          ]}
        >
          {statusIcon}
        </span>

        <Text
          css={styles.sidebarText}
          size="bodyCopy"
          fontVariant="sansRegular"
          aria-labelledby={ariaLabelId}
        >
          <span // eslint-disable-next-line jsx-a11y/aria-role
            role="text"
            id={ariaLabelId}
          >
            {label}
            <VisuallyHiddenText>{`, ${iconText}.`}</VisuallyHiddenText>
          </span>
        </Text>
      </div>
      <div css={styles.documentationLink}>
        <Text as="a" href={url} size="brevier" fontVariant="sansBold">
          <span>{urlLabel}</span>
          <span
            aria-hidden
            css={[styles.iconContainer, styles.linkIconContainer]}
          >
            {status ? (
              <ExternalLink css={styles.icon} />
            ) : (
              <Help css={styles.icon} />
            )}
          </span>
        </Text>
      </div>
    </li>
  );
};

export default SingleDoc;
