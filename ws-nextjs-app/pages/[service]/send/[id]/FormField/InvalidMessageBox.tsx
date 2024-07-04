/** @jsx jsx */
import { useContext, ForwardedRef, forwardRef } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { jsx } from '@emotion/react';
import Paragraph from '#app/components/Paragraph';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { InvalidMessageCodes, InvalidMessageBoxProps } from '../types';
import styles from './styles';

const defaultUGC = {
  submitButtonText: 'Send',
  validationRequired: `There's something missing.`,
  validationInvalidEmail: `That doesn't look right. Please enter a proper email address.`,
  validationInvalidTelephone: 'NEEDS IMPLEMENTATION',
  validationFilesNotEnough: `There aren't enough files. Please add at least {{minFiles}}`,
  validationFilesTooMany: `There are too many files. You can add {{maxFiles}}.`,
  validationFilesInvalidType: `Sorry, we can't use this type of file. Please add {{fileTypes}}.`,
  validationFileTooSmall: 'This file is broken. Try picking another.',
  validationFilesSizeExceeded:
    'Sorry, these files are too big. You can only upload up to 1.2 GB at a time.',
  confirmationStepTitle: 'Message sent',
  confirmationStepDescriptionHtml: 'Thanks for getting in touch.',
  referenceNumber: 'Reference number',
  submissionInfoSignedOutMessage:
    'You may wish to make a note of these details for your reference.',
  retentionPeriodDays: `We'll keep your submission for up to {{days}} days – and if we don't use it we'll then delete it and any other information you sent us.`,
  privacyInfoHtml: `Don't worry, we protect your information — read the {{privacyInfoLink}} for more details.`,
  emailToHtml: `If you change your mind and don't want us to use it, just email us at {{emailLink}}. Don't forget the reference number.`,
  removalGuidelineText:
    'If you submitted something for a programme or online, we won’t be able to remove it once we use it.',
};

const ErrorSymbol = () => (
  <svg
    viewBox="0 0 32 32"
    width="1.5rem"
    height="1.5rem"
    focusable="false"
    aria-hidden="true"
    css={styles.errorSvg}
  >
    <path d="M3.1 30.2h25.8c1.6 0 2.3-.8 2.3-1.9 0-.8-.3-1.4-1-2.9L18.6 3.8c-.8-1.5-1.5-2-2.6-2s-1.8.5-2.6 2L1.8 25.4C1 26.9.7 27.5.7 28.3c.1 1.1.8 1.9 2.4 1.9M16 26.9c-1.6 0-2.4-1-2.4-2.1 0-1.2.8-2.1 2.4-2.1s2.4 1 2.4 2.1-.8 2.1-2.4 2.1m-1.7-6.7-.8-10.6h5l-.8 10.6z" />
  </svg>
);

const ErrorMessageBox = forwardRef(
  (
    { id, messageCode, hasArrowStyle = true, suffix }: InvalidMessageBoxProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const {
      translations: { ugc = defaultUGC },
    } = useContext(ServiceContext);

    const message = ugc[messageCode ?? InvalidMessageCodes.FieldRequired];

    return (
      <>
        {hasArrowStyle && <div css={styles.errorArrow} />}
        <div
          css={styles.errorMessageBox(hasArrowStyle)}
          tabIndex={-1}
          {...(ref && { ref })}
        >
          <ErrorSymbol />
          <Paragraph
            id={id}
            css={styles.errorText}
            fontVariant="sansBold"
            size="minion"
          >
            {message}
            <VisuallyHiddenText>{`, ${suffix}`}</VisuallyHiddenText>
          </Paragraph>
        </div>
      </>
    );
  },
);

export default ErrorMessageBox;
