import React, { useRef, useEffect } from "react";
import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.155.0/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'https://unpkg.com/three@0.155.0/examples/jsm/webxr/VRButton.js';

export default function VRViewer() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.6, 0);
    controls.update();

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(-3, 10, -10);
    scene.add(dirLight);

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: 0x444444 })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Dummy NPCs
    const npcMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    for (let i = 0; i < 10; i++) {
      const npc = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 1.8, 32),
        npcMaterial
      );
      npc.position.set(i * 1.5, 0.9, (i % 2) * 2);
      scene.add(npc);
    }

    function animate() {
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    }

    animate();
    return () => mountRef.current?.removeChild(renderer.domElement);
  }, []);

  useEffect(() => {
    // Reference to scene, camera, renderer from the first useEffect
    // We'll need to get these from the DOM or refactor to share them.
    // For simplicity, let's assume you merge this logic into your main useEffect.
    // If you want to keep it separate, you need to refactor to share scene/camera/renderer.

    // Example for merging into your main useEffect:
    // (Place this code inside your main useEffect, after scene/camera/renderer are created)

    let npcs = {};

    fetch('/assets/tracking/test_tracking_dataset.json')
      .then(res => res.json())
      .then(data => {
        // Group frames by ID
        const tracks = {};
        data.forEach(entry => {
          if (!tracks[entry.id]) tracks[entry.id] = [];
          tracks[entry.id].push(entry);
        });

        Object.keys(tracks).forEach(id => {
          const material = new THREE.MeshStandardMaterial({ color: 0xff4444 });
          const npc = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 1.8, 32),
            material
          );
          npc.position.set(...tracks[id][0].position);
          scene.add(npc);
          npcs[id] = { mesh: npc, track: tracks[id], index: 0 };
        });

        // Animate tracking playback
        renderer.setAnimationLoop(() => {
          Object.values(npcs).forEach(npc => {
            const next = npc.track[npc.index];
            if (next) npc.mesh.position.set(...next.position);
            npc.index = (npc.index + 1) % npc.track.length;
          });
          renderer.render(scene, camera);
        });
      });

    // Optionally, cleanup logic for removing NPCs if needed
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
}
