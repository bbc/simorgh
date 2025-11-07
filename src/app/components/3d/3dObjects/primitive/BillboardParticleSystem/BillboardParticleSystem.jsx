/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { useRef, useMemo, useState, useEffect } from 'react';
import { jsx } from '@emotion/react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* eslint-disable react/no-unknown-property */

// === PARTICLE SYSTEM CONFIGURATION ===

// Default values
const DEFAULT_SPAWN_WIDTH = 6;
const DEFAULT_SPAWN_LENGTH = 6;
const DEFAULT_MAX_HEIGHT = 8;
const DEFAULT_PARTICLE_COLOR = '#FF0000';
const DEFAULT_PARTICLE_COUNT = 50;

// Particle physics
const PARTICLE_SPEED_MIN = 0.0003;
const PARTICLE_SPEED_MAX = 0.008;
const PARTICLE_SIZE_MIN = 0.04;
const PARTICLE_SIZE_MAX = 0.1;

// Fade effects
const FADE_IN_HEIGHT_RATIO = 0.2; // Fade in at 20% of max height
const FADE_OUT_HEIGHT_RATIO = 0.6; // Fade out at 60% of max height
const BASE_OPACITY = 0.8;

// Fallback texture
const FALLBACK_TEXTURE_PATH = '/public3d/point-target.png';

const randomInRange = (min, max) => min + Math.random() * (max - min);
const randomPosition = (
  width = DEFAULT_SPAWN_WIDTH,
  length = DEFAULT_SPAWN_LENGTH,
) => {
  const x = (Math.random() - 0.5) * length; // X-axis: side to side (using length)
  const z = (Math.random() - 0.5) * width; // Z-axis: forward/back (using width)
  return [x, 0, z];
};

const createEmber = (
  width = DEFAULT_SPAWN_WIDTH,
  length = DEFAULT_SPAWN_LENGTH,
  color = DEFAULT_PARTICLE_COLOR,
) => ({
  id: crypto.randomUUID(),
  position: randomPosition(width, length),
  speed: randomInRange(PARTICLE_SPEED_MIN, PARTICLE_SPEED_MAX),
  size: randomInRange(PARTICLE_SIZE_MIN, PARTICLE_SIZE_MAX),
  color: new THREE.Color(color),
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

const BillboardEmber = ({
  position,
  size,
  color,
  texture,
  aspect,
  camera,
  maxHeight,
}) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current && camera) {
      meshRef.current.quaternion.copy(camera.quaternion);
    }
  });

  // Calculate fade-in and fade-out based on height (Y position)
  const fadeInEndHeight = maxHeight * FADE_IN_HEIGHT_RATIO;
  const fadeOutStartHeight = maxHeight * FADE_OUT_HEIGHT_RATIO;
  const currentHeight = position[1];
  let opacity = BASE_OPACITY;

  if (currentHeight < fadeInEndHeight) {
    // Fade in from 0 to fadeInEndHeight
    const fadeInProgress = currentHeight / fadeInEndHeight;
    opacity = BASE_OPACITY * fadeInProgress;
  } else if (currentHeight > fadeOutStartHeight) {
    // Fade out from fadeOutStartHeight to maxHeight
    const fadeOutProgress =
      (currentHeight - fadeOutStartHeight) / (maxHeight - fadeOutStartHeight);
    opacity = BASE_OPACITY * (1 - fadeOutProgress);
  }

  return (
    <mesh ref={meshRef} position={position} scale={[size * aspect, size, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        color={color}
        transparent
        opacity={Math.max(0, opacity)}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
};

const BillboardParticleSystem = ({
  texturePath,
  particleSize,
  particleCount,
  maxHeight = DEFAULT_MAX_HEIGHT,
  spawnWidth = DEFAULT_SPAWN_WIDTH,
  spawnLength = DEFAULT_SPAWN_LENGTH,
  particleColor = DEFAULT_PARTICLE_COLOR,
}) => {
  const emberCount = particleCount || DEFAULT_PARTICLE_COUNT;

  const embers = useMemo(
    () =>
      Array.from({ length: emberCount }, () =>
        createEmber(spawnWidth, spawnLength, particleColor),
      ),
    [emberCount, spawnWidth, spawnLength, particleColor],
  );
  const { camera } = useThree();
  const { texture, aspect } = useFallbackTextureWithAspect(
    texturePath,
    FALLBACK_TEXTURE_PATH,
  );

  const [emberStates, setEmberStates] = useState(embers);

  useFrame(() => {
    setEmberStates(currentEmbers =>
      currentEmbers.map(ember => {
        const nextY = ember.position[1] + ember.speed;
        if (nextY > maxHeight) {
          return {
            ...ember,
            position: randomPosition(spawnWidth, spawnLength),
            color: new THREE.Color(particleColor),
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
          maxHeight={maxHeight}
        />
      ))}
    </group>
  );
};

export default BillboardParticleSystem;
