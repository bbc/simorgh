/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';
import InlineLink from '../../InlineLink';
import Text from '../../Text';

type Props = {
  message: string;
  link: {
    text: string;
    href: string;
  };
};

const EmbedError = ({ message, link }: Props) => {
  return (
    <div css={styles.embedDiv} data-e2e="embed-error">
      <Text as="strong" fontVariant="sansRegular" size="longPrimer">
        {message}
      </Text>
      <div css={styles.errorLinkWrapper}>
        {link && link.text && link.href && (
          <InlineLink to={link.href} text={link.text} css={styles.inlineLink} />
        )}
      </div>
    </div>
  );
};

export default EmbedError;
