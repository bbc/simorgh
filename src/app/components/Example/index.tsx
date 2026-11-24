import { use, useEffect, useState } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Text from '#app/components/Text';
import styles from './index.module.scss';
import Heading from '../Heading';

export type ExampleProps = {
  textToRender: string;
  renderAfter: number;
};

export default ({ textToRender, renderAfter }: ExampleProps) => {
  const { service } = use(ServiceContext);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(true);
    }, renderAfter);

    return () => clearTimeout(timeout);
  }, [renderAfter]);

  if (!showText) return null;

  return (
    <>
      <Heading level={2}>You are on {service}</Heading>
      <Text className={styles.text} size="brevier">
        {textToRender}
      </Text>
    </>
  );
};
