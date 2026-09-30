'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import SceneErrorBoundary from './SceneErrorBoundary';
import type { Quality } from './types';
import styles from './SceneCanvas.module.css';

// three.js ถูกแยกเป็น chunk ของตัวเอง และโหลดเฉพาะฝั่ง client
const Scene = dynamic(() => import('./Scene'), { ssr: false });

type NetworkInformation = { saveData?: boolean };

function detectQuality(): Quality {
  const cores = navigator.hardwareConcurrency ?? 4;
  const smallScreen = window.matchMedia('(max-width: 768px)').matches;
  return cores <= 4 || smallScreen ? 'low' : 'high';
}

/**
 * พื้นหลัง 3D แบบ fixed หลังเนื้อหาทั้งหมด
 * - โหลดหลังหน้าเว็บพร้อมใช้งาน (requestIdleCallback) ไม่บล็อก LCP
 * - ข้ามการโหลดเมื่อผู้ใช้เปิด Save-Data
 */
export default function SceneCanvas() {
  const reducedMotion = usePrefersReducedMotion();
  const [quality, setQuality] = useState<Quality | null>(null);
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection?.saveData) return;

    const load = () => setQuality(detectQuality());

    // Safari รุ่นเก่ายังไม่มี requestIdleCallback
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(load, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(load, 300);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className={styles.root} data-ready={ready || undefined} aria-hidden="true">
      {quality && (
        <SceneErrorBoundary>
          <Scene quality={quality} reducedMotion={reducedMotion} onReady={handleReady} />
        </SceneErrorBoundary>
      )}
    </div>
  );
}
