/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import { useTexture } from '@react-three/drei';

/* eslint-disable react/no-unknown-property */

const ServiceBox = () => {
  const boxTexture = useTexture('/public3d/brand.png');

  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={boxTexture} />
    </mesh>
  );
};

export default ServiceBox;
