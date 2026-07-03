/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh } from 'three';
import {
  POSTBOX,
  SPORT_YELLOW,
  SERVICE_NEUTRAL_CORE,
  SUCCESS_CORE,
  NEWSROUND_PURPLE,
  LIVE_LIGHT,
  GHOST,
  WHITE,
  ORBIT_GREY,
} from '#app/components/ThemeProvider/palette';

import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const {
  SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
  SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
} = getEnvConfig();

const MODEL_PATH = `${SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${SIMORGH_PUBLIC_STATIC_ASSETS_PATH}3d/Models/test_globe.glb`;

const MESH_COLORS = [
  GHOST,
  SPORT_YELLOW,
  NEWSROUND_PURPLE,
  POSTBOX,
  SERVICE_NEUTRAL_CORE,
  SUCCESS_CORE,
  LIVE_LIGHT,
  POSTBOX,
  WHITE,
  WHITE,
];

const SELECTED_COLOR = ORBIT_GREY;

type Vector3 = [number, number, number];

type GlobeProps = {
  position?: Vector3;
};

export function Globe({ position }: GlobeProps) {
  const { nodes: subMesh } = useGLTF(MODEL_PATH);
  const subMeshKeys = Object.keys(subMesh).filter(
    key => 'geometry' in subMesh[key],
  );

  const [selectedSubMesh, setSelectedSubMesh] = useState<number | null>(null);

  const handleClick = (index: number) => () => {
    setSelectedSubMesh(index);
  };

  return (
    <group position={position}>
      {subMeshKeys.map((key, i) => (
        <mesh
          key={key}
          geometry={(subMesh[key] as Mesh).geometry}
          onClick={handleClick(i)}
        >
          <meshBasicMaterial
            color={selectedSubMesh === i ? SELECTED_COLOR : MESH_COLORS[i]}
          />
        </mesh>
      ))}
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

export default Globe;
