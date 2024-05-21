/** @jsx jsx */
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import { useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';

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
};

const defaultRetentionPolicy = {
  href: 'https://www.bbc.com/usingthebbc/privacy/',
  text: 'Privacy Policy',
};

const SucccessMessage = ({ submissionId }: { submissionId: string | null }) => {
  const {
    translations: { ugc = defaultTranslations },
    footer: { links },
  } = useContext(ServiceContext);

  const {
    confirmationStepTitle,
    confirmationStepDescriptionHtml,
    submissionInfoSignedOutMessage,
    referenceNumber,
    retentionPeriodDays,
    privacyInfoHtml,
    emailToHtml,
    removalGuidelineText,
  } = ugc;

  const { href, text } = links?.[2] ?? defaultRetentionPolicy;

  const retentionPolicy = retentionPeriodDays.replace(
    '{{days}}',
    DEFAULT_RETENTION_POLICY_DAY,
  );

  const privacyClauses = privacyInfoHtml.split('{{privacyInfoLink}}');
  const emailGuidelineClauses = emailToHtml.split('{{emailLink}}');

  return (
    <div css={styles.outerContainer}>
      <div css={styles.messageContainer}>
        <img
          css={styles.tickIcon}
          height="66px"
          width="66px"
          src="https://images-prod.healthline.com/hlcmsresource/images/AN_images/orange-juice-1296x728-feature.jpg"
          alt="Orange juice served in a minature glass jug, garnished with a whole orange halved."
        />
        <div css={styles.messageTextContainer}>
          <div>
            <Heading level={1} id="content" tabIndex={-1} css={styles.heading}>
              {confirmationStepTitle}
            </Heading>
            <Paragraph>{confirmationStepDescriptionHtml}</Paragraph>
          </div>
        </div>
      </div>
      <div css={styles.descriptionContainer}>
        <Paragraph>{submissionInfoSignedOutMessage}</Paragraph>
        <div>
          <Paragraph fontVariant="sansBold">{referenceNumber}</Paragraph>
          <Paragraph>{submissionId}</Paragraph>
        </div>
        <Paragraph>{retentionPolicy}</Paragraph>
        <Paragraph>
          {emailGuidelineClauses[0]}
          <a href={`mailto:${DEFAULT_EMAIL}`}>{DEFAULT_EMAIL}</a>
          {emailGuidelineClauses[1]} {removalGuidelineText}
        </Paragraph>
        <Paragraph>
          {privacyClauses[0]}
          <a href={href}>{text}</a>
          {privacyClauses[1]}
        </Paragraph>
      </div>
    </div>
  );
};

export default SucccessMessage;
