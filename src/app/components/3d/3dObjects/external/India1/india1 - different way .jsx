/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';

import { useGLTF } from '@react-three/drei';

/* eslint-disable react/no-unknown-property */

function India() {
  const gltf = useGLTF('/India3d/India_outline.gltf');
  return <primitive object={gltf.scene} />;
}

export default India;
