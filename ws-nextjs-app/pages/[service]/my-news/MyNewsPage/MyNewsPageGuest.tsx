import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import styles from '../styles';

// TODO: Placeholder component to be updated.
const MyNewsPageGuest = () => (
  <>
    <Heading level={1} css={styles.heading}>
      My News
    </Heading>
    <Text size="doublePica" fontVariant="sansBold">
      Please sign in to view your saved articles.
    </Text>
  </>
);

export default MyNewsPageGuest;
