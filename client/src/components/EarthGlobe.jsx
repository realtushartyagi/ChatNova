import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Points, PointMaterial } from '@react-three/drei';

export default function EarthGlobe() {
  const groupRef = useRef();

  // Slowly rotate the entire group
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  // Generate random points for the "glowing nodes" on the surface of the sphere
  const particleCount = 600;
  const positions = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    const radius = 3.5; // Slightly larger than the inner sphere
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      p[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = radius * Math.cos(phi);
    }
    return p;
  }, [particleCount]);

  return (
    <group ref={groupRef}>
      {/* Outer Wireframe Sphere (Neural Network Grid) */}
      <Sphere args={[3.48, 48, 48]}>
        <meshBasicMaterial 
          color="#6D28D9" 
          wireframe={true} 
          transparent={true} 
          opacity={0.3} 
        />
      </Sphere>

      {/* Inner Solid Sphere to block the background lines and give depth */}
      <Sphere args={[3.45, 32, 32]}>
        <meshBasicMaterial 
          color="#050508" 
        />
      </Sphere>

      {/* Glowing Nodes (Points) */}
      <Points positions={positions}>
        <PointMaterial
          transparent
          color="#C084FC"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
    </group>
  );
}
