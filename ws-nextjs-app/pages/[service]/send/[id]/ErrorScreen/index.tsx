import React, { useEffect, use, useRef } from 'react';
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
  } = use(ServiceContext);

  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = `${errorHeading}: ${title}`;
  }, [title, errorHeading]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <GenericMessage heading={errorHeading} ref={ref}>
      {errorDescription}
    </GenericMessage>
  );
}
