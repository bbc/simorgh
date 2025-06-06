import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Example3DScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // scene
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );

      // renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      containerRef.current?.appendChild(renderer.domElement);

      // creating a cube
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);

      // adding the cube to the scene
      scene.add(cube);
      camera.position.z = 5;

      // rendering the scene
      const renderScene = () => {
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        // requestAnimationFrame(renderScene);
      };

      renderScene();
    }
  }, []);

  return <div ref={containerRef} />;
};

export default Example3DScene;
