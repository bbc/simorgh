/** @jsx jsx */
import React, { useEffect, useRef } from 'react';
import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import styles from './styles';

interface Props {
  heading: string;
  children: string;
}

const GenericMessage = ({ heading, children }: Props) => {
  const el = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    el.current?.focus();
  }, []);
  return (
    <>
      <Heading
        level={1}
        id="content"
        // @ts-expect-error Property 'ref' does not exist on type 'IntrinsicAttributes & { css?: Interpolation<Theme>; } & Props'
        ref={el}
        tabIndex={-1}
        css={styles.heading}
      >
        {heading}
      </Heading>
      <Paragraph>{children}</Paragraph>
    </>
  );
};

export default GenericMessage;
