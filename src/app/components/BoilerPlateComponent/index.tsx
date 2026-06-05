import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Text from '#app/components/Text';
import style from './index.style';
import Heading from '../Heading';

export type BoilerPlateProps = {
  textToRender: string;
};

const SERVICE_ALLOW_LIST = ['mundo'];

export default ({ textToRender }: BoilerPlateProps) => {
  const { service } = use(ServiceContext);
  if (!SERVICE_ALLOW_LIST.includes(service)) {
    return null;
  }

  return (
    <>
      <Heading level={2} css={style.text}>
        You are on {service}
      </Heading>
      <Text css={style.text} size="brevier">
        {textToRender}
      </Text>
    </>
  );
};
