'use client';

import { useRef, type ComponentProps, type PointerEvent } from 'react';

import styles from './SpotlightCard.module.css';

type Props = ComponentProps<'article'> & {
  /** เอียงการ์ดแบบ 3D ตามตำแหน่งเมาส์ */
  tilt?: boolean;
};

/**
 * การ์ดที่มีแสง spotlight + ขอบเรืองแสงตามเมาส์
 * ส่งค่าเป็น CSS custom properties — style ทั้งหมดอยู่ใน CSS
 */
export default function SpotlightCard({ tilt = false, className, children, ...props }: Props) {
  const ref = useRef<HTMLElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    ref.current.style.setProperty('--mx', `${x * 100}%`);
    ref.current.style.setProperty('--my', `${y * 100}%`);
    if (tilt) {
      ref.current.style.setProperty('--rx', `${(0.5 - y) * 6}deg`);
      ref.current.style.setProperty('--ry', `${(x - 0.5) * 8}deg`);
    }
  };

  const handlePointerLeave = () => {
    ref.current?.style.setProperty('--rx', '0deg');
    ref.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={ref}
      className={[styles.card, className].filter(Boolean).join(' ')}
      data-tilt={tilt || undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {children}
    </article>
  );
}
