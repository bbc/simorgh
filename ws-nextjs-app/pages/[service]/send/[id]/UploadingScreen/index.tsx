import React, { useEffect, useRef } from 'react';
import GenericMessage from '../GenericMessage';
import fallbackTranslations from '../fallbackTranslations';

type Props = {
  title: string;
};

export default function UploadingScreen({ title }: Props) {
  useEffect(() => {
    document.title = `Uploading: ${title}`;
  }, [title]);

  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <GenericMessage heading={fallbackTranslations.uploadingHeading} ref={ref}>
      {fallbackTranslations.uploadingDescription}
    </GenericMessage>
  );
}
