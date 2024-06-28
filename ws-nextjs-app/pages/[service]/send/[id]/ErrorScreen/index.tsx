import React, { useEffect, useRef } from 'react';
import GenericMessage from '../GenericMessage';

const ERROR_HEADING = 'Sorry, your message could not be sent.';
const ERROR_MESSAGE = 'Please try again later.';

type Props = {
  title: string;
};

export default function ErrorScreen({ title }: Props) {
  useEffect(() => {
    document.title = `Error: ${title}`;
  }, [title]);

  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <GenericMessage heading={ERROR_HEADING} ref={ref}>
      {ERROR_MESSAGE}
    </GenericMessage>
  );
}
