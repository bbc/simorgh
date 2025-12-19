/** @jsx jsx */
/* @jsxFrag React.Fragment */
/* eslint-disable react/no-unknown-property */
import { jsx } from '@emotion/react';
import { useState } from 'react';

import { useGLTF } from '@react-three/drei';

import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const {
  SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
  SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
} = getEnvConfig();

// BBC palette
const GREY_4 = '#B0B2B4';
const POSTBOX = '#B80000';

export function India({ onMeshClick, onServiceHover, ...props }) {
  const { nodes } = useGLTF(
    `${SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${SIMORGH_PUBLIC_STATIC_ASSETS_PATH}public3d/India/India.glb`,
  );

  // state for hover effects
  const [hindiHovered, setHindiHovered] = useState(false);
  const [urduHovered, setUrduHovered] = useState(false);
  const [teluguHovered, setTeluguHovered] = useState(false);

  // click handler
  const clickHandler = serviceName => event => {
    event.stopPropagation();
    if (onMeshClick) {
      onMeshClick(serviceName);
    }
  };

  // hover handler
  const hoverHandler = (setHovered, serviceName) => ({
    onPointerOver: () => {
      setHovered(true);
      document.body.style.cursor = 'pointer';
      if (onServiceHover) onServiceHover(serviceName);
    },
    onPointerOut: () => {
      setHovered(false);
      document.body.style.cursor = 'default';
      if (onServiceHover) onServiceHover(null);
    },
  });

  // material props
  const getMaterialProps = isHovered => ({
    color: isHovered ? POSTBOX : 'white',
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        name="Hindi_(flat)"
        castShadow
        receiveShadow
        geometry={nodes['Hindi_(flat)'].geometry}
        material={nodes['Hindi_(flat)'].material}
        onClick={clickHandler('hindi')}
        {...hoverHandler(setHindiHovered, 'hindi')}
      >
        <meshStandardMaterial {...getMaterialProps(hindiHovered)} />
      </mesh>
      <mesh
        name="Urdu_(flat)"
        castShadow
        receiveShadow
        geometry={nodes['Urdu_(flat)'].geometry}
        material={nodes['Urdu_(flat)'].material}
        onClick={clickHandler('urdu')}
        {...hoverHandler(setUrduHovered, 'urdu')}
      >
        <meshStandardMaterial {...getMaterialProps(urduHovered)} />
      </mesh>
      <mesh
        name="Telugu_(flat)"
        castShadow
        receiveShadow
        geometry={nodes['Telugu_(flat)'].geometry}
        material={nodes['Telugu_(flat)'].material}
        onClick={clickHandler('telugu')}
        {...hoverHandler(setTeluguHovered, 'telugu')}
      >
        <meshStandardMaterial {...getMaterialProps(teluguHovered)} />
      </mesh>
      <mesh
        name="India_-_remaining_regions_(flat)"
        castShadow
        receiveShadow
        geometry={nodes['India_-_remaining_regions_(flat)'].geometry}
        material={nodes['India_-_remaining_regions_(flat)'].material}
      >
        <meshStandardMaterial color={GREY_4} />
      </mesh>
      <mesh
        name="India_(outline)_(flat)"
        castShadow
        receiveShadow
        geometry={nodes['India_(outline)_(flat)'].geometry}
        material={nodes['India_(outline)_(flat)'].material}
      >
        <meshBasicMaterial color="#B80000" />
      </mesh>
    </group>
  );
}

useGLTF.preload('/public3d/India/India.glb');

export default India;
