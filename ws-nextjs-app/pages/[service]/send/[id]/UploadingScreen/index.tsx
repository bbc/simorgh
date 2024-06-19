import React, { useEffect } from 'react';
import GenericMessage from '../GenericMessage';

const UPLOADING_HEADING = 'Uploading';
const UPLOADING_MESSAGE = 'Please wait until it is finished.';

type Props = {
  title: string;
};

export default function UploadingScreen({ title }: Props) {
  useEffect(() => {
    document.title = `Uploading: ${title}`;
  }, [title]);

  return (
    <GenericMessage heading={UPLOADING_HEADING}>
      {UPLOADING_MESSAGE}
    </GenericMessage>
  );
}
