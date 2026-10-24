import { use, ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Text from '#app/components/Text';
import { ExternalSvg } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import {
  InvalidMessageCodes,
  InvalidMessageBoxProps,
  ValidationConditions,
} from '../types';
import styles from './styles';
import fallbackTranslations from '../fallbackTranslations';

const ErrorSymbol = () => (
  <span css={styles.errorSvg}>
    <ExternalSvg path="images/icons/error.svg" width="1.5rem" height="1.5rem" />
  </span>
);

const formatValidationMessage = (
  messageCode: string,
  validation?: ValidationConditions,
) => {
  if (!validation) return messageCode;

  let message = messageCode;

  if (validation?.min) {
    message = message.replace('{{minFiles}}', `${validation.min}`);
  }
  if (validation?.max) {
    message = message.replace('{{maxFiles}}', `${validation.max}`);
  }
  if (validation?.fileTypes) {
    message = message.replace('{{fileTypes}}', validation.fileTypes.join(', '));
  }

  return message;
};

const InvalidMessageBox = forwardRef(
  (
    {
      id,
      messageCode,
      hasArrowStyle = true,
      isErrorSummary = false,
      suffix,
      validationCriteria,
      children,
    }: PropsWithChildren<InvalidMessageBoxProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const {
      translations: { ugc = fallbackTranslations },
    } = use(ServiceContext);

    const message = formatValidationMessage(
      ugc[messageCode ?? InvalidMessageCodes.FieldRequired] ?? '',
      validationCriteria,
    );

    // We only include visually hidden text on generic error messages.
    const includeVisuallyHiddenText =
      !isErrorSummary && message === ugc[InvalidMessageCodes.FieldRequired];

    return (
      <>
        {hasArrowStyle && <div css={styles.errorArrow} />}
        <div
          css={[
            styles.errorMessageBox,
            !hasArrowStyle && styles.hasArrowStyle,
            isErrorSummary && styles.focusIndicatorErrorSummary,
          ]}
          {...(isErrorSummary && { tabIndex: -1 })}
          {...(ref && { ref })}
        >
          <span css={styles.strongWrapper}>
            <ErrorSymbol />
            <Text
              id={id}
              css={styles.errorText}
              fontVariant="sansBold"
              size="minion"
              as="strong"
            >
              {message}
              {includeVisuallyHiddenText && (
                <VisuallyHiddenText>{` ${suffix}`}</VisuallyHiddenText>
              )}
            </Text>
          </span>
          {children}
        </div>
      </>
    );
  },
);

export default InvalidMessageBox;
