'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { MathUtils, type Group } from 'three';

import CoreOrb from './CoreOrb';
import OrbitRings from './OrbitRings';
import ParticleField from './ParticleField';
import WireShell from './WireShell';
import { measureLayout, resolvePreset, type Preset, type SceneLayout } from './sceneStops';
import type { MotionState, Quality } from './types';

type Props = {
  quality: Quality;
  reducedMotion: boolean;
};

const { damp } = MathUtils;

export default function Experience({ quality, reducedMotion }: Props) {
  const rig = useRef<Group>(null);
  const tilt = useRef<Group>(null);
  const motion = useRef<MotionState>({ intensity: 0, distort: 0 });
  const layout = useRef<SceneLayout>({ stops: [], maxScroll: 0 });
  const target = useRef<Preset>({ x: 0, y: 0, scale: 1, intensity: 1 });
  const pointer = useRef({ x: 0, y: 0 });
  const lastScrollY = useRef<number | null>(null);
  const invalidate = useThree((state) => state.invalidate);

  const animate = !reducedMotion;

  useEffect(() => {
    const measure = () => {
      layout.current = measureLayout();
      invalidate();
    };
    measure();

    // body เปลี่ยนขนาด (resize / font โหลดเสร็จ / เนื้อหาเปลี่ยน) → วัดตำแหน่ง section ใหม่
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);

    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    if (animate) window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [animate, invalidate]);

  useFrame((state, rawDelta) => {
    const r = rig.current;
    const t = tilt.current;
    if (!r || !t) return;

    const { viewport, size, camera } = state;
    const mobile = size.width < 768 || size.width / size.height < 0.9;
    const scrollY = animate ? window.scrollY : 0;
    const preset = resolvePreset(layout.current, scrollY, size.height, mobile, target.current);

    const halfW = viewport.width / 2;
    const halfH = viewport.height / 2;
    const fit = Math.min(halfH, halfW * 1.15) * 0.4;
    const x = preset.x * halfW;
    const y = preset.y * halfH;
    const scale = preset.scale * fit;

    if (!animate) {
      r.position.set(x, y, 0);
      r.scale.setScalar(scale);
      motion.current.intensity = preset.intensity * 0.8;
      return;
    }

    // จำกัด delta ป้องกันกระโดดเมื่อกลับมาที่แท็บ
    const delta = Math.min(rawDelta, 0.1);

    const prevScrollY = lastScrollY.current ?? scrollY;
    lastScrollY.current = scrollY;
    const velocity = delta > 0 ? Math.abs(scrollY - prevScrollY) / delta : 0;

    r.position.x = damp(r.position.x, x, 2.8, delta);
    r.position.y = damp(r.position.y, y, 2.8, delta);
    r.scale.setScalar(damp(r.scale.x, scale, 2.8, delta));

    motion.current.intensity = damp(motion.current.intensity, preset.intensity, 2.5, delta);
    motion.current.distort = damp(motion.current.distort, Math.min(velocity / 4000, 0.3), 4, delta);

    t.rotation.y = damp(t.rotation.y, pointer.current.x * 0.4, 2.5, delta);
    t.rotation.x = damp(t.rotation.x, -pointer.current.y * 0.3, 2.5, delta);

    camera.position.x = damp(camera.position.x, pointer.current.x * 0.3, 2, delta);
    camera.position.y = damp(camera.position.y, pointer.current.y * 0.2, 2, delta);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <group ref={rig} scale={0.001}>
        <group ref={tilt}>
          <CoreOrb detail={quality === 'high' ? 48 : 24} motion={motion} animate={animate} />
          <WireShell motion={motion} animate={animate} />
          <OrbitRings motion={motion} animate={animate} />
        </group>
      </group>
      <ParticleField count={quality === 'high' ? 1400 : 650} animate={animate} />
    </>
  );
}
