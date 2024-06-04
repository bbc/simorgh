/** @jsx jsx */
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import Text from '#app/components/Text';
import { useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';
import TickSvg from './svgs';
import { useFormContext } from '../FormContext';

const DEFAULT_RETENTION_POLICY_DAY = '270';
const DEFAULT_EMAIL = 'CannotFindEmail@bbc.co.uk';

const defaultTranslations = {
  confirmationStepTitle: 'Message sent',
  confirmationStepDescriptionHtml: 'Thanks for getting in touch.',
  referenceNumber: 'Reference number',
  submissionInfoSignedOutMessage:
    'You may wish to make a note of these details for your reference.',
  retentionPeriodDays:
    "We'll keep your submission for up to {{days}} days – and if we don't use it we'll then delete it and any other information you sent us.",
  privacyInfoHtml:
    "Don't worry, we protect your information — read the {{privacyInfoLink}} for more details.",
  emailToHtml:
    "If you change your mind and don't want us to use it, just email us at {{emailLink}}. Don't forget the reference number.",
  removalGuidelineText:
    'If you submitted something for a programme or online, we won’t be able to remove it once we use it.',
  privacyPolicyLinkHref: 'https://www.bbc.com/privacy/',
  privacyPolicyLinkText: 'Privacy Policy',
};

const SuccessMessage = () => {
  const {
    translations: { ugc = defaultTranslations },
  } = useContext(ServiceContext);

  const { submissionID } = useFormContext();

  const {
    confirmationStepTitle,
    confirmationStepDescriptionHtml,
    submissionInfoSignedOutMessage,
    referenceNumber,
    retentionPeriodDays,
    privacyInfoHtml,
    emailToHtml,
    removalGuidelineText,
    privacyPolicyLinkHref,
    privacyPolicyLinkText,
  } = ugc;

  const retentionPolicy = retentionPeriodDays.replace(
    '{{days}}',
    DEFAULT_RETENTION_POLICY_DAY,
  );

  const privacyClauses = privacyInfoHtml.split('{{privacyInfoLink}}');
  const emailGuidelineClauses = emailToHtml.split('{{emailLink}}');

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
            >
              {confirmationStepTitle}
            </Heading>
            <Paragraph>{confirmationStepDescriptionHtml}</Paragraph>
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

export default SuccessMessage;
