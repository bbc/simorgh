import { use, useEffect, useRef } from 'react';

import { ServiceContext } from '#app/contexts/ServiceContext';
import fallbackTranslations from '../fallbackTranslations';
import GenericMessage from '../GenericMessage';

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
  } = use(ServiceContext);

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
