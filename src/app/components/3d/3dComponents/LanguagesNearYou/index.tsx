/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import Scene3D from './scene3d';

import styles from './index.styles';

const LanguagesNearYou = () => {
  return (
    <div>
      <h2>Languages Near You</h2>
      <div css={styles.scene3dContainer}>
        <Scene3D />
      </div>
      <p> link to other services </p>
    </div>
  );
};

export default LanguagesNearYou;
