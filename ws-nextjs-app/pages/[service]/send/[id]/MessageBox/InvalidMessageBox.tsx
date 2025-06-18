/** @jsx jsx */
import { useContext, ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import {
  InvalidMessageCodes,
  InvalidMessageBoxProps,
  ValidationConditions,
} from '../types';
import styles from './styles';
import fallbackTranslations from '../fallbackTranslations';

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
    } = useContext(ServiceContext);

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
