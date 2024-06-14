/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './styles';
import { useFormContext } from '../FormContext';

const Loader = () => {
  const { progress } = useFormContext();
  return (
    <>
      <p>{progress}</p>
      {/* <div css={styles.loader}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path
            d="M218.52,37.5,196.6,59.42A97,97,0,1,1,128,31l2,0,.63-31c-.87,0-1.74,0-2.61,0a128,128,0,1,0,90.52,37.5Z"
            fill="#006def"
          />
          <path
            d="M130.61,0,130,31A96.69,96.69,0,0,1,196.6,59.42L218.52,37.5A127.59,127.59,0,0,0,130.61,0Z"
            fill="#fff"
          />
        </svg>
      </div> */}
    </>
  );
};

export default Loader;
