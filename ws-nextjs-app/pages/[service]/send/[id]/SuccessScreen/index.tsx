import React, { use, useEffect, useRef } from 'react';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import TickSvg from './svgs';
import { useFormContext } from '../FormContext';
import fallbackTranslations from '../fallbackTranslations';

type Props = {
  title: string;
  replyEmailAddress: string;
  retentionPeriod: string;
};

const SuccessScreen = ({
  title,
  replyEmailAddress,
  retentionPeriod,
}: Props) => {
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
  } = use(ServiceContext);

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
    retentionPeriod,
  );

  const privacyClauses = privacyInfoHtml?.split('{{privacyInfoLink}}');
  const emailGuidelineClauses = emailToHtml?.split('{{emailLink}}');

  return (
    <div className="[&_a]:text-blue-600 [&_a]:underline [&_a]:font-sansBold [&_a:hover]:text-blue-800 [&_a:focus]:text-blue-800">
      <div className="flex flex-wrap">
        <TickSvg className="mr-4 fill-success-core" />
        <div className="flex items-center">
          <div>
            <Heading
              level={1}
              id="content"
              tabIndex={-1}
              size="trafalgar"
              className="focus:outline-none"
              {...(ref && { ref })}
            >
              {successHeading}
            </Heading>
            <Paragraph>{successDescription}</Paragraph>
          </div>
        </div>
      </div>
      <div className="[&>p]:mt-8 [&>div]:mt-8">
        <Paragraph>{submissionInfoSignedOutMessage}</Paragraph>
        <div>
          <Text as="strong" fontVariant="sansBold">
            {referenceNumber}
          </Text>
          <Paragraph>{submissionID}</Paragraph>
        </div>
        {retentionPeriod && <Paragraph>{retentionPolicy}</Paragraph>}
        {replyEmailAddress && (
          <Paragraph>
            {replyEmailAddress && emailGuidelineClauses?.[0]}
            <a
              href={`mailto:${replyEmailAddress}`}
              className="focusIndicatorReducedWidth"
            >
              {replyEmailAddress}
            </a>
            {emailGuidelineClauses?.[1]} {removalGuidelineText}
          </Paragraph>
        )}
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
