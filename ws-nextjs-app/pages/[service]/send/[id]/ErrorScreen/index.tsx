import React, { useLayoutEffect } from 'react';
import GenericMessage from '../GenericMessage';

const ERROR_HEADING = 'Sorry, your message could not be sent.';
const ERROR_MESSAGE = 'Please try again later.';

type Props = {
  title: string;
};

export default function ErrorScreen({ title }: Props) {
  useLayoutEffect(() => {
    document.title = `Error: ${title}`;
  }, [title]);

  return (
    <GenericMessage heading={ERROR_HEADING}>{ERROR_MESSAGE}</GenericMessage>
  );
}
