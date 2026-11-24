import { useState } from 'react';
import { createRoot, events, extend } from '@react-three/fiber';
import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from 'three';
import {
  act,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import {
  POSTBOX,
  GREY_5,
  GREY_3,
  LIVE_LIGHT,
} from '#app/components/ThemeProvider/palette';
import Globe from './Globe';

const nodes = Object.fromEntries(
  Array.from({ length: 8 }, (_, index) => [
    String(index + 1),
    new Mesh(new BoxGeometry()),
  ]),
);

jest.mock('@react-three/drei', () => ({
  useGLTF: Object.assign(
    jest.fn(() => ({ nodes })),
    {
      preload: jest.fn(),
    },
  ),
}));

extend({ Group, Mesh, MeshBasicMaterial });

const regions = [
  { id: 'africa', name: 'Africa' },
  { id: 'asia-pacific', name: 'Asia Pacific' },
  { id: 'asia-south', name: 'Asia South' },
  { id: 'europe', name: 'Europe' },
  { id: 'latin-america', name: 'Latin America' },
  { id: 'middle-east', name: 'Middle East' },
];

describe('Globe v5', () => {
  const canvas = document.createElement('canvas');
  const root = createRoot(canvas);

  beforeAll(async () => {
    await root.configure({
      gl: () => ({
        render: jest.fn(),
        setPixelRatio: jest.fn(),
        setSize: jest.fn(),
        domElement: canvas,
      }),
      events,
      size: { width: 100, height: 100, top: 0, left: 0 },
      frameloop: 'never',
      camera: { position: [0, 0, 5] },
    });
  });

  afterAll(async () => {
    await act(async () => root.unmount());
  });

  it('renders the six regions, rest of world and existing sphere using their v5 geometries and colours', async () => {
    const onSelectedRegion = jest.fn();
    const store = await act(async () =>
      root.render(
        <Globe
          regions={regions}
          selectedRegionId={null}
          onSelectedRegion={onSelectedRegion}
        />,
      ),
    );
    const meshes = store.getState().scene.children[0].children;

    expect(meshes).toHaveLength(8);
    meshes.forEach((mesh, index) => {
      expect(mesh).toBeInstanceOf(Mesh);
      if (
        !(mesh instanceof Mesh) ||
        !(mesh.material instanceof MeshBasicMaterial)
      ) {
        throw new Error('Expected a globe mesh with a basic material.');
      }
      expect(mesh.geometry).toBe(nodes[String(index + 1)].geometry);
      expect(mesh.material.color.getHexString()).toBe(
        [POSTBOX, POSTBOX, POSTBOX, POSTBOX, POSTBOX, POSTBOX, GREY_5, GREY_3][
          index
        ]
          .slice(1)
          .toLowerCase(),
      );
      expect(mesh.material.toneMapped).toBe(index !== 7);
    });
    expect(meshes[7].scale.toArray()).toEqual([1, 1, 1]);
    expect(
      store.getState().internal.interaction.map(mesh => mesh.name),
    ).toEqual(regions.map(region => region.id));
  });

  it('selects a tapped region and restores its red colour when selection changes', async () => {
    const onSelectedRegion = jest.fn();
    const InteractiveGlobe = () => {
      const [selectedRegionId, setSelectedRegionId] = useState<string | null>(
        null,
      );
      return (
        <Globe
          regions={regions}
          selectedRegionId={selectedRegionId}
          onSelectedRegion={regionId => {
            onSelectedRegion(regionId);
            setSelectedRegionId(regionId);
          }}
        />
      );
    };
    const store = await act(async () => root.render(<InteractiveGlobe />));
    const { scene } = store.getState();
    scene.updateMatrixWorld();
    store.getState().camera.updateMatrixWorld();

    await act(async () => {
      fireEvent(
        canvas,
        new MouseEvent('pointerdown', { clientX: 50, clientY: 50 }),
      );
      fireEvent.click(canvas, { clientX: 50, clientY: 50 });
    });

    expect(onSelectedRegion).toHaveBeenCalledTimes(1);
    expect(onSelectedRegion).toHaveBeenCalledWith('africa');
    const africa = scene.getObjectByName('africa');
    if (
      !(africa instanceof Mesh) ||
      !(africa.material instanceof MeshBasicMaterial)
    ) {
      throw new Error('Expected the Africa region mesh.');
    }
    expect(africa.material.color.getHexString()).toBe(
      LIVE_LIGHT.slice(1).toLowerCase(),
    );

    await act(async () =>
      root.render(
        <Globe
          regions={regions}
          selectedRegionId="europe"
          onSelectedRegion={onSelectedRegion}
        />,
      ),
    );
    const resetAfrica = scene.getObjectByName('africa');
    if (
      !(resetAfrica instanceof Mesh) ||
      !(resetAfrica.material instanceof MeshBasicMaterial)
    ) {
      throw new Error('Expected the Africa region mesh.');
    }
    expect(resetAfrica.material.color.getHexString()).toBe(
      POSTBOX.slice(1).toLowerCase(),
    );
  });
});
