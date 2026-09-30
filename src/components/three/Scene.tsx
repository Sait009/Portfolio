'use client';

import { PerformanceMonitor } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

import Experience from './Experience';
import type { Quality } from './types';

type Props = {
  quality: Quality;
  reducedMotion: boolean;
  onReady: () => void;
};

export default function Scene({ quality, reducedMotion, onReady }: Props) {
  const [maxDpr, setMaxDpr] = useState(quality === 'high' ? 1.75 : 1.25);

  return (
    <Canvas
      dpr={[1, maxDpr]}
      flat
      frameloop={reducedMotion ? 'demand' : 'always'}
      camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 40 }}
      gl={{ antialias: quality === 'high', alpha: true, powerPreference: 'high-performance' }}
      onCreated={onReady}
    >
      {/* FPS ตก → ลด pixel ratio อัตโนมัติ */}
      <PerformanceMonitor onDecline={() => setMaxDpr(1)} />
      <Experience quality={quality} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
