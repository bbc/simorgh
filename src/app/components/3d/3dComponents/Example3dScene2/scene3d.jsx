/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

import styles from './index.styles';

import ServiceBox from '../../3dObjects/primitive/ServiceBox/ServiceBox';
import BillboardParticleSystem from '../../3dObjects/primitive/BillboardParticleSystem/BillboardParticleSystem';

/* eslint-disable react/no-unknown-property */

// getting objects from and preparing them for 3D scene
const GetServiceBox = () => {
  const boxRef = React.useRef(null);
  const [spin, setSpin] = useState(false);

  // Handle click event to toggle spin
  const handleClick = () => {
    setSpin(spin === false);
  };

  useFrame(() => {
    if (spin && boxRef.current) {
      boxRef.current.rotation.y += 0.01;
      boxRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={boxRef} onClick={handleClick} position={[0, 1, 0]}>
      <ServiceBox />
    </mesh>
  );
};

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
        <SetCameraTarget position={[-3, 1, 0]} target={[0, 1, 0]} fov={50} />
        <GetServiceBox />
        <BillboardParticleSystem
          texturePath="public3d/test-text.png"
          particleSize={2}
          particleCount={20}
        />
        <ambientLight intensity={2.5} />
        <directionalLight position={[2, 5, 1]} />
      </Suspense>
    </Canvas>
  </div>
);

export default Scene3D;
