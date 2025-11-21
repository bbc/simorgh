/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
// import { GizmoHelper, GizmoViewport } from '@react-three/drei'; helpers for debugging

// importing objects
import { India } from '#app/components/3d/3dObjects/external/India/India';
import BillboardParticleSystem from '../../3dObjects/primitive/BillboardParticleSystem/BillboardParticleSystem';

import styles from './index.styles';
/* eslint-disable react/no-unknown-property */

// motion prefrences
const preferesReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Particle system constants
const MAX_HEIGHT = 4.7;
const SPAWN_WIDTH = 6;
const SPAWN_LENGTH = 1;

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

const Scene3D = () => {
  const navigateToService = serviceName => {
    window.location.assign(`/${serviceName}`);
  };

  return (
    <div css={styles.canvasContainer}>
      <Canvas>
        <Suspense fallback={null}>
          <SetCameraTarget
            position={[-5.8, 0.43, 0]}
            target={[0, 0.45, 0]}
            fov={50}
          />
          {/* helpers for debugging */}
          {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport />
          </GizmoHelper>
          <axesHelper args={[10]} />
          <gridHelper args={[20]} /> */}

          {/* lights */}
          <ambientLight intensity={5} />
          <directionalLight position={[2, 5, 1]} />
          {/* objects */}
          <India
            position={[-5, 0, 0.4]}
            rotation={[0, 0, 0]}
            onMeshClick={navigateToService}
          />
          {/* particle systems */}
          {!preferesReducedMotion && (
            <group name="scene particles" position={[2, -1.7, -0.1]}>
              <BillboardParticleSystem
                texturePath="/public3d/test-text.png"
                particleSize={4}
                particleCount={1.5}
                maxHeight={MAX_HEIGHT}
                spawnWidth={SPAWN_WIDTH}
                spawnLength={SPAWN_LENGTH}
              />
              <BillboardParticleSystem
                texturePath="/public3d/hindi-text.png"
                particleSize={7}
                particleCount={6}
                maxHeight={MAX_HEIGHT}
                spawnWidth={SPAWN_WIDTH}
                spawnLength={SPAWN_LENGTH}
              />
              <BillboardParticleSystem
                texturePath="/public3d/urdu-text.png"
                particleSize={5}
                particleCount={1.5}
                maxHeight={MAX_HEIGHT}
                spawnWidth={SPAWN_WIDTH}
                spawnLength={SPAWN_LENGTH}
              />
              <BillboardParticleSystem
                texturePath="/public3d/tamil-text.png"
                particleSize={5}
                particleCount={1.5}
                maxHeight={MAX_HEIGHT}
                spawnWidth={SPAWN_WIDTH}
                spawnLength={SPAWN_LENGTH}
              />
              <BillboardParticleSystem
                texturePath="/public3d/ashoka-chakra.png"
                particleSize={6}
                particleCount={1}
                maxHeight={MAX_HEIGHT}
                spawnWidth={SPAWN_WIDTH}
                spawnLength={SPAWN_LENGTH}
              />
            </group>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
