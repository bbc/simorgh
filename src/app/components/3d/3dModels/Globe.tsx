/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
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

import type { Region } from '#app/components/3d/3dModels/types';

const {
  SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
  SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
} = getEnvConfig();

const MODEL_PATH = `${SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${SIMORGH_PUBLIC_STATIC_ASSETS_PATH}3d/Models/test_globe_v4.glb`;

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
  regions: Region[];
};

export function Globe({ position, regions }: GlobeProps) {
  const { nodes: subMesh } = useGLTF(MODEL_PATH);
  const subMeshKeys = Object.keys(subMesh).filter(
    key => 'geometry' in subMesh[key],
  );

  const [selectedSubMesh, setSelectedSubMesh] = useState<number | null>(null);

  const handleClick = (index: number) => (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setSelectedSubMesh(index);
    console.log('your region is', regions[index].name);
  };

  // Sub-meshes are ordered region caps first, then the globe body sphere last.
  const regionKeys = subMeshKeys.slice(0, regions.length);
  const bodyKey = subMeshKeys[regions.length];

  return (
    <group position={position}>
      {regionKeys.map((key, i) => {
        const node = subMesh[key] as Mesh;
        return (
          <mesh
            key={key}
            name={regions[i].id}
            geometry={node.geometry}
            onClick={handleClick(i)}
          >
            <meshBasicMaterial
              color={selectedSubMesh === i ? SELECTED_COLOR : MESH_COLORS[i]}
            />
          </mesh>
        );
      })}
      {bodyKey && (
        <mesh geometry={(subMesh[bodyKey] as Mesh).geometry} scale={0.995}>
          <meshBasicMaterial color={MESH_COLORS[regions.length]} />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

export default Globe;
