'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, type RefObject } from 'react';
import type { Mesh, MeshBasicMaterial } from 'three';

import { palette } from './palette';
import type { MotionState } from './types';

type Props = {
  motion: RefObject<MotionState>;
  animate: boolean;
};

const RINGS = [
  { radius: 2.05, rotation: [1.25, 0.25, 0], speed: 0.45, color: palette.primary, opacity: 0.35 },
  {
    radius: 2.4,
    rotation: [1.85, -0.55, 0.35],
    speed: -0.3,
    color: palette.secondary,
    opacity: 0.3,
  },
] as const;

function Ring({
  radius,
  rotation,
  speed,
  color,
  opacity,
  motion,
  animate,
}: (typeof RINGS)[number] & Props) {
  const satellite = useRef<Mesh>(null);
  const ringMaterial = useRef<MeshBasicMaterial>(null);
  const angle = useRef(speed * 4);

  useFrame((_, delta) => {
    if (animate) angle.current += delta * speed;
    satellite.current?.position.set(
      Math.cos(angle.current) * radius,
      Math.sin(angle.current) * radius,
      0,
    );
    if (ringMaterial.current) ringMaterial.current.opacity = opacity * motion.current.intensity;
  });

  return (
    <group rotation={[...rotation]}>
      <mesh>
        <torusGeometry args={[radius, 0.005, 6, 220]} />
        <meshBasicMaterial
          ref={ringMaterial}
          color={color}
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={satellite}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

export default function OrbitRings(props: Props) {
  return (
    <>
      {RINGS.map((ring) => (
        <Ring key={ring.radius} {...ring} {...props} />
      ))}
    </>
  );
}
