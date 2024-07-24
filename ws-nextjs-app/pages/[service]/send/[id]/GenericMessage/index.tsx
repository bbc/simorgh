/** @jsx jsx */
import React, { forwardRef, ReactNode } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import styles from './styles';

interface Props {
  heading: string;
  children: ReactNode | string;
}

const GenericMessage = forwardRef<HTMLElement, Props>(
  ({ heading, children }, ref?) => {
    return (
      <>
        <Heading
          level={1}
          id="content"
          tabIndex={-1}
          css={styles.heading}
          size="trafalgar"
          {...(ref && { ref })}
        >
          {heading}
        </Heading>
        {children && <Paragraph>{children}</Paragraph>}
      </>
    );
  },
);

export default GenericMessage;
