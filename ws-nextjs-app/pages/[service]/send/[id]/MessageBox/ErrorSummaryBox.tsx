import React, { ForwardedRef, forwardRef } from 'react';
import { WHITE } from '#app/components/ThemeProvider/palette';
import { BulletedList, BulletedListItem } from '#app/components/BulletedList';
import Text from '#app/components/Text';
import useAndroidDetection from '#app/hooks/useAdroidDetection';
import { useFormContext } from '../FormContext';
import InvalidMessageBox from './InvalidMessageBox';
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
      className="focusIndicatorReducedWidthInverted text-minion text-white inline-block py-1.5 px-0 hover:text-error-core hover:bg-white focus:text-error-core focus:bg-white focus-visible:bg-white"
    >
      {labelText}
    </a>
  );
};

const ErrorLabel = ({ labelText }: ListItemsProps) => {
  return <Text className="text-minion text-white inline-block py-1.5 px-0">{labelText}</Text>;
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
        <BulletedListItem className="mb-0" key={`listItemFor-${id}`}>
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
          <Text className="inline-block mt-2">{errorListItems}</Text>
        ) : (
          <BulletedList
            bulletPointColour={WHITE}
            bulletPointShape="hidden"
            className="mb-0 ps-0 mt-2"
          >
            {errorListItems}
          </BulletedList>
        )}
      </InvalidMessageBox>
    );
  },
);

export default ErrorSummaryBox;
