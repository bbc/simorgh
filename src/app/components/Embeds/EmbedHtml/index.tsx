/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren } from 'react';
import styles from './index.styles';

type Props = {
  embedHtml: string;
};

const EmbedHtml = ({ embedHtml }: PropsWithChildren<Props>) => {
  if (!embedHtml) return null;

  return (
    <div
      css={styles.embedDiv}
      suppressHydrationWarning
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: embedHtml }}
    />
  );
};

export default EmbedHtml;
