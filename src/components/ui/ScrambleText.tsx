'use client';

import { useEffect, useRef } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type Props = {
  words: readonly string[];
  /** เวลาที่ค้างแต่ละคำ (ms) */
  holdMs?: number;
  className?: string;
};

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01';

const escapeHtml = (char: string) =>
  char === '<' ? '&lt;' : char === '>' ? '&gt;' : char === '&' ? '&amp;' : char;

/**
 * ข้อความสลับคำแบบ "decode" สไตล์ terminal
 * - อัปเดต DOM ตรงผ่าน ref (ไม่ re-render React ทุกเฟรม)
 * - screen reader อ่านรายการคำแบบ static แทน
 */
export default function ScrambleText({ words, holdMs = 2600, className }: Props) {
  const output = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = output.current;
    if (!el || words.length < 2) return;

    let index = 0;
    let frame = 0;
    let timeout = 0;

    const scrambleTo = (next: string) => {
      const from = el.textContent ?? '';
      const length = Math.max(from.length, next.length);
      const queue = Array.from({ length }, (_, i) => {
        const start = Math.floor(Math.random() * 18);
        return {
          from: from[i] ?? '',
          to: next[i] ?? '',
          start,
          end: start + 8 + Math.floor(Math.random() * 18),
        };
      });
      let tick = 0;

      const update = () => {
        let done = 0;
        let html = '';
        for (const { from: a, to: b, start, end } of queue) {
          if (tick >= end) {
            done++;
            html += escapeHtml(b);
          } else if (tick >= start) {
            const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            html += `<span data-glyph>${escapeHtml(glyph)}</span>`;
          } else {
            html += escapeHtml(a);
          }
        }
        el.innerHTML = html;
        tick++;
        if (done === queue.length) {
          timeout = window.setTimeout(cycle, holdMs);
        } else {
          frame = requestAnimationFrame(update);
        }
      };
      update();
    };

    const cycle = () => {
      index = (index + 1) % words.length;
      if (reducedMotion) {
        el.textContent = words[index];
        timeout = window.setTimeout(cycle, holdMs);
      } else {
        scrambleTo(words[index]);
      }
    };

    timeout = window.setTimeout(cycle, holdMs);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [words, holdMs, reducedMotion]);

  return (
    <span className={className}>
      <span className="sr-only">{words.join(', ')}</span>
      <span ref={output} aria-hidden="true">
        {words[0]}
      </span>
    </span>
  );
}
