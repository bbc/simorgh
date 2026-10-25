import styles from './index.module.scss';

const TopicDescription = ({ children }) => {
  return <p className={styles.description}>{children}</p>;
};

export default TopicDescription;
