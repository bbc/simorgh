import styles from './index.module.scss';

const TopicImage = ({ image }) => {
  const imageUrl = image.replace('/480/', '/128/');

  return (
    <div className={styles.badgeWrapper}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={imageUrl}
          alt=""
          data-testid="topic-badge"
        />
      </div>
    </div>
  );
};

export default TopicImage;
