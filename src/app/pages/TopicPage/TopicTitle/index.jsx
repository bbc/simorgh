import styles from './index.module.scss';

const TopicTitle = ({ children }) => {
  return (
    <h1 className={styles.title} id="content" tabIndex="-1">
      {children}
    </h1>
  );
};

export default TopicTitle;
