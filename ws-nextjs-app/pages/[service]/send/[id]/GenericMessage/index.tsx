/** @jsx jsx */
import React, { useEffect, useRef } from 'react';
import { jsx } from '@emotion/react';
import Paragraph from '#app/components/Paragraph';
import styles from './styles';

interface Props {
  heading: string;
  children: string;
}

const GenericMessage = ({ heading, children }: Props) => {
  const el = useRef<HTMLHeadingElement>(null);
  useEffect(() => el.current?.focus(), []);
  return (
    <>
      <h1 id="content" ref={el} tabIndex={-1} css={styles.heading}>
        {heading}
      </h1>
      <Paragraph>{children}</Paragraph>
    </>
  );
};

export default GenericMessage;
