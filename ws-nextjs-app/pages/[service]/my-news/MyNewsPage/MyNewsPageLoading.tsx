import { use } from 'react';
import Heading from '#app/components/Heading';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Spinner from '#app/components/Spinner';
import styles from './styles';

const MyNewsPageLoading = () => {
  const { translations } = use(ServiceContext);

  return (
    <>
      <Heading level={1} css={styles.heading}>
        {translations?.myNews?.title}
      </Heading>
      <div css={styles.spinnerWrapper}>
        <Spinner css={styles.spinner} />
      </div>
    </>
  );
};

export default MyNewsPageLoading;
