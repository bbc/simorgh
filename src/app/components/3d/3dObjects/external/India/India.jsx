/** @jsx jsx */
/* @jsxFrag React.Fragment */
/* eslint-disable react/no-unknown-property */
import { jsx } from '@emotion/react';

import { useGLTF } from '@react-three/drei';

export function India(props) {
  const { nodes } = useGLTF('/public3d/India/India.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Hindi_(flat)"
        castShadow
        receiveShadow
        geometry={nodes['Hindi_(flat)'].geometry}
        material={nodes['Hindi_(flat)'].material}
      >
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh
        name="Urdu_(flat)"
        castShadow
        receiveShadow
        geometry={nodes['Urdu_(flat)'].geometry}
        material={nodes['Urdu_(flat)'].material}
      />
      <mesh
        name="Telugu_(flat)"
        castShadow
        receiveShadow
        geometry={nodes['Telugu_(flat)'].geometry}
        material={nodes['Telugu_(flat)'].material}
      />
      <mesh
        name="India_-_remaining_regions_(flat)"
        castShadow
        receiveShadow
        geometry={nodes['India_-_remaining_regions_(flat)'].geometry}
        material={nodes['India_-_remaining_regions_(flat)'].material}
      />
      <mesh
        name="India_(outline)_(flat)"
        castShadow
        receiveShadow
        geometry={nodes['India_(outline)_(flat)'].geometry}
        material={nodes['India_(outline)_(flat)'].material}
      />
    </group>
  );
}

useGLTF.preload('/public3d/India/India.glb');

export default India;
