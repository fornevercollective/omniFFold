// VRViewer.jsx
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function VRViewer() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.6, 0);
    controls.update();

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // Load NYC HDR environment map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    new THREE.RGBELoader()
      .setPath('./')
      .load('environment_map.hdr', (texture) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
      });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function animate() {
      renderer.setAnimationLoop(() => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      });
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }, []);

  return <div ref={mountRef} />;
}