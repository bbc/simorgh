import styles from './index.module.css';

type Props = {
  message?: string;
  placeholderSrc?: string;
  placeholderSrcset?: string;
};

const Message = ({
  message = '',
  placeholderSrc = '',
  placeholderSrcset = '',
}: Props) => (
  <div>
    {placeholderSrc && (
      <img
        alt=""
        src={placeholderSrc}
        srcSet={placeholderSrcset}
        aria-hidden="true"
        className={styles.messageImage}
      />
    )}
    <div className={styles.messageWrapper}>
      <strong className={styles.message}>{message}</strong>
    </div>
  </div>
);

export default Message;
