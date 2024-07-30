import React, { ForwardedRef, forwardRef } from 'react';
import InvalidMessageBox from './InvalidMessageBox';
import { useFormContext } from '../FormContext';
import getErrorList from '../FormContext/utils/getErrorList';

type ErrorSummaryProps = {
  suffix: string;
  labelMap: Record<string, string>;
};

const ErrorSummaryBox = forwardRef(
  ({ suffix, labelMap }: ErrorSummaryProps, ref: ForwardedRef<HTMLElement>) => {
    const { formState } = useFormContext();
    const listOfErrors = getErrorList(formState);
    const listItems = listOfErrors.map(({ id }) => {
      return (
        <li key={`listItemFor-${id}`}>
          <a href={`#${id}`}>{labelMap[id]}</a>
        </li>
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
        <ul>{listItems}</ul>
      </InvalidMessageBox>
    );
  },
);

export default ErrorSummaryBox;
