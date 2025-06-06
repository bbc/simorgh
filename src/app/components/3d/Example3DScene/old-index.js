// 3JS with vanilla JS
import * as THREE from 'three';

// scene setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRender();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// creating a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// adding the cube to the scene
scene.add(cube);
camera.position.z = 5;

function animate() {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
