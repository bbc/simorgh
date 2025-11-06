/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';

import styles from './index.styles';

// importing objects
import India from '../../3dObjects/external/India1/india1';

import BillboardParticleSystem from '../../3dObjects/primitive/BillboardParticleSystem/BillboardParticleSystem';

/* eslint-disable react/no-unknown-property */

const SetCameraTarget = ({ position, target, fov }) => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...position);
    camera.lookAt(...target);
    if (typeof fov === 'number') {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, position, target, fov]);
  return null;
};

const Scene3D = () => (
  <div css={styles.canvasContainer}>
    <Canvas>
      <Suspense fallback={null}>
        <SetCameraTarget position={[-3, 1, 0]} target={[0, 1, 0]} fov={80} />
        {/* lights */}
        <ambientLight intensity={3} />
        <directionalLight position={[2, 5, 1]} />
        {/* objects */}
        <India position={[0, 0, 1]} rotation={[0, Math.PI / 2, 0]} />
        {/* particle systems */}
        <BillboardParticleSystem
          texturePath="/public3d/test-text.png"
          particleSize={4}
          particleCount={1.5}
        />
        <BillboardParticleSystem
          texturePath="/public3d/hindi-text.png"
          particleSize={7}
          particleCount={6}
        />
        <BillboardParticleSystem
          texturePath="/public3d/urdu-text.png"
          particleSize={5}
          particleCount={1.5}
        />
        <BillboardParticleSystem
          texturePath="/public3d/tamil-text.png"
          particleSize={5}
          particleCount={1.5}
        />
        <BillboardParticleSystem
          texturePath="/public3d/ashoka-chakra.png"
          particleSize={2}
          particleCount={1}
        />
      </Suspense>
    </Canvas>
  </div>
);

export default Scene3D;
