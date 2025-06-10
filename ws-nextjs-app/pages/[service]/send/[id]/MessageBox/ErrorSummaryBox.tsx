/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ForwardedRef, forwardRef } from 'react';
import { WHITE } from '#app/components/ThemeProvider/palette';
import { BulletedList, BulletedListItem } from '#app/components/BulletedList';
import Text from '#app/components/Text';
import useAndroidDetection from '#app/hooks/useAdroidDetection';
import { useFormContext } from '../Form';
import InvalidMessageBox from './InvalidMessageBox';
import styles from './styles';
import { InvalidMessageCodes } from '../types';

export type ErrorSummaryProps = {
  labelMap: Record<string, string>;
};

type ListItemsProps = {
  id: string;
  labelText: string;
};

const ErrorLink = ({ id, labelText }: ListItemsProps) => {
  const isFileUpload = id.substring(0, 3) === 'upl';
  const linkHref = isFileUpload ? `#label-${id}` : `#${id}`;
  return (
    <a
      href={linkHref}
      className="focusIndicatorReducedWidthInverted"
      css={[styles.plainLabel, styles.linkHoverAndFocus]}
    >
      {labelText}
    </a>
  );
};

const ErrorLabel = ({ labelText }: ListItemsProps) => {
  return <Text css={styles.plainLabel}>{labelText}</Text>;
};

const ErrorSummaryBox = forwardRef(
  ({ labelMap }: ErrorSummaryProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { validationErrors } = useFormContext();
    const isAndroid = useAndroidDetection();

    if (validationErrors.length === 0) {
      return null;
    }
    const isSingleError = validationErrors.length === 1;
    const Component = isAndroid ? ErrorLabel : ErrorLink;

    const errorListItems = validationErrors.map(({ id }) => {
      const labelText = labelMap[id];

      if (isSingleError) return <Component id={id} labelText={labelText} />;

      return (
        <BulletedListItem css={styles.listItem} key={`listItemFor-${id}`}>
          <Component id={id} labelText={labelText} />
        </BulletedListItem>
      );
    });

    return (
      <InvalidMessageBox
        id="errorSummaryBox"
        hasArrowStyle={false}
        messageCode={InvalidMessageCodes.ErrorSummary}
        ref={ref}
        isErrorSummary
      >
        {isSingleError ? (
          <Text css={styles.singleItem}>{errorListItems}</Text>
        ) : (
          <BulletedList
            bulletPointColour={WHITE}
            bulletPointShape="hidden"
            css={styles.list}
          >
            {errorListItems}
          </BulletedList>
        )}
      </InvalidMessageBox>
    );
  },
);

export default ErrorSummaryBox;
