/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Text from '#app/components/Text';
import styles from './index.styles';
import FanSvg from './svgs';

const DEFAULT_MESSAGE =
  'Help reduce your power and data usage by not playing video content.';
const DEFAULT_LOAD_TITLE = 'Load Video';

const SignPost = () => {
  const {
    translations: {
      media: { signPost, loadVideo },
    },
  } = useContext(ServiceContext);

  const message = signPost ?? DEFAULT_MESSAGE;
  const buttonLabel = loadVideo ?? DEFAULT_LOAD_TITLE;
  return (
    <div css={styles.container}>
      <FanSvg css={styles.icon} />
      <div>
        <div>
          <Text css={styles.message} as="p">
            {message}
          </Text>
        </div>
        <button type="button" css={[styles.loadVideo]}>
          <Text css={styles.message} as="p">
            + {buttonLabel}
          </Text>
        </button>
      </div>
    </div>
  );
};

export default SignPost;
