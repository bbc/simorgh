/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { ForwardedRef, forwardRef } from 'react';
import { WHITE } from '#app/components/ThemeProvider/palette';
import { BulletedList } from '#app/components/BulletedList';
import Text from '#app/components/Text';
import { useFormContext } from '../FormContext';
import InvalidMessageBox from './InvalidMessageBox';
import getErrorList from '../FormContext/utils/getErrorList';
import styles from './styles';

type ErrorSummaryProps = {
  suffix: string;
  labelMap: Record<string, string>;
};

type ListItemsLinkProps = {
  id: string;
  labelText: string;
};

const ErrorLink = ({ id, labelText }: ListItemsLinkProps) => {
  return (
    <a
      href={`#${id}`}
      // to check
      className="focusIndicatorReducedWidth"
      css={styles.link}
    >
      {labelText}
    </a>
  );
};

const ErrorSummaryBox = forwardRef(
  ({ suffix, labelMap }: ErrorSummaryProps, ref: ForwardedRef<HTMLElement>) => {
    // TO DO - Add translations for summary
    const { formState } = useFormContext();
    const listOfErrors = getErrorList(formState);
    const isSingleError = listOfErrors.length === 1;

    const errorListItems = listOfErrors.map(({ id }) => {
      const labelText = labelMap[id];
      return (
        <>
          {isSingleError ? (
            <ErrorLink id={id} labelText={labelText} />
          ) : (
            <li key={`listItemFor-${id}`}>
              <ErrorLink id={id} labelText={labelText} />
            </li>
          )}
        </>
      );
    });
    return (
      <InvalidMessageBox
        id="errorSummaryBox"
        hasArrowStyle={false}
        messageCode={null}
        ref={ref}
        suffix={suffix}
        isErrorSummary
      >
        {isSingleError ? (
          // check Text wrapper is ok
          <Text css={styles.singleItem}>{errorListItems}</Text>
        ) : (
          <BulletedList bulletPointColour={WHITE} css={styles.list}>
            {errorListItems}
          </BulletedList>
        )}
      </InvalidMessageBox>
    );
  },
);

export default ErrorSummaryBox;
