/** @jsx jsx */
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import Text from '#app/components/Text';
import { useContext, useEffect, useRef } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';
import TickSvg from './svgs';
import { useFormContext } from '../FormContext';
import fallbackTranslations from '../fallbackTranslations';

const DEFAULT_RETENTION_POLICY_DAY = '270';
const DEFAULT_EMAIL = 'CannotFindEmail@bbc.co.uk';

type Props = {
  title: string;
};

const SuccessScreen = ({ title }: Props) => {
  const {
    translations: {
      ugc: {
        successHeading = fallbackTranslations.successHeading,
        successDescription = fallbackTranslations.successDescription,
        submissionInfoSignedOutMessage = fallbackTranslations.submissionInfoSignedOutMessage,
        referenceNumber = fallbackTranslations.referenceNumber,
        retentionPeriodDays = fallbackTranslations.retentionPeriodDays,
        privacyInfoHtml = fallbackTranslations.privacyInfoHtml,
        emailToHtml = fallbackTranslations.emailToHtml,
        removalGuidelineText = fallbackTranslations.removalGuidelineText,
        privacyPolicyLinkHref = fallbackTranslations.privacyPolicyLinkHref,
        privacyPolicyLinkText = fallbackTranslations.privacyPolicyLinkText,
      } = {},
    },
  } = useContext(ServiceContext);

  const { submissionID } = useFormContext();

  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    document.title = `${successHeading}: ${title}`;
  }, [successHeading, title]);

  const retentionPolicy = retentionPeriodDays?.replace(
    '{{days}}',
    DEFAULT_RETENTION_POLICY_DAY,
  );

  const privacyClauses = privacyInfoHtml?.split('{{privacyInfoLink}}');
  const emailGuidelineClauses = emailToHtml?.split('{{emailLink}}');

  return (
    <div css={styles.outerContainer}>
      <div css={styles.messageContainer}>
        <TickSvg css={styles.tickIcon} />
        <div css={styles.messageTextContainer}>
          <div>
            <Heading
              level={1}
              id="content"
              tabIndex={-1}
              size="trafalgar"
              css={styles.heading}
              {...(ref && { ref })}
            >
              {successHeading}
            </Heading>
            <Paragraph>{successDescription}</Paragraph>
          </div>
        </div>
      </div>
      <div css={styles.descriptionContainer}>
        <Paragraph>{submissionInfoSignedOutMessage}</Paragraph>
        <div>
          <Text as="strong" fontVariant="sansBold">
            {referenceNumber}
          </Text>
          <Paragraph>{submissionID}</Paragraph>
        </div>
        <Paragraph>{retentionPolicy}</Paragraph>
        <Paragraph>
          {emailGuidelineClauses?.[0]}
          <a
            href={`mailto:${DEFAULT_EMAIL}`}
            className="focusIndicatorReducedWidth"
          >
            {DEFAULT_EMAIL}
          </a>
          {emailGuidelineClauses?.[1]} {removalGuidelineText}
        </Paragraph>
        <Paragraph>
          {privacyClauses?.[0]}
          <a
            href={privacyPolicyLinkHref}
            className="focusIndicatorReducedWidth"
          >
            {privacyPolicyLinkText}
          </a>
          {privacyClauses?.[1]}
        </Paragraph>
      </div>
    </div>
  );
};

export default SuccessScreen;
