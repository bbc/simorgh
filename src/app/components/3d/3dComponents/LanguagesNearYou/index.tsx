/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import { RequestContext } from '#contexts/RequestContext';
import config3d from '#app/components/3d/config3d.json';
import { use } from 'react';
import Text from '#app/components/Text';
import Scene3D from './scene3d';
import styles from './index.styles';

const LanguagesNearYou = () => {
  const { service } = use(RequestContext);
  const isEnabled = config3d.LanguagesNearYou.enabled.includes(service);

  if (!isEnabled) {
    return null;
  }

  return (
    <div>
      <Text
        as="h2"
        size="trafalgar"
        fontVariant="sansBold"
        css={styles.textHeading}
      >
        Languages Near You
      </Text>
      <div css={styles.scene3dContainer}>
        <Scene3D />
      </div>
      <p>^ work in progress</p>
    </div>
  );
};

export default LanguagesNearYou;
