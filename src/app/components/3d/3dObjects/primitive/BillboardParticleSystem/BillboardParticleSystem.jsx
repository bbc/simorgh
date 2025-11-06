/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { useRef, useMemo, useState, useEffect } from 'react';
import { jsx } from '@emotion/react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* eslint-disable react/no-unknown-property */

const randomInRange = (min, max) => min + Math.random() * (max - min);
const randomPosition = () => [
  (Math.random() - 0.5) * 2,
  Math.random() * 2,
  (Math.random() - 0.5) * 2,
];
const randomColor = () =>
  new THREE.Color(
    `hsl(${randomInRange(30, 60)}, 100%, ${randomInRange(60, 80)}%)`,
  );

const createEmber = () => ({
  id: crypto.randomUUID(),
  position: randomPosition(),
  speed: randomInRange(0.0003, 0.008),
  size: randomInRange(0.04, 0.1),
  color: randomColor(),
});

const useFallbackTextureWithAspect = (mainPath, fallbackPath) => {
  const [texture, setTexture] = useState(null);
  const [aspect, setAspect] = useState(1);

  useEffect(() => {
    let isMounted = true;
    const loader = new THREE.TextureLoader();

    loader.load(
      mainPath,
      loadedTexture => {
        if (isMounted) {
          setTexture(loadedTexture);
          setAspect(
            loadedTexture.image.width / loadedTexture.image.height || 1,
          );
        }
      },
      undefined,
      () => {
        loader.load(fallbackPath, fallbackTexture => {
          if (isMounted) {
            setTexture(fallbackTexture);
            setAspect(
              fallbackTexture.image.width / fallbackTexture.image.height || 1,
            );
          }
        });
      },
    );

    return () => {
      isMounted = false;
    };
  }, [mainPath, fallbackPath]);

  return { texture, aspect };
};

const BillboardEmber = ({ position, size, color, texture, aspect, camera }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current && camera) {
      meshRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[size * aspect, size, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        color={color}
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

const BillboardParticleSystem = ({
  texturePath,
  particleSize,
  particleCount,
}) => {
  const emberCount = particleCount || 50;

  const embers = useMemo(
    () => Array.from({ length: emberCount }, createEmber),
    [emberCount],
  );
  const { camera } = useThree();
  const { texture, aspect } = useFallbackTextureWithAspect(
    texturePath,
    '/public3d/point-target.png',
  );

  const [emberStates, setEmberStates] = useState(embers);

  useFrame(() => {
    setEmberStates(currentEmbers =>
      currentEmbers.map(ember => {
        const nextY = ember.position[1] + ember.speed;
        if (nextY > 2.5) {
          return {
            ...ember,
            position: [(Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2],
          };
        }
        return {
          ...ember,
          position: [ember.position[0], nextY, ember.position[2]],
        };
      }),
    );
  });

  if (!texture) return null;

  return (
    <group>
      {emberStates.map(ember => (
        <BillboardEmber
          key={ember.id}
          position={ember.position}
          size={ember.size * particleSize}
          color={ember.color}
          texture={texture}
          aspect={aspect}
          camera={camera}
        />
      ))}
    </group>
  );
};

export default BillboardParticleSystem;
