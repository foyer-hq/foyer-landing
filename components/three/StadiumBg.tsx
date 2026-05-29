'use client';

import React from 'react';
import { Environment } from '@react-three/drei';
import { COLORS } from '@/lib/constants';

export default function StadiumBg() {
  return (
    <>
      {/* Ambient environment preset for nice reflection dynamics */}
      <Environment preset="night" />

      {/* Deep purple/black blurred background plane */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[40, 20]} />
        <meshBasicMaterial
          color="#01111a"
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </mesh>

      {/* Spotlights creating high-contrast key lights */}
      {/* Left Violet Spot */}
      <spotLight
        position={[-6, 8, -2]}
        color={COLORS.violet}
        intensity={15.0} // Scale intensity slightly for better visibility in newer three.js
        angle={0.4}
        penumbra={1}
        castShadow={false}
      />

      {/* Right Gold Spot */}
      <spotLight
        position={[6, 8, -2]}
        color={COLORS.gold}
        intensity={12.0} // Scale intensity slightly for better visibility in newer three.js
        angle={0.4}
        penumbra={1}
        castShadow={false}
      />

      {/* Soft warm PointLight to highlight the front face of meshes */}
      <pointLight
        position={[0, 2, 2]}
        color={COLORS.gold}
        intensity={3.0}
      />
    </>
  );
}
