'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, Color, type Points, type ShaderMaterial } from 'three';

import { createRandom, palette } from './palette';
import { pointsFragmentShader, pointsVertexShader } from './shaders';

type Props = {
  count: number;
  animate: boolean;
};

/** ดาว/อนุภาคพื้นหลัง กระจายเป็นเปลือกทรงกลมรอบกล้อง */
export default function ParticleField({ count, animate }: Props) {
  const points = useRef<Points>(null);
  const material = useRef<ShaderMaterial>(null);

  const attributes = useMemo(() => {
    const random = createRandom(1337);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    const tints = [palette.light, palette.primary, palette.secondary].map((c) => new Color(c));

    for (let i = 0; i < count; i++) {
      const radius = 4 + random() * 10;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) - 2;

      const roll = random();
      tints[roll < 0.6 ? 0 : roll < 0.82 ? 1 : 2].toArray(colors, i * 3);
      scales[i] = 0.35 + random() * 1.1;
      phases[i] = random();
    }

    return { positions, colors, scales, phases };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 55 },
      uPixelRatio: { value: 1 },
      uOpacity: { value: 0.85 },
    }),
    [],
  );

  useFrame((state, delta) => {
    const m = material.current;
    if (m) {
      if (animate) m.uniforms.uTime.value += delta;
      m.uniforms.uPixelRatio.value = state.viewport.dpr;
    }
    if (animate && points.current) points.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[attributes.positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[attributes.colors, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[attributes.scales, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[attributes.phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={pointsVertexShader}
        fragmentShader={pointsFragmentShader}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
