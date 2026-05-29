import { use } from 'react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from '../styles';

// TODO: Placeholder component to be updated.
const MyNewsPageGuest = () => {
  const { translations } = use(ServiceContext);

  return (
    <>
      <Heading level={1} css={styles.heading}>
        {translations?.myNews?.errorText}
      </Heading>
      <Text size="doublePica" fontVariant="sansBold">
        Please sign in to view your saved articles.
      </Text>
    </>
  );
};

export default MyNewsPageGuest;
