import React, { useEffect, useRef } from 'react';
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

  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <GenericMessage heading={UPLOADING_HEADING} ref={ref}>
      {UPLOADING_MESSAGE}
    </GenericMessage>
  );
}
