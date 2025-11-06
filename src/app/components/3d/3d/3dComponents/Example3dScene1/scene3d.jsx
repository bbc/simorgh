/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei';

import TestBox from '#app/components/3d/3dObjects/primitive/TestBox/TestBox';

import styles from './index.styles';

/* eslint-disable react/no-unknown-property */

const GetTestBox = () => {
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
    <mesh ref={boxRef} onClick={handleClick}>
      <TestBox />
    </mesh>
  );
};

const Scene3D = () => (
  <div css={styles.canvasContainer}>
    <Canvas camera={{ position: [-3, 0, 0] }}>
      <Suspense fallback={null}>
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>
        <axesHelper args={[10]} />
        <gridHelper args={[20]} />
        <OrbitControls />
        <GetTestBox />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 1]} />
      </Suspense>
    </Canvas>
  </div>
);

export default Scene3D;
