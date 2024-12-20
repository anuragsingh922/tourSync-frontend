import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDAvatar = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(40, 40);
    mountRef.current.appendChild(renderer.domElement);

    // Create a sphere for the head
    const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const skinMaterial = new THREE.MeshPhongMaterial({
      color: 0xf5d0c5,
      shininess: 100,
    });
    const head = new THREE.Mesh(headGeometry, skinMaterial);
    scene.add(head);

    // Create eyes
    const eyeGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.x = -0.3;
    leftEye.position.z = 0.6;
    leftEye.scale.set(0.2, 0.2, 0.2);
    head.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.x = 0.3;
    rightEye.position.z = 0.6;
    rightEye.scale.set(0.2, 0.2, 0.2);
    head.add(rightEye);

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 2.5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      head.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-10 h-10 rounded-full overflow-hidden" />;
};

export default ThreeDAvatar;