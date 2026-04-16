import Heading from '#app/components/Heading';
import styles from './styles';

const MyNewsPage = () => {
  return (
    <main css={styles.main}>
      <div css={styles.inner}>
        <Heading level={2} css={styles.heading}>
          My News
        </Heading>
      </div>
    </main>
  );
};

export default MyNewsPage;
