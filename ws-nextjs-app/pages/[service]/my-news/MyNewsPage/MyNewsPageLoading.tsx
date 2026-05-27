import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import styles from '../styles';

// TODO: Placeholder component to be updated.
const MyNewsPageLoading = () => (
  <>
    <Heading level={1} css={styles.heading}>
      My News
    </Heading>
    <Text size="doublePica" fontVariant="sansBold">
      Loading your articles...
    </Text>
  </>
);

export default MyNewsPageLoading;
