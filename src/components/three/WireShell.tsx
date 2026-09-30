'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type RefObject } from 'react';
import {
  AdditiveBlending,
  Color,
  IcosahedronGeometry,
  type Group,
  type LineBasicMaterial,
  type ShaderMaterial,
} from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

import { palette } from './palette';
import { pointsFragmentShader, pointsVertexShader } from './shaders';
import type { MotionState } from './types';

type Props = {
  motion: RefObject<MotionState>;
  animate: boolean;
};

const RADIUS = 1.55;
const LINE_OPACITY = 0.22;

/** โครง wireframe รอบ orb + จุด node ที่ทุก vertex (ฟีล network / data) */
export default function WireShell({ motion, animate }: Props) {
  const group = useRef<Group>(null);
  const lineMaterial = useRef<LineBasicMaterial>(null);
  const nodeMaterial = useRef<ShaderMaterial>(null);

  const { source, nodes } = useMemo(() => {
    const ico = new IcosahedronGeometry(RADIUS, 1);
    const unique = ico.clone();
    unique.deleteAttribute('normal');
    unique.deleteAttribute('uv');
    const merged = mergeVertices(unique);
    unique.dispose();

    const count = merged.attributes.position.count;
    const color = new Color(palette.primary);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count).fill(1);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      color.toArray(colors, i * 3);
      phases[i] = i / count;
    }

    return {
      source: ico,
      nodes: {
        positions: merged.attributes.position.array as Float32Array,
        colors,
        scales,
        phases,
      },
    };
  }, []);

  useEffect(() => () => source.dispose(), [source]);

  const pointUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 70 },
      uPixelRatio: { value: 1 },
      uOpacity: { value: 1 },
    }),
    [],
  );

  useFrame((state, delta) => {
    const intensity = motion.current.intensity;
    if (group.current && animate) {
      group.current.rotation.y -= delta * 0.05;
      group.current.rotation.x += delta * 0.02;
    }
    if (lineMaterial.current) lineMaterial.current.opacity = LINE_OPACITY * intensity;
    const m = nodeMaterial.current;
    if (m) {
      if (animate) m.uniforms.uTime.value += delta;
      m.uniforms.uPixelRatio.value = state.viewport.dpr;
      m.uniforms.uOpacity.value = intensity;
    }
  });

  return (
    <group ref={group}>
      <lineSegments>
        <edgesGeometry args={[source]} />
        <lineBasicMaterial
          ref={lineMaterial}
          color={palette.primary}
          transparent
          opacity={LINE_OPACITY}
          depthWrite={false}
        />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodes.positions, 3]} />
          <bufferAttribute attach="attributes-aColor" args={[nodes.colors, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[nodes.scales, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[nodes.phases, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={nodeMaterial}
          uniforms={pointUniforms}
          vertexShader={pointsVertexShader}
          fragmentShader={pointsFragmentShader}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}
