/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import Scene3D from './scene3d';

import styles from './index.styles';

const Example3dScene2 = () => {
  return (
    <div css={styles.example3dScene}>
      <Scene3D />
    </div>
  );
};

export default Example3dScene2;
