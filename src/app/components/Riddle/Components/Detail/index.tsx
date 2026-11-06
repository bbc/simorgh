import Text from '../../../Text';
import styles from './index.module.scss';

export default ({
  as,
  label,
  content,
}: {
  as?: string;
  label: string;
  content: string;
}) => {
  return (
    <div className={styles.detailContainer}>
      <Text className={styles.detailLabel}>{label}</Text>
      <div>
        <Text {...(as && { as })} className={styles.detailContent}>
          {content}
        </Text>
      </div>
    </div>
  );
};
