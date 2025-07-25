/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei';

// importing objects
import { India } from '#app/components/3d/3dObjects/external/India/India';
import BillboardParticleSystem from '../../3dObjects/primitive/BillboardParticleSystem/BillboardParticleSystem';

import styles from './index.styles';
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
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>
        <axesHelper args={[10]} />
        <gridHelper args={[20]} />
        <OrbitControls />
        {/* lights */}
        <ambientLight intensity={4} />
        <directionalLight position={[2, 5, 1]} />
        {/* objects */}
        <India position={[0, 0, 0]} rotation={[0, 0, 0]} />
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
