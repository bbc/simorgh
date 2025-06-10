import React, { useContext, useEffect, useRef } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import GenericMessage from '../../GenericMessage';
import fallbackTranslations from '../../fallbackTranslations';

type Props = {
  title: string;
};

export default function UploadingScreen({ title }: Props) {
  const {
    translations: {
      ugc: {
        uploadingHeading = fallbackTranslations.uploadingHeading,
        uploadingDescription = fallbackTranslations.uploadingDescription,
      } = {},
    },
  } = useContext(ServiceContext);

  useEffect(() => {
    document.title = `${uploadingHeading}: ${title}`;
  }, [title, uploadingHeading]);

  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <GenericMessage heading={uploadingHeading} ref={ref}>
      {uploadingDescription}
    </GenericMessage>
  );
}
