/** สีใน 3D scene — ให้ตรงกับ tokens ใน src/styles/tokens.css */
export const palette = {
  primary: '#22d3ee',
  secondary: '#8b5cf6',
  accent: '#34d399',
  light: '#e6edf7',
  base: '#060913',
} as const;

/** PRNG แบบ deterministic (mulberry32) — ได้ผลเหมือนเดิมทุกครั้ง และเป็น pure function */
export function createRandom(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
