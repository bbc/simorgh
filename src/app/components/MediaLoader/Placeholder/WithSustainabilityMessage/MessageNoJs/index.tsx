/** @jsx jsx */
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import styles from './index.styles';

type Props = {
  noJsMessage: string;
};

const MessageNoJs = ({ noJsMessage }: Props) => {
  return (
    <noscript>
      <div css={styles.container}>
        <Text css={styles.message} as="p" size="longPrimer">
          {noJsMessage}
        </Text>
      </div>
    </noscript>
  );
};

export default MessageNoJs;
