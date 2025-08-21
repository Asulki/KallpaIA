"use client";

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

export function BubbleParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Textures
    const particleTextureLoader = new THREE.TextureLoader();
    const circleTexture = particleTextureLoader.load('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTEiIGZpbGw9InJnYmEoMjU1LDI1NSwyMDU1LDAuOCkiLz48L3N2Zz4=');
    const starTexture = particleTextureLoader.load('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDEuMDVsMi4zNiA3LjI2aDcuNjRsLTYuMTggNC40OCAyLjM2IDcuMjYtNi4xOC00LjQ4LTYuMTggNC40OCAyLjM2LTcuMjYtNi4xOC00LjQ4aDcuNjR6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiLz48L3N2Zz4=');

    // Particles
    const particlesCount = 300;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    const pastelPink = new THREE.Color('#FFB3C6');
    const pastelBlue = new THREE.Color('#AEE6FF');
    const white = new THREE.Color('#FFFFFF');
    const colorChoices = [pastelPink, pastelBlue, white];

    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 20;
        positions[i3 + 1] = (Math.random() - 0.5) * 20;
        positions[i3 + 2] = (Math.random() - 0.5) * 20;

        const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        sizes[i] = Math.random() * 0.5 + 0.1;
    }

    const createParticleSystem = (texture: THREE.Texture) => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.ShaderMaterial({
            uniforms: {
                pointTexture: { value: texture }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D pointTexture;
                varying vec3 vColor;
                void main() {
                    gl_FragColor = vec4(vColor, 1.0);
                    gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
                }
            `,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
        });
        return new THREE.Points(geometry, material);
    };

    const bubbles = createParticleSystem(circleTexture);
    const stars = createParticleSystem(starTexture);
    scene.add(bubbles);
    scene.add(stars);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      bubbles.rotation.y = elapsedTime * 0.05;
      stars.rotation.y = elapsedTime * 0.05;

      bubbles.geometry.attributes.position.needsUpdate = true;
      stars.geometry.attributes.position.needsUpdate = true;

      const positionsBubbles = bubbles.geometry.attributes.position.array as Float32Array;
       for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            positionsBubbles[i3 + 1] += 0.005; 
            if (positionsBubbles[i3 + 1] > 10) {
                 positionsBubbles[i3 + 1] = -10;
            }
       }


      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentElement === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.remove(bubbles);
      scene.remove(stars);
      bubbles.geometry.dispose();
      stars.geometry.dispose();
      (bubbles.material as THREE.ShaderMaterial).dispose();
      (stars.material as THREE.ShaderMaterial).dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 w-full h-full" />;
}
