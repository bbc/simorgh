import { use } from 'react';
import Heading from '#app/components/Heading';
import { ServiceContext } from '#app/contexts/ServiceContext';
import MyNewsSpinner from '#app/components/MyNewsSpinner';
import styles from './styles';

const MyNewsPageLoading = () => {
  const { translations } = use(ServiceContext);
  const loadingText = translations?.myNews?.loading;

  return (
    <>
      <Heading level={1} css={styles.heading}>
        {translations?.myNews?.title}
      </Heading>
      <MyNewsSpinner label={loadingText} testId="my-news-page-spinner" />
    </>
  );
};

export default MyNewsPageLoading;
