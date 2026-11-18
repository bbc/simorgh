import Text from '#app/components/Text';
import { TickIcon } from '#app/components/icons';
import styles from './index.module.scss';

type Props = {
  label: string;
};

const ArticleEnd = ({ label }: Props) => (
  <div className={styles.wrapper} data-testid="article-end">
    <div className={styles.divider}>
      <span className={styles.label}>
        <span className={styles.circle} aria-hidden="true">
          <TickIcon className={styles.tick} />
        </span>
        <Text size="brevier" className={styles.text}>
          {label}
        </Text>
      </span>
    </div>
  </div>
);

export default ArticleEnd;
