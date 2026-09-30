'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, type RefObject } from 'react';
import { Color, type Mesh, type ShaderMaterial } from 'three';

import { palette } from './palette';
import { orbFragmentShader, orbVertexShader } from './shaders';
import type { MotionState } from './types';

type Props = {
  detail: number;
  motion: RefObject<MotionState>;
  animate: boolean;
};

const BASE_DISTORT = 0.18;

export default function CoreOrb({ detail, motion, animate }: Props) {
  const mesh = useRef<Mesh>(null);
  const material = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistort: { value: BASE_DISTORT },
      uFrequency: { value: 1.05 },
      uIntensity: { value: 1 },
      uColorA: { value: new Color(palette.primary) },
      uColorB: { value: new Color(palette.secondary) },
      uColorBase: { value: new Color(palette.base) },
    }),
    [],
  );

  useFrame((_, delta) => {
    const m = material.current;
    if (!m) return;

    if (animate) {
      m.uniforms.uTime.value += delta;
      if (mesh.current) mesh.current.rotation.y += delta * 0.06;
    }
    m.uniforms.uIntensity.value = motion.current.intensity;
    m.uniforms.uDistort.value = BASE_DISTORT + motion.current.distort;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, detail]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={orbVertexShader}
        fragmentShader={orbFragmentShader}
        transparent
      />
    </mesh>
  );
}
