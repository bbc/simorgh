/** @jsx jsx */
import React, { ReactNode } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import styles from './styles';

interface Props {
  heading: string;
  children: ReactNode | string;
  ref?: HTMLElement;
}

const GenericMessage = ({ heading, children, ref }: Props) => {
  return (
    <>
      <Heading
        level={1}
        id="content"
        tabIndex={-1}
        css={styles.heading}
        size="trafalgar"
        ref={ref}
      >
        {heading}
      </Heading>
      {children && <Paragraph>{children}</Paragraph>}
    </>
  );
};

export default GenericMessage;
