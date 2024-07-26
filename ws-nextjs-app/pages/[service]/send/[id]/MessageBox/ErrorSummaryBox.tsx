import React from 'react';
import InvalidMessageBox from './InvalidMessageBox';

const ErrorSummaryBox = ({ ref, suffix }: { ref: any; suffix: string }) => {
  return (
    <InvalidMessageBox
      id="errorSummaryBox"
      hasArrowStyle={false}
      messageCode={null}
      ref={ref}
      suffix={suffix}
      isErrorSummary
    >
      Hello World
    </InvalidMessageBox>
  );
};

export default ErrorSummaryBox;
