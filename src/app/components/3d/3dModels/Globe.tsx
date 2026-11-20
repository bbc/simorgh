/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { Mesh } from 'three';
import {
  POSTBOX,
  GREY_5,
  GREY_3,
  LIVE_LIGHT,
} from '#app/components/ThemeProvider/palette';

import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

import type { Region } from '#app/components/3d/3dModels/types';

const {
  SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
  SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
} = getEnvConfig();

const MODEL_PATH = `${SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${SIMORGH_PUBLIC_STATIC_ASSETS_PATH}3d/Models/test_globe_v5.glb`;

const SELECTED_COLOR = LIVE_LIGHT;

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
  const restOfWorld = subMesh['7'];
  const sphere = subMesh['8'];

  if (!(restOfWorld instanceof Mesh) || !(sphere instanceof Mesh)) {
    throw new Error(
      'Globe v5 requires mesh 7 (rest of world) and mesh 8 (sphere).',
    );
  }

  const handleClick = (index: number) => (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelectedRegion(regions[index].id);
  };

  // Meshes 1-6 map to WS regions; mesh 7 is the rest of the world; mesh 8 is the sphere.

  return (
    <group position={position}>
      {regions.map((region, i) => {
        const node = subMesh[String(i + 1)];
        if (!(node instanceof Mesh)) {
          throw new Error(`Globe v5 is missing region mesh ${i + 1}.`);
        }
        const isSelected = region.id === selectedRegionId;

        return (
          <mesh
            key={region.id}
            name={region.id}
            geometry={node.geometry}
            onClick={handleClick(i)}
          >
            <meshBasicMaterial color={isSelected ? SELECTED_COLOR : POSTBOX} />
          </mesh>
        );
      })}
      <mesh name="rest-of-world" geometry={restOfWorld.geometry}>
        <meshBasicMaterial color={GREY_5} />
      </mesh>
      <mesh name="sphere" geometry={sphere.geometry}>
        <meshBasicMaterial color={GREY_3} toneMapped={false} />
      </mesh>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

export default Globe;
