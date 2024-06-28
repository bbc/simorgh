import React, { useEffect, useContext, useRef } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import GenericMessage from '../GenericMessage';
import fallbackTranslations from '../fallbackTranslations';

type Props = {
  title: string;
};

export default function ErrorScreen({ title }: Props) {
  const {
    translations: {
      ugc: {
        errorHeading = fallbackTranslations.errorHeading,
        errorDescription = fallbackTranslations.errorDescription,
      } = {},
    },
  } = useContext(ServiceContext);

  useEffect(() => {
    document.title = `Error: ${title}`;
  }, [title]);

  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <GenericMessage heading={errorHeading} ref={ref}>
      {errorDescription}
    </GenericMessage>
  );
}
