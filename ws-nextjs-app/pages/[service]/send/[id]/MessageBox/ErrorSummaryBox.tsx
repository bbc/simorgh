/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { ForwardedRef, forwardRef } from 'react';
import { WHITE } from '#app/components/ThemeProvider/palette';
import { BulletedList, BulletedListItem } from '#app/components/BulletedList';
import Text from '#app/components/Text';
import { useFormContext } from '../FormContext';
import InvalidMessageBox from './InvalidMessageBox';
import styles from './styles';
import { InvalidMessageCodes } from '../types';

export type ErrorSummaryProps = {
  labelMap: Record<string, string>;
};

type ListItemsLinkProps = {
  id: string;
  labelText: string;
};

const ErrorLink = ({ id, labelText }: ListItemsLinkProps) => {
  const isFileUpload = id.substring(0, 3) === 'upl';
  const linkHref = isFileUpload ? `#label-${id}` : `#${id}`;
  return (
    <a
      href={linkHref}
      className="focusIndicatorReducedWidthInverted"
      css={styles.link}
    >
      {labelText}
    </a>
  );
};

const ErrorSummaryBox = forwardRef(
  ({ labelMap }: ErrorSummaryProps, ref: ForwardedRef<HTMLElement>) => {
    const { validationErrors } = useFormContext();
    if (validationErrors.length === 0) {
      return null;
    }
    const isSingleError = validationErrors.length === 1;

    const errorListItems = validationErrors.map(({ id }) => {
      const labelText = labelMap[id];
      return (
        <>
          {isSingleError ? (
            <ErrorLink id={id} labelText={labelText} />
          ) : (
            <BulletedListItem css={styles.listItem} key={`listItemFor-${id}`}>
              <ErrorLink id={id} labelText={labelText} />
            </BulletedListItem>
          )}
        </>
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
