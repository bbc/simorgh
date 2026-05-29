import { use } from 'react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from '../styles';

const MyNewsPageLoading = () => {
  const { translations } = use(ServiceContext);
  const { title, loadingArticles } = {
    ...translations?.myNews,
  };

  return (
    <>
      <Heading level={1} css={styles.heading}>
        {title}
      </Heading>
      <Text size="doublePica" fontVariant="sansBold">
        {loadingArticles}
      </Text>
    </>
  );
};

export default MyNewsPageLoading;
