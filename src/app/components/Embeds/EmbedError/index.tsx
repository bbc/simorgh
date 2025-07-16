import styles from './index.module.css';
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
    <div className={styles.embedDiv} data-e2e="embed-error">
      <Text as="strong" fontVariant="sansRegular" size="longPrimer">
        {message}
      </Text>
      <div className={styles.errorLinkWrapper}>
        {link?.text && link.href && (
          <InlineLink to={link.href} text={link.text} className={styles.inlineLink} />
        )}
      </div>
    </div>
  );
};

export default EmbedError;
