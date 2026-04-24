// import { jsx } from '@emotion/react';
// import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Globe } from '#app/components/3d/3dModels/Globe';
import styles from './index.styles';

/* eslint-disable react/no-unknown-property */
const Scene3D = () => (
  <div css={styles.canvasContainer}>
    <Canvas>
      <OrbitControls />
      <Globe />
    </Canvas>
  </div>
);

export default Scene3D;
