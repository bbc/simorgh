/** @jsx jsx */
import { use, useEffect } from 'react';
import { jsx } from '@emotion/react';
import Text from '../../Text';
import style from './index.styles';
import { LocalStorageContext } from '../LocalStorageProvider';

export default () => {
  const { addCoins } = use(LocalStorageContext);

  useEffect(() => {
    const listener = (event: Event) => {
      console.log('CHECK THIS EVENT', event);
      addCoins(10);
    };
    console.log('CHECK');
    document.addEventListener('scroll', listener);
    return () => {
      document.removeEventListener('scroll', listener);
    };
  }, []);

  return (
    <div>
      <Text>READ METER:</Text>
    </div>
  );
};
