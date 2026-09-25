/* eslint-disable react/no-unknown-property */
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
  selectedRegionId: string | null;
  onSelectedRegion: (regionId: string) => void;
};

export function Globe({
  position,
  regions,
  selectedRegionId,
  onSelectedRegion,
}: GlobeProps) {
  const { nodes: subMesh } = useGLTF(MODEL_PATH);
  const subMeshKeys = Object.keys(subMesh).filter(
    key => 'geometry' in subMesh[key],
  );

  const handleClick = (index: number) => (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelectedRegion(regions[index].id);
  };

  // Sub meshes 1-6 map to WS regions; sub mesh 7 is a sphere, to complete the look of a globe.
  const regionKeys = subMeshKeys.slice(0, regions.length);
  const bodyKey = subMeshKeys[regions.length];

  return (
    <group position={position}>
      {regionKeys.map((key, i) => {
        const node = subMesh[key] as Mesh;
        const isSelected = regions[i].id === selectedRegionId;

        return (
          <mesh
            key={key}
            name={regions[i].id}
            geometry={node.geometry}
            onClick={handleClick(i)}
          >
            <meshBasicMaterial
              color={isSelected ? SELECTED_COLOR : MESH_COLORS[i]}
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
