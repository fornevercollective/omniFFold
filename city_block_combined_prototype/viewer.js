// viewer.js: Full support for WebXR, touch, and device orientation

import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { XRControllerModelFactory } from 'https://cdn.skypack.dev/three/examples/jsm/webxr/XRControllerModelFactory.js';
import { VRButton } from 'https://cdn.skypack.dev/three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { VRButton } from './jsm/webxr/VRButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 20, 0);
scene.add(light);

// Cube demo
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

// Controllers
const controllerModelFactory = new XRControllerModelFactory();
const controller1 = renderer.xr.getController(0);
scene.add(controller1);
const controllerGrip1 = renderer.xr.getControllerGrip(0);
controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
scene.add(controllerGrip1);

// Touch support
let isDragging = false;
let prevX = 0;
document.addEventListener('touchstart', (e) => {
  isDragging = true;
  prevX = e.touches[0].clientX;
});
document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const deltaX = e.touches[0].clientX - prevX;
  cube.rotation.y += deltaX * 0.01;
  prevX = e.touches[0].clientX;
});
document.addEventListener('touchend', () => isDragging = false);

// Device orientation
window.addEventListener('deviceorientation', (e) => {
  if (e.alpha !== null) {
    cube.rotation.x = THREE.MathUtils.degToRad(e.beta || 0);
    cube.rotation.z = THREE.MathUtils.degToRad(e.gamma || 0);
  }
}, true);

// Animation loop
function animate() {
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}
animate();
