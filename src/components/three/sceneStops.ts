/**
 * ควบคุมตำแหน่งของวัตถุ 3D ตาม section ที่กำลัง scroll ผ่าน
 * ใส่ data-scene="hero | left | right | center" ที่ <section> เพื่อกำหนดตำแหน่ง
 */

export type Preset = {
  /** ตำแหน่งแนวนอน เทียบกับครึ่งความกว้าง viewport (-1 ถึง 1) */
  x: number;
  /** ตำแหน่งแนวตั้ง เทียบกับครึ่งความสูง viewport (-1 ถึง 1) */
  y: number;
  scale: number;
  /** ความสว่าง/ความทึบของวัตถุ (ลดลงเมื่ออยู่หลังเนื้อหา) */
  intensity: number;
};

const PRESETS = {
  hero: {
    desktop: { x: 0.46, y: 0, scale: 1, intensity: 1 },
    mobile: { x: 0, y: 0.38, scale: 0.8, intensity: 0.9 },
  },
  left: {
    desktop: { x: -0.72, y: 0.05, scale: 0.78, intensity: 0.42 },
    mobile: { x: -0.35, y: 0.45, scale: 0.6, intensity: 0.35 },
  },
  right: {
    desktop: { x: 0.72, y: -0.05, scale: 0.78, intensity: 0.42 },
    mobile: { x: 0.35, y: 0.45, scale: 0.6, intensity: 0.35 },
  },
  center: {
    desktop: { x: 0, y: 0, scale: 1.2, intensity: 0.4 },
    mobile: { x: 0, y: 0.1, scale: 0.95, intensity: 0.35 },
  },
} satisfies Record<string, { desktop: Preset; mobile: Preset }>;

export type PresetName = keyof typeof PRESETS;

export type SceneStop = { top: number; preset: PresetName };

export type SceneLayout = { stops: SceneStop[]; maxScroll: number };

const isPresetName = (value: string | undefined): value is PresetName =>
  value !== undefined && value in PRESETS;

export function measureLayout(): SceneLayout {
  const scrollY = window.scrollY;
  const stops = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]')).map((el) => ({
    top: el.getBoundingClientRect().top + scrollY,
    preset: isPresetName(el.dataset.scene) ? el.dataset.scene : 'center',
  }));

  return {
    stops,
    maxScroll: Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
  };
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp01((x - edge0) / (edge1 - edge0 || 1));
  return t * t * (3 - 2 * t);
};

/**
 * คำนวณ preset ปัจจุบันจากตำแหน่ง scroll
 * transition เกิดขึ้นช่วงที่ section ถัดไปเลื่อนจากขอบล่างจอ → 35% ของจอ
 * เขียนผลลัพธ์ลง `out` เพื่อไม่ allocate object ใหม่ทุกเฟรม
 */
export function resolvePreset(
  layout: SceneLayout,
  scrollY: number,
  viewportHeight: number,
  mobile: boolean,
  out: Preset,
): Preset {
  const variant = mobile ? 'mobile' : 'desktop';
  const [first, ...rest] = layout.stops;

  Object.assign(out, PRESETS[first?.preset ?? 'hero'][variant]);

  for (const stop of rest) {
    const start = Math.min(stop.top - viewportHeight, layout.maxScroll - viewportHeight * 0.3);
    const end = Math.min(stop.top - viewportHeight * 0.35, layout.maxScroll);
    const k = smoothstep(start, end, scrollY);
    if (k <= 0) break;

    const next = PRESETS[stop.preset][variant];
    out.x = lerp(out.x, next.x, k);
    out.y = lerp(out.y, next.y, k);
    out.scale = lerp(out.scale, next.scale, k);
    out.intensity = lerp(out.intensity, next.intensity, k);
  }

  return out;
}
